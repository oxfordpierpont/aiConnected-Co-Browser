# Deploying SiteGuide to Dokploy

This guide explains how to deploy SiteGuide to Dokploy for serving multiple client websites.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           DOKPLOY SERVER                                 │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                         Traefik (Reverse Proxy)                   │   │
│  │                                                                    │   │
│  │   api.yourdomain.com ──────► API Container (Port 3001)            │   │
│  │   cdn.yourdomain.com ──────► Widget CDN Container (Nginx)         │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                    │                                     │
│                                    ▼                                     │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                    SiteGuide Containers                           │   │
│  │                                                                    │   │
│  │   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐          │   │
│  │   │  API Server │    │  Widget CDN │    │   Builder   │          │   │
│  │   │  (Express)  │    │   (Nginx)   │    │  (one-time) │          │   │
│  │   └─────────────┘    └─────────────┘    └─────────────┘          │   │
│  └──────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    ▼                               ▼
          ┌─────────────────┐            ┌─────────────────┐
          │   Gemini API    │            │    Supabase     │
          │   (External)    │            │   (External)    │
          └─────────────────┘            └─────────────────┘
```

## Multi-Tenant Model

SiteGuide uses a **single deployment, multiple clients** model:

- **One API server** handles ALL client sites
- **One CDN** serves the widget to ALL client sites
- **Each client** gets a unique `site_id` (UUID)
- **Supabase** stores per-client configuration and data

```
Client A Website ──┐
                   │     ┌─────────────────┐     ┌─────────────┐
Client B Website ──┼────►│  SiteGuide API  │────►│  Supabase   │
                   │     │  (single inst)  │     │  (shared)   │
Client C Website ──┘     └─────────────────┘     └─────────────┘
```

---

## Prerequisites

1. **Dokploy installed** on your VPS
2. **Domain name** with DNS configured:
   - `api.yourdomain.com` → Your Dokploy server IP
   - `cdn.yourdomain.com` → Your Dokploy server IP
3. **Supabase project** (free tier works)
4. **Gemini API key** from Google AI Studio

---

## Step 1: Set Up Supabase

### 1.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note your:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **Service Role Key**: Found in Settings → API → `service_role` (secret)
   - **Anon Key**: Found in Settings → API → `anon` (public)

### 1.2 Run Database Migration

In Supabase SQL Editor, run the contents of `supabase/migrations/001_initial_schema.sql`

This creates:
- `sites` - Client site registrations
- `sessions` - User browsing sessions
- `interactions` - Chat logs
- `leads` - Captured leads

### 1.3 Add Your First Client Site

```sql
INSERT INTO sites (name, domain, settings)
VALUES (
  'My First Client',
  'clientwebsite.com',
  '{
    "greeting": "Hi! How can I help you today?",
    "position": "bottom-center",
    "theme": "dark",
    "voiceEnabled": true
  }'::jsonb
);
```

Note the returned `id` - this is the client's `site_id`.

---

## Step 2: Deploy to Dokploy

### 2.1 Create New Project in Dokploy

1. Log into your Dokploy dashboard
2. Click **Create Project** → Name it "SiteGuide"

### 2.2 Add Docker Compose Service

1. In your project, click **Add Service** → **Docker Compose**
2. Connect your GitHub repository or paste the `docker-compose.yml` content
3. Set the **Compose Path** to `docker-compose.yml`

### 2.3 Configure Environment Variables

In Dokploy's **Environment** tab, add:

```env
# Required
GEMINI_API_KEY=your_gemini_api_key_here
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your_service_role_key_here
DOMAIN=yourdomain.com

# Optional
NODE_ENV=production
```

### 2.4 Configure Domains

In Dokploy's **Domains** tab:

1. Add domain: `api.yourdomain.com` → Service: `api`
2. Add domain: `cdn.yourdomain.com` → Service: `widget`
3. Enable HTTPS (Let's Encrypt)

### 2.5 Deploy

Click **Deploy** and wait for containers to start.

Verify:
- `https://api.yourdomain.com/health` returns `{"status":"ok"}`
- `https://cdn.yourdomain.com/siteguide.js` returns the widget script

---

## Step 3: Add Client Websites

### 3.1 Register New Client in Supabase

```sql
INSERT INTO sites (name, domain, settings)
VALUES (
  'Acme Corp',
  'acmecorp.com',
  '{
    "greeting": "Welcome to Acme! How can I assist you?",
    "position": "bottom-right",
    "theme": "dark",
    "voiceEnabled": true,
    "primaryColor": "#ff6b00"
  }'::jsonb
)
RETURNING id;
```

