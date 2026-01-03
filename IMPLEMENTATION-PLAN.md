# SiteGuide Implementation Plan

**Purpose:** Transform the current development prototype into a production-ready widget that can be installed on live websites.

**Current State:** React/TypeScript demo with direct Gemini API calls
**Target State:** Bundled JavaScript widget with backend infrastructure per DEVELOPER-PRD.md

---

## Executive Summary

The current codebase is a functional prototype that only works in simulation mode. To deploy on live websites, we need to build:

1. **Bundled Widget** - Single JavaScript file that can be injected into any website
2. **Backend API** - Node.js server to proxy AI requests and manage sessions
3. **Supabase Integration** - Database for session persistence and lead storage
4. **WebSocket Server** - Real-time communication for co-browsing commands
5. **CDN Distribution** - Host the widget script for client sites

---

## Phase 1: Production Build System (Foundation)

**Goal:** Create a bundled `siteguide.js` that can be loaded on any website.

### 1.1 Vite Build Configuration

Update `vite.config.ts` to produce a single IIFE bundle:

```typescript
// vite.config.widget.ts
export default defineConfig({
  build: {
    lib: {
      entry: 'src/widget/index.ts',
      name: 'SiteGuide',
      fileName: 'siteguide',
      formats: ['iife']
    },
    rollupOptions: {
      // Bundle all dependencies
      external: [],
      output: {
        inlineDynamicImports: true,
        // CSS injected into JS
        assetFileNames: 'siteguide.[ext]'
      }
    }
  }
});
```

### 1.2 Widget Entry Point

Create a new entry point that:
- Self-initializes on load
- Reads `data-site-id` from script tag
- Creates isolated DOM container (Shadow DOM)
- Connects to backend instead of direct API calls

```
/src
  /widget
    index.ts          # Entry point, reads data-site-id
    SiteGuideWidget.tsx  # Main component
    api.ts            # Backend API client (replaces direct Gemini calls)
    styles.css        # Scoped styles
```

### 1.3 Shadow DOM Isolation

Wrap the widget in Shadow DOM to prevent CSS conflicts with host sites:

```typescript
const container = document.createElement('div');
container.id = 'siteguide-root';
const shadow = container.attachShadow({ mode: 'closed' });
document.body.appendChild(container);
```

### 1.4 Deliverables

- [ ] `vite.config.widget.ts` - Widget build configuration
- [ ] `src/widget/index.ts` - Self-initializing entry point
- [ ] `npm run build:widget` - Produces `dist/siteguide.js`
- [ ] Shadow DOM container for style isolation
- [ ] Remove import maps dependency

---

## Phase 2: Backend API Server

**Goal:** Create a Node.js backend that proxies AI requests and secures the API key.

### 2.1 Project Structure

```
/server
  /src
    index.ts              # Express + WebSocket server
    /routes
      chat.ts             # POST /api/chat - AI message handling
      session.ts          # Session management endpoints
      leads.ts            # Lead capture endpoints
    /services
      ai.service.ts       # Gemini/OpenAI integration
      supabase.service.ts # Database operations
    /middleware
      auth.ts             # Site ID validation
      rateLimit.ts        # Request throttling
  package.json
  Dockerfile
```

### 2.2 Core Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/chat` | POST | Send message to AI, receive response + actions |
| `/api/session` | GET/POST | Create/retrieve session data |
| `/api/session/resume` | POST | Resume session by email |
| `/api/leads` | POST | Store captured lead data |
| `/api/config/:siteId` | GET | Get site-specific configuration |

### 2.3 AI Proxy Flow

```
Client Widget → Backend API → Gemini/OpenAI → Backend → Client
     ↓                ↓
  site_id         Validates site_id
  message         Adds page context
                  Returns response + actions
```

### 2.4 Security

- API keys stored in environment variables (never exposed to client)
- Site ID validation against Supabase `sites` table
- Rate limiting per site (100 requests/minute default)
- CORS configured per registered domain

### 2.5 Deliverables

- [ ] Express server with TypeScript
- [ ] `/api/chat` endpoint with Gemini integration
- [ ] `/api/session` endpoints for session management
- [ ] Site ID validation middleware
- [ ] Rate limiting
- [ ] Dockerfile for deployment

---

## Phase 3: Supabase Integration

**Goal:** Persistent storage for sessions, leads, and site configurations.

### 3.1 Database Schema

```sql
-- Sites table (registered clients)
CREATE TABLE sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  domain TEXT NOT NULL UNIQUE,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sessions table
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID REFERENCES sites(id),
  anonymous_id TEXT NOT NULL,
  email TEXT,
  memory JSONB DEFAULT '{}',
  pages_visited JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_active TIMESTAMPTZ DEFAULT NOW()
);

-- Interactions table
CREATE TABLE interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id),
  role TEXT NOT NULL, -- 'user' or 'assistant'
  message TEXT NOT NULL,
  actions JSONB, -- scroll/highlight actions
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads table
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id),
  site_id UUID REFERENCES sites(id),
  name TEXT,
  email TEXT,
  phone TEXT,
  intent TEXT,
  source_page TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 3.2 Row Level Security (RLS)

```sql
-- Sites can only access their own data
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Sites can view own sessions" ON sessions
  FOR SELECT USING (site_id = current_setting('app.current_site_id')::uuid);
