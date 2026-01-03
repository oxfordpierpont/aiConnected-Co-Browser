# SiteGuide by aiConnected

AI-powered co-browsing assistant that helps visitors navigate your website using natural conversation.

## Overview

SiteGuide is an embeddable AI assistant that doesn't just answer questions — it actively *navigates* the website with the user in real time. It can scroll to relevant sections, highlight content, and guide users through your site like a knowledgeable human assistant would.

### Key Features

- **Natural Conversation** - Users interact via text or voice in plain language
- **Smart Navigation** - AI scrolls to and highlights relevant content automatically
- **Session Memory** - Remembers users across visits, even on different devices
- **Lead Capture** - Collects contact information naturally during conversation
- **Voice Support** - Full speech-to-text and text-to-speech capabilities
- **Zero Code Installation** - WordPress plugin or simple script tag

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Website                            │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                   SiteGuide Widget                       │    │
│  │  - Chat UI       - Voice I/O      - Page Context        │    │
│  │  - DOM Control   - Session Mgmt   - Action Execution    │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS / WebSocket
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       Backend API Server                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Chat API    │  │  Session API │  │  Leads API   │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  AI Service  │  │  Supabase    │  │  WebSocket   │          │
│  │  (Gemini)    │  │  Service     │  │  Server      │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              ▼                               ▼
┌──────────────────────┐        ┌──────────────────────┐
│    Gemini AI API     │        │      Supabase        │
│  - Chat completion   │        │  - Sessions          │
│  - Function calling  │        │  - Leads             │
│  - TTS generation    │        │  - Interactions      │
└──────────────────────┘        └──────────────────────┘
```

## Project Structure

```
/
├── src/
│   └── widget/                 # Production widget bundle
│       ├── index.tsx           # Entry point
│       ├── SiteGuideWidget.tsx # Main component
│       ├── api.ts              # Backend API client
│       ├── session.ts          # Session management
│       ├── websocket.ts        # Real-time connection
│       ├── pageContext.ts      # DOM scraping/interaction
│       ├── config.ts           # Widget configuration
│       └── styles.ts           # Inlined CSS
│
├── server/                     # Backend API server
│   ├── src/
│   │   ├── index.ts            # Express + WebSocket server
│   │   ├── routes/             # API endpoints
│   │   │   ├── chat.ts         # AI chat handling
│   │   │   ├── session.ts      # Session management
│   │   │   ├── leads.ts        # Lead capture
│   │   │   ├── config.ts       # Site configuration
│   │   │   └── tts.ts          # Text-to-speech
│   │   ├── services/           # Business logic
│   │   │   ├── ai.service.ts   # Gemini integration
│   │   │   └── supabase.service.ts
│   │   ├── middleware/         # Express middleware
│   │   └── types/              # TypeScript types
│   ├── package.json
│   ├── Dockerfile
│   └── .env.example
│
├── supabase/
│   └── migrations/             # Database schema
│       └── 001_initial_schema.sql
│
├── wordpress-plugin/           # WordPress integration
│   ├── siteguide.php           # Main plugin file
│   └── readme.txt              # WordPress readme
│
├── .do/
│   └── app.yaml                # DigitalOcean deployment
│
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD pipeline
│
├── components/                 # Original demo components
├── services/                   # Original demo services
├── App.tsx                     # Demo app (simulation mode)
├── index.tsx                   # Demo entry point
├── vite.config.ts              # Development config
├── vite.config.widget.ts       # Widget build config
└── package.json
```

## Quick Start

### Development Mode (Demo)

Run the demo/simulation mode locally:

```bash
# Install dependencies
npm install

# Set your Gemini API key
echo "GEMINI_API_KEY=your_key_here" > .env.local

# Start development server
npm run dev
```

### Production Widget Build

Build the widget for deployment:

```bash
# Build the widget bundle
npm run build:widget

# Output: dist/widget/siteguide.js
```

### Backend Server

Run the backend API server:

```bash
cd server

# Install dependencies
npm install

# Copy and configure environment
cp .env.example .env
# Edit .env with your credentials

# Development mode
npm run dev

# Production build
npm run build
npm start
```

## Configuration

### Environment Variables

#### Widget Build
```env
API_BASE_URL=https://api.siteguide.io
WS_URL=wss://api.siteguide.io/ws
```

#### Backend Server
```env
PORT=3001
NODE_ENV=production
GEMINI_API_KEY=your_gemini_api_key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your_service_key
```

### Widget Installation

Add this script tag to any website:

```html
<script
  defer
  src="https://cdn.siteguide.io/siteguide.js"
  data-site-id="your-site-id"
  data-position="bottom-center"
  data-theme="dark"
  data-voice="true"
></script>
```

#### Configuration Options

| Attribute | Values | Default | Description |
|-----------|--------|---------|-------------|
| `data-site-id` | UUID | (required) | Your unique site identifier |
| `data-position` | `bottom-center`, `bottom-right`, `bottom-left` | `bottom-center` | Widget position |
| `data-theme` | `dark`, `light`, `auto` | `dark` | Color theme |
| `data-voice` | `true`, `false` | `true` | Enable voice features |
| `data-greeting` | string | - | Custom greeting message |

## Database Schema

The Supabase schema includes:

- **sites** - Registered client sites with settings
- **sessions** - User browsing sessions with memory
- **interactions** - Chat messages and AI responses
- **leads** - Captured lead information
- **page_visits** - Analytics data

Run the migration:

```bash
supabase db push
# or manually run: supabase/migrations/001_initial_schema.sql
```

## WordPress Plugin

1. Upload the `wordpress-plugin` folder to `/wp-content/plugins/siteguide/`
2. Activate the plugin in WordPress admin
3. Go to Settings → SiteGuide
4. Enter your Site ID
5. Configure options and save

## Deployment

### DigitalOcean App Platform

```bash
# Deploy using doctl
doctl apps create --spec .do/app.yaml
```

### Docker

```bash
cd server

# Build image
docker build -t siteguide-api .

# Run container
docker run -p 3001:3001 --env-file .env siteguide-api
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/chat` | POST | Send message to AI |
| `/api/session` | POST | Get/create session |
| `/api/session/resume` | POST | Resume by email |
| `/api/session/link-email` | POST | Link email to session |
| `/api/leads` | POST | Capture lead data |
| `/api/config/:siteId` | GET | Get site configuration |
| `/api/tts` | POST | Generate speech |
| `/ws` | WebSocket | Real-time connection |
| `/health` | GET | Health check |

## How It Works

1. **User asks a question** - "Where is your pricing?"
2. **Widget scrapes page context** - Extracts headings, buttons, content
3. **Request sent to backend** - Message + page context
4. **AI processes with context** - Gemini understands the page
5. **AI decides on action** - Responds + triggers `scroll_to("Pricing")`
6. **Action sent via WebSocket** - Real-time execution
7. **Widget scrolls and highlights** - User sees the pricing section

## License

GPL v2 or later

## Support

- Documentation: https://siteguide.io/docs
- Dashboard: https://siteguide.io/dashboard
- Support: https://siteguide.io/support