Save the returned UUID (e.g., `550e8400-e29b-41d4-a716-446655440000`)

### 3.2 Install Widget on Client Site

Give the client this script tag to add to their website:

```html
<script
  defer
  src="https://cdn.yourdomain.com/siteguide.js"
  data-site-id="550e8400-e29b-41d4-a716-446655440000"
></script>
```

For WordPress clients, they can use the WordPress plugin with this Site ID.

---

## Step 4: Client Management

### View All Clients

```sql
SELECT id, name, domain, created_at
FROM sites
ORDER BY created_at DESC;
```

### View Client Sessions

```sql
SELECT
  s.id,
  s.email,
  s.created_at,
  s.last_active,
  array_length(s.pages_visited::text[], 1) as pages_count
FROM sessions s
WHERE s.site_id = '550e8400-e29b-41d4-a716-446655440000'
ORDER BY s.last_active DESC
LIMIT 50;
```

### View Client Leads

```sql
SELECT
  l.name,
  l.email,
  l.phone,
  l.intent,
  l.source_page,
  l.created_at
FROM leads l
WHERE l.site_id = '550e8400-e29b-41d4-a716-446655440000'
ORDER BY l.created_at DESC;
```

### Update Client Settings

```sql
UPDATE sites
SET settings = settings || '{"greeting": "New greeting message!"}'::jsonb
WHERE id = '550e8400-e29b-41d4-a716-446655440000';
```

### Disable Client

```sql
UPDATE sites
SET settings = settings || '{"enabled": false}'::jsonb
WHERE id = '550e8400-e29b-41d4-a716-446655440000';
```

---

## Scaling

### Horizontal Scaling

To handle more traffic, increase the `api` service replicas in Dokploy:

1. Go to your Docker Compose service
2. Edit the compose file to add:
   ```yaml
   api:
     deploy:
       replicas: 3
   ```
3. Redeploy

### Database Scaling

- Supabase free tier: 500MB, 2 connections
- Supabase Pro: 8GB, 60 connections, daily backups

For high-volume deployments, upgrade Supabase or self-host PostgreSQL.

---

## Monitoring

### Health Checks

- API: `https://api.yourdomain.com/health`
- CDN: `https://cdn.yourdomain.com/health`

### Logs in Dokploy

1. Go to your service
2. Click **Logs** tab
3. View real-time logs from containers

### Supabase Analytics

Use Supabase dashboard to monitor:
- Database size
- API requests
- Active connections

---

## Troubleshooting

### Widget Not Loading

1. Check browser console for errors
2. Verify CDN is accessible: `curl https://cdn.yourdomain.com/siteguide.js`
3. Check CORS headers are present

### API Errors

1. Check Dokploy logs for the `api` container
2. Verify environment variables are set
3. Test API directly: `curl https://api.yourdomain.com/health`

### WebSocket Connection Failed

1. Ensure Traefik is configured for WebSocket upgrades
2. Check if firewall allows WSS connections
3. Verify the domain uses HTTPS (required for WSS)

### Database Connection Issues

1. Verify `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` are correct
2. Check Supabase project is active (not paused)
3. Ensure your server IP isn't blocked by Supabase

---

## Security Recommendations

1. **Use strong secrets** - Generate random keys for production
2. **Enable Supabase RLS** - Already configured in migration
3. **Rate limiting** - Already implemented in API
4. **HTTPS only** - Dokploy handles this with Let's Encrypt
5. **Regular backups** - Enable Supabase backups for Pro tier
6. **Monitor logs** - Set up alerts for errors

---

## Cost Estimation

| Component | Free Tier | Production |
|-----------|-----------|------------|
| Dokploy VPS | - | $5-20/mo (DigitalOcean/Hetzner) |
| Supabase | Free (500MB) | $25/mo (Pro) |
| Gemini API | Free tier | Pay per use (~$0.001/request) |
| Domain | - | $10-15/year |

**Total minimum**: ~$5/month + domain

---

## Next Steps

1. **Admin Dashboard** - Build a Next.js admin panel for managing clients
2. **Billing Integration** - Add Stripe for client subscriptions
3. **Analytics Dashboard** - Visualize usage per client
4. **Custom Branding** - Allow clients to customize widget appearance