```

### 3.3 Supabase Client Integration

```typescript
// server/src/services/supabase.service.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function getOrCreateSession(siteId: string, anonymousId: string) {
  const { data: existing } = await supabase
    .from('sessions')
    .select('*')
    .eq('site_id', siteId)
    .eq('anonymous_id', anonymousId)
    .single();

  if (existing) return existing;

  const { data: created } = await supabase
    .from('sessions')
    .insert({ site_id: siteId, anonymous_id: anonymousId })
    .select()
    .single();

  return created;
}
```

### 3.4 Deliverables

- [ ] Supabase project setup
- [ ] Database schema migration files
- [ ] RLS policies for multi-tenant security
- [ ] `supabase.service.ts` with CRUD operations
- [ ] Session persistence (create, retrieve, update)
- [ ] Lead capture storage

---

## Phase 4: Real-Time WebSocket Communication

**Goal:** Enable real-time AI commands (scroll, highlight) to execute instantly.

### 4.1 WebSocket Server

```typescript
// server/src/websocket.ts
import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

// Map of siteId:sessionId -> WebSocket
const clients = new Map<string, WebSocket>();

wss.on('connection', (ws, req) => {
  const { siteId, sessionId } = parseParams(req.url);
  const key = `${siteId}:${sessionId}`;
  clients.set(key, ws);

  ws.on('close', () => clients.delete(key));
});

export function sendAction(siteId: string, sessionId: string, action: Action) {
  const key = `${siteId}:${sessionId}`;
  const client = clients.get(key);
  if (client?.readyState === WebSocket.OPEN) {
    client.send(JSON.stringify(action));
  }
}
```

### 4.2 Message Types

```typescript
// Client → Server
interface ClientMessage {
  type: 'chat' | 'page_context' | 'heartbeat';
  sessionId: string;
  payload: any;
}

// Server → Client
interface ServerMessage {
  type: 'response' | 'action' | 'error';
  payload: {
    text?: string;
    action?: 'scroll_to' | 'highlight' | 'click';
    target?: string;
  };
}
```

### 4.3 Client-Side Connection

```typescript
// src/widget/websocket.ts
class SiteGuideSocket {
  private ws: WebSocket;
  private reconnectAttempts = 0;

  connect(siteId: string, sessionId: string) {
    this.ws = new WebSocket(`wss://api.siteguide.io/ws?siteId=${siteId}&sessionId=${sessionId}`);

    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'action') {
        this.executeAction(message.payload);
      }
    };

    this.ws.onclose = () => this.reconnect();
  }

  private reconnect() {
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
    setTimeout(() => this.connect(), delay);
    this.reconnectAttempts++;
  }
}
```

### 4.4 Deliverables

- [ ] WebSocket server integrated with Express
- [ ] Client-side WebSocket connection with reconnection logic
- [ ] Real-time action dispatch (scroll, highlight)
- [ ] Heartbeat mechanism for connection health
- [ ] Session-based message routing

---

## Phase 5: Widget Refactoring

**Goal:** Update the React components to work with the new backend architecture.

### 5.1 Replace Direct API Calls

**Before (current):**
```typescript
// services/geminiService.ts
const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
const response = await chat.sendMessage(message);
```

**After:**
```typescript
// src/widget/api.ts
export async function sendMessage(siteId: string, sessionId: string, message: string) {
  const response = await fetch('https://api.siteguide.io/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ siteId, sessionId, message, pageContext: getPageContext() })
  });
  return response.json();
}
```

### 5.2 Session Management

```typescript
// src/widget/session.ts
const STORAGE_KEY = 'siteguide_session';

export function getOrCreateSessionId(): string {
  let sessionId = localStorage.getItem(STORAGE_KEY);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, sessionId);
  }
  return sessionId;
}

export async function resumeByEmail(email: string): Promise<Session | null> {
  const response = await fetch('https://api.siteguide.io/api/session/resume', {
    method: 'POST',
    body: JSON.stringify({ siteId, email })
  });
  return response.json();
}
```

### 5.3 Updated FloatingChat Component

Key changes:
- Remove `@google/genai` dependency
- Use backend API instead of direct calls
- Listen for WebSocket actions
- Support session persistence

### 5.4 Deliverables

- [ ] New `api.ts` for backend communication
- [ ] Session management with localStorage
- [ ] WebSocket integration in FloatingChat
- [ ] Remove direct Gemini dependencies
- [ ] Update page context scraping to send to backend

---

## Phase 6: Deployment Infrastructure

**Goal:** Set up production hosting per PRD specifications.

### 6.1 DigitalOcean App Platform

```yaml
# .do/app.yaml
name: siteguide
services:
  - name: api
    github:
      repo: aiConnected/siteguide
      branch: main
      deploy_on_push: true
    source_dir: server
    build_command: npm run build
    run_command: npm start
    environment_slug: node-js
    instance_count: 2
    instance_size_slug: professional-xs
    envs:
      - key: SUPABASE_URL
        scope: RUN_TIME
        type: SECRET
      - key: SUPABASE_SERVICE_KEY
        scope: RUN_TIME
        type: SECRET
      - key: GEMINI_API_KEY
        scope: RUN_TIME
        type: SECRET

  - name: widget
    github:
      repo: aiConnected/siteguide
      branch: main
    source_dir: /
    build_command: npm run build:widget
    output_dir: dist
    routes:
      - path: /siteguide.js
