-- SiteGuide Database Schema
-- Run this migration to set up the initial database structure

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- SITES TABLE
-- Stores registered client sites
-- ============================================
CREATE TABLE IF NOT EXISTS sites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  domain TEXT NOT NULL UNIQUE,
  settings JSONB DEFAULT '{
    "greeting": "Hi! How can I help you today?",
    "position": "bottom-center",
    "theme": "dark",
    "voiceEnabled": true
  }'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for domain lookups
CREATE INDEX IF NOT EXISTS idx_sites_domain ON sites(domain);

-- ============================================
-- SESSIONS TABLE
-- Stores user browsing sessions
-- ============================================
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  anonymous_id TEXT NOT NULL,
  email TEXT,
  memory JSONB DEFAULT '{}'::jsonb,
  pages_visited JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_active TIMESTAMPTZ DEFAULT NOW()
);

-- Index for session lookups
CREATE INDEX IF NOT EXISTS idx_sessions_site_anonymous ON sessions(site_id, anonymous_id);
CREATE INDEX IF NOT EXISTS idx_sessions_site_email ON sessions(site_id, email) WHERE email IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_sessions_last_active ON sessions(last_active);

-- ============================================
-- INTERACTIONS TABLE
-- Stores chat messages and AI responses
-- ============================================
CREATE TABLE IF NOT EXISTS interactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  message TEXT NOT NULL,
  actions JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for interaction lookups
CREATE INDEX IF NOT EXISTS idx_interactions_session ON interactions(session_id);
CREATE INDEX IF NOT EXISTS idx_interactions_created ON interactions(created_at);

-- ============================================
-- LEADS TABLE
-- Stores captured lead information
-- ============================================
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  session_id UUID REFERENCES sessions(id) ON DELETE SET NULL,
  name TEXT,
  email TEXT,
  phone TEXT,
  intent TEXT,
  source_page TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for lead lookups
CREATE INDEX IF NOT EXISTS idx_leads_site ON leads(site_id);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email) WHERE email IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at);

-- ============================================
-- PAGE VISITS TABLE (Optional - for detailed analytics)
-- ============================================
CREATE TABLE IF NOT EXISTS page_visits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  page_url TEXT NOT NULL,
  page_title TEXT,
  time_spent_seconds INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for page visit lookups
CREATE INDEX IF NOT EXISTS idx_page_visits_session ON page_visits(session_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_visits ENABLE ROW LEVEL SECURITY;

-- Service role has full access (for backend API)
-- These policies allow the service key to access all data

CREATE POLICY "Service role full access to sites"
  ON sites FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access to sessions"
  ON sessions FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access to interactions"
  ON interactions FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access to leads"
  ON leads FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access to page_visits"
  ON page_visits FOR ALL
  USING (true)
  WITH CHECK (true);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at on sites
CREATE TRIGGER update_sites_updated_at
  BEFORE UPDATE ON sites
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SAMPLE DATA (for development)
-- ============================================

-- Insert a sample site for testing
INSERT INTO sites (id, name, domain, settings)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Demo Site',
  'localhost',
  '{
    "greeting": "Welcome! How can I help you navigate this site?",
    "position": "bottom-center",
    "theme": "dark",
    "voiceEnabled": true
  }'::jsonb
)
ON CONFLICT (domain) DO NOTHING;

-- ============================================
-- CLEANUP JOBS (run periodically)
-- ============================================

-- Delete sessions inactive for more than 90 days
-- CREATE OR REPLACE FUNCTION cleanup_old_sessions()
-- RETURNS void AS $$
-- BEGIN
--   DELETE FROM sessions
--   WHERE last_active < NOW() - INTERVAL '90 days'
--   AND email IS NULL;
-- END;
-- $$ LANGUAGE plpgsql;