```

### 6.2 CDN Configuration

Widget served from: `https://cdn.aiconnected.ai/siteguide.js`

- Enable gzip compression
- Set cache headers (1 hour for widget, versioned)
- CORS: Allow all origins (widget needs to load anywhere)

### 6.3 Environment Variables

| Variable | Purpose | Location |
|----------|---------|----------|
| `SUPABASE_URL` | Database connection | Backend |
| `SUPABASE_SERVICE_KEY` | Admin database access | Backend |
| `SUPABASE_ANON_KEY` | Client-side access | Backend |
| `GEMINI_API_KEY` | AI model access | Backend |
| `CDN_BASE_URL` | Asset delivery | Both |

### 6.4 Deliverables

- [ ] DigitalOcean App Platform configuration
- [ ] CDN setup for widget distribution
- [ ] Environment variable configuration
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Staging and production environments

---

## Phase 7: WordPress Plugin (Optional)

**Goal:** Create a WordPress plugin wrapper for easy installation.

### 7.1 Plugin Structure

```
/wordpress-plugin
  siteguide.php           # Main plugin file
  /admin
    settings-page.php     # Admin settings UI
  /includes
    class-siteguide.php   # Core functionality
```

### 7.2 Plugin Code

```php
<?php
/**
 * Plugin Name: SiteGuide by aiConnected
 * Description: AI-powered co-browsing assistant
 * Version: 1.0.0
 */

class SiteGuide {
    private $site_id;

    public function __construct() {
        $this->site_id = get_option('siteguide_site_id');
        add_action('wp_footer', [$this, 'inject_script']);
        add_action('admin_menu', [$this, 'add_settings_page']);
    }

    public function inject_script() {
        if (!$this->site_id) return;
        echo '<script defer src="https://cdn.aiconnected.ai/siteguide.js" data-site-id="' . esc_attr($this->site_id) . '"></script>';
    }
}

new SiteGuide();
```

### 7.3 Deliverables

- [ ] WordPress plugin with settings page
- [ ] Site ID configuration
- [ ] Auto-injection of script tag
- [ ] Plugin zip for distribution

---

## Implementation Timeline

| Phase | Duration | Dependencies |
|-------|----------|--------------|
| Phase 1: Build System | 1-2 days | None |
| Phase 2: Backend API | 3-5 days | Phase 1 |
| Phase 3: Supabase | 2-3 days | Phase 2 |
| Phase 4: WebSocket | 2-3 days | Phase 2, 3 |
| Phase 5: Widget Refactor | 3-4 days | Phase 1-4 |
| Phase 6: Deployment | 1-2 days | Phase 1-5 |
| Phase 7: WordPress (optional) | 1-2 days | Phase 6 |

**Total Estimated Time: 2-3 weeks**

---

## Quick Start (MVP Path)

For fastest path to live website testing:

1. **Phase 1** - Build bundled widget
2. **Phase 2** - Minimal backend (just AI proxy, no persistence)
3. **Phase 5** - Update widget to use backend
4. **Phase 6** - Deploy to DigitalOcean

This MVP allows testing on live sites within **1 week**, with persistence added afterward.

---

## Files to Create/Modify

### New Files

```
/server/
  package.json
  tsconfig.json
  src/index.ts
  src/routes/chat.ts
  src/routes/session.ts
  src/services/ai.service.ts
  src/services/supabase.service.ts
  Dockerfile

/src/widget/
  index.ts
  api.ts
  session.ts
  websocket.ts

/supabase/
  migrations/001_initial_schema.sql

vite.config.widget.ts
.do/app.yaml
```

### Modified Files

```
package.json              # Add build:widget script
vite.config.ts           # Keep for dev mode
src/App.tsx              # Minor updates for widget mode detection
components/FloatingChat.tsx  # Remove direct API calls
services/geminiService.ts    # Replace with api.ts calls
```

---

## Success Criteria

| Metric | Target |
|--------|--------|
| Widget loads on external site | < 800ms |
| AI response time (end-to-end) | < 2 seconds |
| Session persists across page loads | 100% |
| Session resumes after 24 hours | 100% |
| No console errors on external sites | 0 errors |
| CSP-compatible (no inline scripts) | Yes |

---

## Next Steps

1. Review and approve this plan
2. Set up Supabase project and obtain credentials
3. Begin Phase 1 implementation
4. Create GitHub repository structure for backend

Ready to proceed with implementation upon approval.
