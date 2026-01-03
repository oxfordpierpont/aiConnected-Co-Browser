# siteGuide by aiConnected

**User:** Oxford Pierpont  
**Created:** 7/28/2025 19:26  
**Updated:** 8/10/2025 15:02  
**Exported:** 8/10/2025 15:04  
**Link:** [https://chatgpt.com/c/688806fb-9d10-8332-88f4-0d15f5785a85](https://chatgpt.com/c/688806fb-9d10-8332-88f4-0d15f5785a85)

## 

Here’s the updated and expanded **feature list** for **SiteGuide with Co-Browsing by aiConnected**, including persistent session memory and email-linked session recovery:

---

## 🧠 **Core Intelligence Features**

* **Natural Language Understanding (NLU)**  
  Conversational AI that comprehends plain language, technical terms, and layered inquiries.  
* **Live Context Awareness**  
  Interprets the current page’s content and adjusts responses accordingly.  
* **Multi-Intent Recognition**  
  Processes compound requests and multi-step inquiries within a single input.  
* **Smart, Search-Backed Responses**  
  Pulls relevant content from page text, FAQs, documents, or external APIs.

---

## 🧭 **Co-Browsing Capabilities**

* **Smart Navigation & Scroll Control**  
  Automatically scrolls to relevant sections as the user asks questions.  
* **Real-Time Element Highlighting**  
  Visually emphasizes content sections during conversation for clarity and engagement.  
* **Persistent Page-to-Page Memory**  
  Session memory continues uninterrupted as the user browses across different pages.  
* **Voice-Controlled Navigation (Mobile Compatible)**  
  Allows users to control the experience completely hands-free via natural speech.  
* **Dynamic Journey Mapping**  
  Displays a visual trail of content accessed via the AI assistant.

---

## 🧬 **Persistent Session Intelligence**

* **Multi-Day Session Memory**  
  Remembers previous interactions even if the user leaves and returns days later on the same device.  
* **Email-Linked Session Recall**  
  Users can tell the AI their email address to recover previous sessions on any device or browser.  
* **Cross-Device Continuity**  
  Resume where you left off from desktop to mobile (or vice versa) using secure email verification.  
* **Long-Term Context Retention**  
  Supports session recovery and memory for weeks or even months for returning users.

---

## 💬 **User Interaction & Lead Capture**

* **Passive Lead Collection During Chat**  
  Gathers user info and contact details naturally during the flow of conversation.  
* **Auto-Populated Contact Forms**  
  Fills in website forms from user-provided information during the chat session.  
* **Pre-Submission Smart Routing**  
  Offers targeted help or staff escalation before the user finishes a question or submits a form.  
* **Segmented Inquiry Detection**  
  Categorizes questions (e.g. billing vs. tech support) and routes them appropriately.

---

## 🛠️ **Platform Integration**

* **One-Click WordPress Plugin Deployment**  
  Easy install, even across multi-site environments.  
* **Powered by n8n Workflows**  
  Every interaction runs through fully customizable n8n automations on your backend.  
* **WebSocket Infrastructure for Real-Time Sync**  
  Real-time messaging persists through page loads, site navigation, and browser refreshes.  
* **CRM \+ Calendar Sync**  
  Connects directly to client CRMs and calendars to schedule meetings, save lead data, or create tasks.

---

## 🎨 **Customization & Brand Control**

* **Custom Persona & Language**  
  Fully customizable tone of voice, vocabulary, and branded phrasing.  
* **Text \+ Voice Interface**  
  Users can type or speak freely and seamlessly switch between modes.  
* **Style Controls**  
  Modify the bubble appearance, position, assistant avatar, and animation behaviors.  
* **Page-Specific Intelligence**  
  Tailor assistant behavior and prompt logic to different URLs or sections of the site.

---

## 📊 **Analytics & Optimization**

* **Real-Time Dashboard**  
  View user engagement stats, conversion triggers, and performance data.  
* **Conversation Review \+ Playback**  
  Replay anonymized chat logs to refine training and detect missed opportunities.  
* **A/B Testing for Copy & UX**  
  Test different versions of the assistant’s greeting, responses, and behavior logic.  
* **Lead Attribution Tracking**  
  Tracks where leads came from and what pages or phrases triggered their inquiry.

---

## 🔐 **Security & Control**

* **Bot Detection Before Submission**  
  Identifies spam bots or automated tools before they reach the contact form.  
* **End-to-End Session Security**  
  Sessions linked by email are encrypted and validated securely.  
* **Privacy-First Design**  
  Complies with GDPR, CCPA, and other major privacy standards out of the box.  
* **Live Agent Override**  
  Human team members can jump in and take over at any point via internal alerts.

---

### 🔌 1\. **Infrastructure & Hosting**

These support the real-time interaction layer and persistent communication:

* **WebSocket Server** (Real-time bidirectional comms)  
  * Self-hosted (DigitalOcean / VPS): \~$12–$40/month per instance  
  * Managed (e.g. Pusher, Ably, or Socket.io cloud): \~$49–$199/month depending on connection limits and message volume  
* **Static Hosting for Plugin Assets** (JS/CSS bundles)  
  * Typically negligible if included in WordPress plugin or bundled with your site  
  * \~$0 if served via WordPress CDN or your own cloud  
* **SSL & Domain Setup**  
  * Included in most cloud providers or \~$5–10/month if separately hosted

✅ *Total: $12–$199/month depending on scale and hosting choices*

---

### 🧠 2\. **AI-Powered Page Analysis & Navigation Control**

While AI itself can be handled separately, co-browsing requires:

* **DOM Parsing & Element Mapping Scripts**  
  * One-time development cost to extract meaningful content blocks  
  * Ongoing cost: minimal unless AI is being used to interpret every page on load  
* **Client-Side Highlighting/Scrolling Logic**  
  * One-time front-end development expense  
  * Open-source libraries like `scroll-into-view`, `IntersectionObserver`, and `MutationObserver` are free

✅ *Total: Dev time (1–2 weeks for MVP), no major recurring costs here*

---

### 🗂️ 3\. **Session Persistence Across Visits**

* **LocalStorage/IndexedDB (on device)**  
  * Free, used for same-device memory  
  * Stores session token or context ID  
* **Server-Side Session Storage (cross-device)**  
  * Redis, PostgreSQL, or Firestore:  
    * \~$5–$30/month for storing session IDs, page history, and user metadata  
* **Email-Linked Context Recovery**  
  * Secure database lookup \+ encryption  
  * Very lightweight unless storing extensive conversation history

✅ *Total: \~$5–$30/month depending on the database and volume*

---

### 🔧 4\. **Maintenance & Scaling**

* **Error Monitoring / Logging (optional but recommended)**  
  * Sentry or LogRocket: Free tier or \~$20/month  
* **Traffic Scaling (if co-browsing is used by thousands simultaneously)**  
  * May require load balancing or multiple instances of WebSocket servers  
  * Scale cost \= \~$20/month per 10k concurrent users (estimate, varies heavily)

✅ *Total: Optional, but plan for scalability depending on expected traffic*

---

### 💡 **Estimated Monthly Overhead for Co-Browsing Features**

| Tier | Approx. Monthly Cost |
| :---- | :---- |
| **Solo/Small Client Site** | **$20–$50** |
| **Medium Agency Setup** | **$80–$200** |
| **Enterprise (Multi-Client)** | **$250–$500+** |

---

**Product Name:**  
**SiteGuide with Co-Browsing**  
Powered by aiConnected

---

**What It Is:**  
SiteGuide is an AI-powered website assistant that doesn't just answer questions — it actively *navigates* the website with the user in real time. Think of it as a digital concierge that not only knows everything about the site, but can also guide users through it step-by-step, like a knowledgeable human assistant would in a physical store.

This is far beyond traditional live chat or chatbots. SiteGuide is *interactive, intelligent,* and *navigational.*

---

**What Problem It Solves:**  
Most websites are built like brochures — static, passive, and hard to navigate if you're in a hurry or don’t know where to look.

Visitors often:

* Get lost or frustrated  
* Abandon their inquiry before reaching the right page  
* Never complete the form or call

Even with live chat, most users don’t engage unless they *already* know what they need.

**SiteGuide fixes this** by proactively helping the user explore the site, learn what’s available, and get answers without ever needing to search, scroll endlessly, or wait on hold.

---

**What It Does (Key Functionality):**

1. **Conversational Interface**  
   Users interact with the AI using natural language — typing or speaking — just like they would with ChatGPT or Siri.  
2. **Real-Time Website Control**  
   When a user asks something like, “What are your pricing options?” or “Where’s the warranty info?” the AI will not only answer, but automatically scroll to the relevant section, highlight it, and guide the user’s attention there.  
3. **Cross-Page Memory**  
   The assistant keeps track of what’s been discussed even as the user navigates between different pages.  
4. **Session Persistence**  
   If a user leaves the site and comes back days or weeks later — they can pick up right where they left off. Even if they’re on a different device, they can tell the AI their email address and resume their previous session.  
5. **Lead Capture**  
   As the conversation unfolds, SiteGuide naturally collects user information — name, email, questions — without feeling intrusive. It fills out forms for them, routes inquiries to the right department, and can even book appointments via integration with calendars and CRMs.  
6. **Voice \+ Mobile Support**  
   On mobile, users can speak to the assistant hands-free, making this ideal for on-the-go interactions.

---

**How It Works (Technical Stack):**

* **Frontend (Website Plugin):** A lightweight WordPress plugin injects SiteGuide onto any website. This script manages the UI, handles user interactions, and displays the assistant in a friendly chat-style interface.  
* **Backend (DigitalOcean Server):** The real-time communication and logic are powered by a custom backend running on DigitalOcean. It includes a WebSocket server for persistent two-way communication.  
* **Automation Engine (n8n):** All interactions are processed through n8n workflows — a no-code automation engine — allowing SiteGuide to be deeply customized for each business (e.g., different responses for different pages or industries).  
* **Data Layer (Supabase):** Session memory, user history, and conversation context are stored securely in Supabase — a modern backend-as-a-service platform that offers real-time sync, authentication, and PostgreSQL storage.

---

**Why It’s a Game-Changer:**

* **For Users:**  
  SiteGuide transforms the browsing experience into something *active and human*. It lowers friction, increases satisfaction, and helps users reach what they want faster.  
* **For Businesses:**  
  It dramatically improves lead generation, conversion rates, and support efficiency — without requiring live staff. Every interaction is logged, measured, and repeatable. It's like giving every website visitor their own intelligent assistant.  
* **For Agencies & SaaS:**  
  This is deployable at scale. One plugin. One backend. Thousands of clients — each with their own AI, workflow logic, and memory.

---

**Revenue Model:**  
Because this system runs on existing infrastructure (DigitalOcean \+ Supabase), the overhead is minimal. The service can be priced as:

* A monthly subscription per site (e.g., $19–$97/month)  
* Or bundled into higher-tier web service packages  
* With optional per-session or per-lead pricing for larger enterprise clients

Margins are high because recurring infrastructure costs are already covered under a single shared backend.

---

**In Summary:**  
SiteGuide is redefining what websites can do. It turns passive pages into intelligent, conversational experiences — blending AI, real-time navigation, and lead generation into one unified solution.

It’s scalable. It’s cost-effective. And it’s already aligned with emerging expectations of how users want to interact with digital content: hands-free, fast, and conversational.

---

### 🚀 **Zero-Friction Deployment: Instant Compatibility with WordPress**

Unlike most co-browsing or AI assistants that require heavy integration, custom API connections, or JavaScript SDKs, **SiteGuide is installable via a simple WordPress plugin**.

This means:

* **No developer required**  
  Any business owner or agency can deploy the AI assistant in seconds, without writing a single line of code.  
* **Instant Compatibility with 43% of the Internet**  
  WordPress powers over **43% of all websites worldwide**. By starting here, SiteGuide gains access to a massive install base without needing enterprise partnerships or long sales cycles.  
* **Built-in Plugin Infrastructure**  
  With updates, support, and configuration handled inside the WordPress admin dashboard, it behaves like any other premium plugin — seamless, familiar, and manageable.

---

### 🔄 **Scalable to Any Website**

Once the WordPress plugin is mature, **the same frontend script can be packaged for:**

* **Shopify**  
  As a storefront assistant with product navigation, cart reminders, and support built in.  
* **Webflow, Wix, Squarespace**  
  For solopreneurs, artists, and small businesses that need frictionless onboarding.  
* **Custom-built platforms**  
  By offering a drop-in JavaScript snippet (like Google Analytics or Drift), SiteGuide can run on *any* website — even enterprise portals and SPAs.

---

Here’s the **full feature set for SiteGuide with Co‑Browsing**, organized as a numbered list with a **clear title**, **concise description**, and a **priority level** (High, Medium, or Low) based on its strategic impact and technical feasibility.

---

### 🔥 CORE FEATURES

1. **Conversational AI Interface**  
   Natural language interaction through voice or text, enabling users to ask questions or give commands.  
   **Priority:** High  
2. **Smart Scroll & Element Highlighting**  
   AI scrolls the page and highlights relevant content in real time, drawing user attention to specific sections.  
   **Priority:** High  
3. **Cross-Page Memory**  
   Maintains the user's conversation and context as they navigate across different pages of the site.  
   **Priority:** High  
4. **Persistent Sessions**  
   Saves user sessions to allow them to return days or weeks later and resume where they left off — even across devices using email-linked recovery.  
   **Priority:** High  
5. **Real-Time Lead Capture**  
   Seamlessly collects user data during natural conversation without relying on traditional form submissions.  
   **Priority:** High  
6. **Voice-Controlled Navigation**  
   Users can navigate the site hands-free using spoken commands, ideal for mobile users.  
   **Priority:** Medium  
7. **Page-Aware Behavior**  
   AI customizes its tone, responses, and actions based on the type of page the user is on (e.g., pricing, blog, checkout).  
   **Priority:** Medium

---

### 🧭 CO-BROWSING & INTERACTION LAYERS

8. **Visual Pointer Overlay**  
   The AI uses subtle visual cues (arrows, pulses, highlights) to direct the user’s attention during guidance.  
   **Priority:** Medium  
9. **Dynamic Journey Map**  
   Shows a breadcrumb or visual timeline of where the user has been guided, allowing quick backtracking.  
   **Priority:** Low  
10. **Agent Shadow Mode**  
    Lets a team member silently view what the user is doing in real time and optionally take over if needed.  
    **Priority:** Medium  
11. **AI-to-Human Handoff with Context Transfer**  
    Enables seamless escalation to a human rep, with the full chat log and navigation trail handed over.  
    **Priority:** Medium  
12. **Live Element Tracking (Scroll Sync \+ DOM Awareness)**  
    Ensures the AI always understands the structure of the current page and tracks active user sections.  
    **Priority:** High

---

### 🔧 PLATFORM INTEGRATION & AUTOMATION

13. **Instant WordPress Plugin Deployment**  
    Easily install SiteGuide on any WordPress site with a plugin — no code required.  
    **Priority:** High  
14. **Supabase-Powered Session Storage**  
    Securely stores and retrieves session data using Supabase for long-term, cross-device memory.  
    **Priority:** High  
15. **n8n Workflow Engine Integration**  
    Every user interaction flows through n8n automations, allowing full customization per site.  
    **Priority:** High

Here is the detailed and thorough Product Requirements Document (PRD) for **SiteGuide with Co‑Browsing by aiConnected**:

---

# 🧾 SiteGuide with Co-Browsing

**Product Requirements Document (PRD)**  
**Version:** 1.0  
**Date:** 2025-07-30  
**Prepared for:** Development and engineering teams  
**Prepared by:** aiConnected (Bob)

---

## 📌 1\. Overview

### 1.1 Product Summary

**SiteGuide** is an AI-powered web assistant embedded into websites to help users navigate, understand, and interact with site content through conversation. Unlike typical chatbots, SiteGuide **controls the actual webpage** in real-time, scrolling to relevant sections, highlighting key content, and maintaining persistent memory across pages and visits.

### 1.2 Core Objective

The goal is to create a **self-guided, AI-native co-browsing assistant** that can be deployed via WordPress plugin (and eventually other platforms), enabling real-time navigation, user interaction, lead capture, and intelligent follow-up — **with no live agent required.**

---

## 🎯 2\. Core Features & Functional Requirements

---

### 2.1 Conversational AI Interface

**Description:** The assistant accepts natural language input via voice or text and responds with helpful, context-aware answers.

**UI Requirements:**

* Chat bubble visible on all site pages (unless suppressed by admin settings)  
* Opens into a floating modal with:  
  * Input field (text)  
  * Microphone icon (voice)  
  * AI response pane with smooth message rendering  
* Widget must be draggable and mobile-responsive

**Functional Requirements:**

* Understands conversational questions (e.g., “What’s your refund policy?”)  
* Can reference current page context and DOM content  
* Pulls FAQs, structured page data, and metadata for its responses  
* Allows seamless switching between text and voice

**Back-End Requirements:**

* AI inference handled via OpenAI, Claude, or other LLM APIs  
* Memory and conversation history stored in Supabase, tied to session token  
* Voice processed via Web Speech API (MVP) or ElevenLabs (enhanced)

---

### 2.2 Scroll-to-Element & Highlighting

**Description:** Based on user queries or internal logic, the assistant scrolls to a target section of the page and visually highlights it.

**Functional Requirements:**

* DOM is scanned on page load using custom JavaScript to identify common blocks: headers, pricing tables, FAQs, images, etc.  
* Scroll to the relevant element using `scrollIntoView({ behavior: 'smooth' })`  
* Apply temporary CSS highlighting animation (glow, border pulse)

**Highlight Options:**

* `box-shadow` pulse on container div  
* Border color shift for attention  
* Optional pointer icon (Phase 2\)

**Target Identification Logic:**

* Use semantic tags, `data-siteguide` attributes, or nearest heading anchors  
* Classify content using tag weight (e.g., `<h2>` over `<p>`)  
* Use XPath or document structure for fallback targeting

---

### 2.3 Persistent Session Memory

**Description:** All user interactions are saved to a session and retrievable by device or user email.

**Anonymous Memory System:**

* Session ID generated and stored in `localStorage`  
* All interactions logged in Supabase under session ID  
* Memory includes chat, page visits, scrolls, highlights, lead data

**Email-Linked Sessions:**

* At any point, user can say “Remember me” or give their email  
* Session ID linked to email in Supabase  
* On future visits (even new devices), user can say “Pick up where I left off” or input email to resume

**Requirements:**

* Session TTL: 6 months minimum  
* All context is loaded and rehydrated into frontend memory store on reconnect  
* Expired sessions are archived but queryable for analytics

---

### 2.4 Multi-Page Context Tracking

**Description:** AI maintains full memory of what the user has viewed and asked across different site pages.

**Mechanism:**

* Each page change updates `currentPage` and `referrerPage` in memory  
* Supabase logs:  
  * `session_id`  
  * `page_url`  
  * `timestamp`  
  * `scroll_position`  
  * `interaction_type`

**Expected Behavior:**

* If a user asks about a feature they saw earlier, AI should be able to say:  
  “You were looking at the pricing page earlier. Would you like me to take you back?”

---

### 2.5 Lead Capture via Conversation

**Description:** As the user interacts, SiteGuide collects lead information naturally — without explicit form fields.

**Collection Points:**

* Name (inferred from question: “Hi, I’m Sam — I had a question about pricing.”)  
* Email (“You can send it to [sam@email.com](mailto:sam@email.com)”)  
* Phone number (if mentioned)  
* Type of inquiry (detected from conversation content)

**Behavior:**

* Data auto-injected into any active form on the page (via JavaScript)  
* Optionally pushed to Supabase or n8n workflow for CRM sync

**n8n Integration:**

* Webhook or Supabase trigger sends lead to connected CRM (e.g., HubSpot, Salesforce)  
* Triggers follow-up automation

---

### 2.6 WordPress Plugin Delivery

**Description:** SiteGuide is deployed via plugin on WordPress sites.

**Features:**

* Easy upload and install via .zip or WordPress marketplace  
* Plugin admin panel includes:  
  * AI assistant name and welcome message  
  * Toggle for voice mode  
  * Page exclusion rules  
  * Widget placement settings (bottom right, left, inline, etc.)  
* Plugin auto-loads core script across public pages

**Script Behavior:**

* Asynchronous script load  
* Degrades gracefully if disabled  
* Securely connects to WebSocket backend

---

### 2.7 Voice Interaction (MVP \+ Enhanced)

**MVP:** Web Speech API for TTS and STT  
**Enhanced:** ElevenLabs for more realistic voice output

**Voice Input Requirements:**

* Microphone toggle on widget  
* Press-to-talk or voice wakeup (MVP: manual only)

**Voice Output Requirements:**

* AI responds using browser TTS or ElevenLabs API  
* Should reflect tone: cheerful, helpful, confident, etc.

**Accessibility:**

* Voice must fallback to text if browser lacks microphone  
* All spoken output must also appear as text

---

### 2.8 WebSocket Real-Time Sync

**Description:** Persistent 2-way connection between frontend and AI backend.

**Uses:**

* AI sends scroll or highlight commands in real-time  
* AI receives live context updates (user location, clicks, etc.)

**Requirements:**

* Socket ID assigned per session  
* Keep-alive with heartbeat every 15s  
* Reconnect with exponential backoff

**Libraries:**

* Socket.io or WS (Node.js)  
* Host on DigitalOcean server with TLS and rate limits

---

### 2.9 Supabase Storage Architecture

**Tables Required:**

* `users` → { id, email, created\_at }  
* `sessions` → { id, user\_id, anon\_id, created\_at, last\_active }  
* `interactions` → { id, session\_id, message, intent, timestamp }  
* `page_visits` → { id, session\_id, page\_url, timestamp }  
* `leads` → { id, session\_id, name, email, phone, tags }

**Security:**

* Use Supabase RLS (Row-Level Security)  
* Read/write access only for authenticated backend

---

### 2.10 Admin/Agent Shadow Mode (Phase 2\)

**Description:** Admin can observe active sessions in real-time.

**Features:**

* View active session list in dashboard  
* Click into a session to view current page and scroll state  
* Option to “ghost” the user without intervention

**Requirements:**

* Streaming scroll position via WebSocket  
* Read-only DOM mirror (sanitized)

---

## 🧪 3\. Success Criteria (MVP)

| Feature | Success Metric |
| :---- | :---- |
| AI answers contextually | \>85% questions answered using current page content |
| Scroll/highlight accuracy | \>90% successful targeting of correct element |
| Persistent memory | Session resumes accurately across pages/devices |
| Lead capture efficacy | \>50% completion rate in natural convo flow |
| Plugin install time | \<3 minutes average install by non-technical user |
| Voice accuracy (STT) | \>90% correct speech transcription |
| WebSocket latency | \<200ms round trip for scroll/highlight commands |

---

## ✅ What’s Already Excellent

### 🧠 Conceptual Clarity

* The product's purpose, goals, and unique value are clearly defined.  
* Differentiation from competitors is well understood and implementation-focused.

### 🔧 Functional Coverage

* Features are broken down with detailed behavioral expectations.  
* Technical systems like WebSockets, Supabase schema, and session logic are outlined clearly.  
* Integration points (n8n, WordPress, Supabase) are mapped.

### 🧪 Success Metrics

* Each feature includes a measurable performance benchmark, which guides QA and iteration.

---

## 🔍 What’s Still Needed for Development Readiness

### 1\. **UX/UI Specifications (Missing)**

**What’s needed:**

* Full wireframes or UI mockups for:  
  * Assistant interface (desktop and mobile)  
  * Plugin admin panel in WordPress  
  * Lead capture confirmation state  
* Interaction design (e.g., animations for scroll/highlight, voice input UI behavior)

**Why it matters:**  
Developers need to know not just *what* to build, but *how it should look and feel* to the user.

---

### 2\. **LLM Prompt Engineering Guidance**

**What’s needed:**

* Prompt templates for:  
  * Initial greeting  
  * Memory-aware follow-ups  
  * Scroll-to commands (“scroll to the pricing section”)  
  * Highlight decisions  
* Fallback behavior if no matching element is found

**Why it matters:**  
The effectiveness of the assistant relies heavily on prompt quality. Without these templates, behavior could be inconsistent or underwhelming.

---

### 3\. **Data Flow Diagrams / Sequence Charts**

**What’s needed:**

* Sequence diagram for:  
  * Session creation → interaction → session recall  
  * Scroll/highlight command flow (AI → backend → frontend)  
  * Lead capture and dispatch via n8n

**Why it matters:**  
It ensures all teams — frontend, backend, automation — are aligned on when and how each component fires.

---

### 4\. **Testing Plan & Edge Cases**

**What’s needed:**

* What to test and how:  
  * Session recovery across incognito vs. logged-in devices  
  * How the AI handles failed scroll/highlight attempts  
  * How voice behaves on unsupported browsers  
  * Race conditions with fast page switching

**Why it matters:**  
QA teams (or devs themselves) need precise criteria for catching edge-case bugs or performance failures.

---

### 5\. **CI/CD \+ Deployment Environment Plan**

**What’s needed:**

* Where the plugin JS is hosted (CDN?)  
* Deployment structure for the WebSocket server (Docker? PM2? Horizontal scaling?)  
* Versioning and rollback strategy  
* Staging vs. production environment separation

**Why it matters:**  
Without this, DevOps becomes a bottleneck. Plugin updates, backend logic fixes, and real-time systems must be safely deployable.

---

## 🟢 Final Verdict

As a developer, I’d say:

* **This PRD is 80–85% complete**  
  It gives me the **why, what, and how** of the system.  
* To **ship with confidence**, I’d need:  
  * Visual mockups / UX spec  
  * Prompt templates for LLM behavior  
  * Architecture and event flow diagrams  
  * Deployment and testing details

---

# 🧾 **PRD Outline for SiteGuide with Co-Browsing**

*(Developer-Grade, Zero-Assumption Version)*

---

## 1\. 📌 Introduction

### 1.1 What is SiteGuide?

Explain the concept in plain language: what it is, what it does, and why it matters.

### 1.2 Core Value Proposition

Who it's for (e.g., business websites), what problem it solves (user navigation & lead conversion), and why it's better than traditional live chat or bots.

### 1.3 Deployment Targets

Start with WordPress, then expand to other platforms.

---

## 2\. 🎯 Product Goals

### 2.1 Primary Goals

* Real-time AI-powered navigation  
* Automatic scrolling and content highlighting  
* Persistent sessions across visits/devices  
* Lead capture during conversation

### 2.2 Success Criteria

Define measurable outcomes (e.g., time to install, scroll accuracy, session recall success rate, lead conversion rate).

---

## 3\. 🧠 Feature Overview

### 3.1 Summary Table

Each feature with:

* Title  
* Description  
* Inputs/outputs  
* Priority

---

## 4\. 🧱 System Architecture

### 4.1 High-Level Diagram

Visual: frontend, backend, Supabase, n8n, WebSocket server, LLM provider

### 4.2 Data Flow Maps

* Page load → chat open → AI response → scroll  
* Session creation → memory store → recall via email  
* Lead captured → send to CRM

---

## 5\. ⚙️ Technical Components (Modular Breakdown)

### 5.1 Frontend Widget

* Chat UI (text & voice)  
* Scroll and highlight logic  
* DOM observer  
* Local session storage  
* Voice interaction handler

### 5.2 WordPress Plugin

* Script injector  
* Admin panel (branding, placement, toggles)  
* Page-level control

### 5.3 WebSocket Server

* Persistent connection  
* Message routing (scroll/highlight/data)  
* Authentication (anon or email-linked)

### 5.4 Supabase

* Data schema  
* Row-level security  
* Realtime listeners

### 5.5 LLM Logic Layer

* Prompt templates  
* Context embedding  
* Response validation  
* Fallback handling

### 5.6 n8n Integration

* Lead push (to CRM, email, etc.)  
* Session activity logging  
* Trigger-based automations

---

## 6\. 🛠️ Feature Specifications (One-by-One)

Each feature will have:

* **Title**  
* **User Story**  
* **Functional Requirements**  
* **Edge Cases**  
* **Frontend Behavior**  
* **Backend Logic**  
* **Storage Requirements**  
* **Success Criteria**  
* **Dependencies**

Features to cover:

* AI conversation engine  
* Scroll-to-element  
* DOM highlighting  
* Visual pointer  
* Voice commands (STT and TTS)  
* Email-linked session recall  
* Multi-page session memory  
* Lead capture  
* Plugin install experience  
* Mobile and desktop behavior  
* Real-time communication via WebSocket  
* Offline/degraded mode behavior

---

## 7\. 🧪 Testing & QA Plan

### 7.1 Unit Tests

What components must be individually verified

### 7.2 Integration Tests

How systems should behave across modules (e.g., frontend \+ Supabase \+ AI)

### 7.3 Manual QA Flows

Click-through test scripts for testers (e.g., "Ask a question → scroll → return tomorrow")

---

## 8\. 🎨 UI/UX Specifications

### 8.1 Widget Wireframes

Floating chat bubble, open chat, voice input state

### 8.2 Highlight/Pointer Animations

CSS specs for glow, border, pulse, transitions

### 8.3 Plugin Admin Panel Mockups

Toggle behaviors, customization inputs, field validation

---

## 9\. 🔐 Security & Privacy

### 9.1 Data Collection Rules

Anonymous tracking, opt-in consent for email memory, GDPR/CCPA compliance

### 9.2 Storage Security

Encryption in transit, Supabase RLS enforcement, API key handling

---

## 10\. 🚀 Deployment Plan

### 10.1 Environments

Local, staging, production setup

### 10.2 Hosting

DigitalOcean for WebSocket \+ logic servers  
Supabase for DB and API  
Plugin distributed via WordPress

### 10.3 CI/CD

How updates are deployed, plugin versioning, rollback procedures

---

## 11\. 🧰 Developer Resources

### 11.1 LLM Prompt Library

Standard prompt patterns for AI behavior

### 11.2 DOM Element Targeting Guide

Classes and data attributes to annotate key content (for scroll/highlight accuracy)

### 11.3 WebSocket Message Formats

Send/receive payload specs for scroll, highlight, resume session, etc.

### 11.4 Supabase Schema & ERD

Detailed database schema, relationships, and example queries

### 11.5 API Documentation

Internal REST/WebSocket/n8n endpoint specs

---

## 12\. 📎 Appendices

* Glossary of Terms  
* Fallback UI Modes  
* Integration FAQs  
* Support Ticket Handling (post-launch)

---

Here’s the revised outline for the **SiteGuide with Co-Browsing** Product Requirements Document (PRD), optimized for clarity, technical precision, and zero ambiguity.

---

# SiteGuide with Co-Browsing

**Product Requirements Document (PRD)**  
**Prepared for:** aiConnected  
**Prepared by:** OpenAI Assistant  
**Audience:** Frontend Developers, Backend Engineers, Full-Stack Developers, QA Engineers, Product Managers  
**Version:** 1.0

---

## 1\. Introduction

### 1.1 Product Summary

### 1.2 Problem Statement

### 1.3 Target Users

### 1.4 Use Cases and Scenarios

### 1.5 Goals and Non-Goals

## 2\. Product Objectives and Success Criteria

### 2.1 Primary Objectives

### 2.2 Key Performance Indicators (KPIs)

### 2.3 Constraints and Assumptions

## 3\. System Overview

### 3.1 Component Architecture

### 3.2 Data Flow and Lifecycle

### 3.3 High-Level Diagrams

### 3.4 Technologies and Tools Used

## 4\. Functional Feature List

A summary table of all major features including:

* Feature Name  
* Description  
* Dependencies  
* Priority (Must, Should, Could)

## 5\. Module Specifications

Each feature/module will have a full specification including:

* Purpose  
* Trigger/Event  
* Inputs  
* Outputs  
* Behavior and Flow  
* UI Requirements  
* State Management  
* Error Handling  
* API Integration (if any)  
* Storage or Persistence  
* Edge Cases

### 5.1 Conversational Interface

### 5.2 Scroll-to-Element Functionality

### 5.3 DOM Highlighting

### 5.4 Visual Pointer (Optional)

### 5.5 Voice Input and Output

### 5.6 Session Persistence and Memory

### 5.7 Email-Linked Session Recovery

### 5.8 Cross-Page Memory Management

### 5.9 Lead Capture via Conversation

### 5.10 WordPress Plugin Delivery

### 5.11 WebSocket Connection Management

### 5.12 Supabase Integration for Storage

### 5.13 n8n Integration for Automation

### 5.14 Mobile-Responsive and Accessibility Behavior

### 5.15 Admin Shadow Mode (Optional, Phase 2\)

## 6\. Data and Schema Definitions

### 6.1 Supabase Table Schema

### 6.2 Entity Relationship Diagrams (ERD)

### 6.3 WebSocket Message Structure

### 6.4 LocalStorage and SessionStorage Structure

### 6.5 n8n Webhook Structures

## 7\. UI/UX Specifications

### 7.1 Chat Widget Behavior and States

### 7.2 Voice Interface UX

### 7.3 Scroll and Highlight Animations

### 7.4 Assistant Avatar and Branding Options

### 7.5 Admin Panel UI (for WordPress Plugin)

## 8\. Prompt Design and AI Behavior

### 8.1 Base Prompt Templates

### 8.2 Dynamic Prompt Variables

### 8.3 Page-Aware Prompt Adjustments

### 8.4 Fallback and Safety Logic

### 8.5 User Input Classification and Routing

## 9\. Testing and Quality Assurance

### 9.1 Unit Test Requirements

### 9.2 Integration Test Plans

### 9.3 Manual QA Checklist

### 9.4 Regression Testing

### 9.5 Voice/Accessibility Testing

## 10\. Deployment Plan

### 10.1 Hosting Requirements

### 10.2 Deployment Pipelines

### 10.3 Plugin Distribution and Versioning

### 10.4 CI/CD Strategy

### 10.5 Error Logging and Monitoring

## 11\. Security and Compliance

### 11.1 Session Security

### 11.2 Supabase Row-Level Security

### 11.3 GDPR/CCPA Compliance

### 11.4 Voice and Data Consent

### 11.5 API Rate Limiting and Abuse Handling

## 12\. Developer Tools and Support Materials

### 12.1 API and WebSocket Documentation

### 12.2 DOM Targeting Strategy and Examples

### 12.3 Local Dev Setup Guide

### 12.4 Sample Prompt Library

### 12.5 Troubleshooting and Debugging Guide

## 13\. Appendix

### 13.1 Glossary of Terms

### 13.2 Browser Support Matrix

### 13.3 Phase 2 and Phase 3 Feature Planning

### 13.4 References and External Docs

---

# 1\. Introduction

### 1.1 Product Summary

**SiteGuide** is an embeddable AI-powered web assistant that guides users through a website in real-time using natural language interaction. It behaves like a human guide or concierge, helping visitors locate relevant content by directly controlling the page—scrolling, highlighting, and referencing specific sections of the website visually and conversationally.

SiteGuide differs from traditional chatbots by offering a co-browsing experience. The assistant not only answers questions, but physically manipulates the site as the user watches. This includes scrolling the page to specific areas, highlighting content, and capturing leads—all through a natural, conversation-driven experience.

The assistant can also speak and listen using built-in voice recognition and text-to-speech, making it fully voice-enabled and mobile-friendly. Session memory is persistent: users can return to the site days or even months later and resume their previous interaction, either automatically (via device) or by identifying themselves (e.g., email address).

The MVP is delivered as a WordPress plugin and later as a platform-agnostic JavaScript library for use on any website.

---

### 1.2 Problem Statement

Most websites today are passive and rely on users to find their way around. Even those that implement live chat or automated bots are still heavily dependent on:

* User familiarity with site layout  
* Traditional form submissions  
* Human intervention for sales or support  
* Session loss upon reloads, navigation, or future visits

Visitors often bounce from websites due to friction, confusion, or fatigue, especially on mobile where navigation can be clunky. Businesses lose potential customers every day not because their content is missing—but because users can’t *find it fast enough*.

SiteGuide solves this by transforming the site into an interactive, guided experience—reducing drop-offs, increasing conversions, and making self-navigation effortless.

---

### 1.3 Target Users

**1\. Website Owners and Agencies**

* Small-to-medium businesses using WordPress or custom websites  
* Marketing teams looking to improve engagement and lead capture  
* Agencies who want to deploy a smart assistant across multiple client sites

**2\. End-Users (Site Visitors)**

* First-time visitors seeking fast answers  
* Mobile users who prefer voice or hands-free interaction  
* Users evaluating services (e.g., legal, health, B2B, education, etc.)

---

### 1.4 Use Cases and Scenarios

1. **New Visitor Asking a Common Question**  
   “Where is your pricing?”  
   → SiteGuide scrolls to the pricing section, highlights it, and explains key points.  
2. **Returning Visitor**  
   “Pick up where we left off.”  
   → SiteGuide recalls the previous session, brings the user to the last page viewed, and reminds them of the conversation.  
3. **Mobile User with Voice Only**  
   “Can I schedule a consultation?”  
   → SiteGuide responds audibly and begins the appointment booking process.  
4. **Lead Generation Without a Form**  
   As the user asks questions, SiteGuide captures name, email, and interest, then syncs it with the business CRM in the background.

---

### 1.5 Goals and Non-Goals

**Goals**

* Create a real-time, AI-driven assistant that can:  
  * Answer questions contextually  
  * Control website scroll and highlight functions  
  * Persist user sessions over time and across devices  
  * Work on mobile and desktop with voice input  
  * Seamlessly capture leads during conversation  
* Deliver via a lightweight WordPress plugin with zero developer setup required

**Non-Goals**

* SiteGuide is not a human-agent chat platform (e.g., Intercom or Zendesk)  
* It does not offer live screen-sharing or video calling  
* It is not designed to provide support for complex account management or troubleshooting workflows  
* It does not require, and should not rely on, external APIs for static site structure parsing

---

# 2\. Product Objectives and Success Criteria

### 2.1 Primary Objectives

The following objectives define what SiteGuide must accomplish by the end of the MVP phase:

1. **Enable real-time AI-guided browsing**  
   Users must be able to ask a question or express a need in natural language, and the assistant must:  
   * Understand the request  
   * Determine the relevant content on the page  
   * Automatically scroll to and highlight that content  
2. **Capture lead information conversationally**  
   Without requiring a formal form submission, SiteGuide must detect and extract contact details (name, email, phone, intent) during natural dialogue and send them to the backend or CRM.  
3. **Support persistent session memory across time and devices**  
   The assistant must remember what a user saw, asked, or did in past visits, and allow:  
   * Session recall via the same device (local ID)  
   * Session recovery via email (cross-device)  
4. **Voice interaction for hands-free control**  
   On mobile and desktop browsers that support it, the assistant must allow:  
   * Voice input (speech-to-text)  
   * Voice output (text-to-speech)  
   * Seamless toggling between voice and text modes  
5. **Deploy via WordPress plugin with no developer setup**  
   The entire co-browsing system must function as a plug-and-play solution. WordPress site owners must be able to:  
   * Install the plugin  
   * Customize its behavior through a visual admin interface  
   * Activate it without writing or modifying any code  
6. **Real-time AI control via WebSocket**  
   Actions like scrolling and highlighting must be triggered instantly via two-way communication between the LLM backend and the browser widget. WebSocket architecture must support:  
   * Persistent connections  
   * Low latency (\<200ms)  
   * Session reconnection across page reloads  
7. **Front-end behavior must be fast and intuitive**  
   The assistant must not delay page load, interfere with page behavior, or create user frustration due to visual lag, misfires, or conflicting styles.

---

### 2.2 Key Performance Indicators (KPIs)

These KPIs define whether SiteGuide is functionally and commercially successful:

| Objective | KPI | Target |
| :---- | :---- | :---- |
| Scroll-to-section accuracy | % of scrolls that land on correct target | ≥ 90% |
| Lead capture rate | % of engaged sessions resulting in email or name capture | ≥ 50% |
| Session recall success | % of returning users whose session was successfully resumed | ≥ 80% |
| Voice recognition accuracy | % of correctly interpreted voice commands | ≥ 90% |
| Widget load time | Time from page load to widget ready | \< 1.5s |
| Real-time latency | Time from AI decision to scroll/highlight action | \< 200ms |
| Plugin install time | Time from plugin install to first working assistant interaction | \< 3 minutes |

---

### 2.3 Constraints and Assumptions

**Known Constraints:**

* SiteGuide must not rely on modifying the structure of client websites (i.e., works with unknown HTML structures)  
* LLM processing and WebSocket backend are hosted centrally and must serve many sites  
* Not all devices or browsers will support voice interaction  
* The assistant must work across both SPA (Single Page Application) and MPA (Multi-Page Application) WordPress themes

**Assumptions:**

* Most users will not have JavaScript or cookies disabled  
* Most deployments will be on modern WordPress websites using themes that follow semantic HTML practices  
* Businesses using SiteGuide will prefer ease of use over customization  
* Internet connectivity is stable enough to support persistent WebSocket communication

---

# 3\. System Overview

### 3.1 Component Architecture

SiteGuide is composed of the following architectural layers:

#### 1\. Client-Side Widget (Frontend)

A JavaScript-based assistant that is injected into a website via WordPress plugin (and later via universal embed). It handles:

* The user interface (chat, voice, and assistant behavior)  
* Page manipulation (scrolling, highlighting, pointer rendering)  
* Real-time communication with the backend over WebSocket  
* DOM scanning and target matching  
* Local memory and session management

#### 2\. WordPress Plugin

A self-contained plugin that:

* Installs and injects the SiteGuide widget on all site pages  
* Provides a GUI admin panel for customization (e.g., assistant name, color, visibility rules)  
* Connects to the aiConnected backend via provided credentials

#### 3\. WebSocket Server

A persistent connection layer that:

* Bridges real-time communication between the assistant frontend and the AI backend  
* Receives structured commands from the LLM (e.g., “scroll to pricing”) and emits them to the appropriate client  
* Maintains socket sessions per user/site  
* Supports multi-tenant infrastructure (each WordPress site \= a tenant)

#### 4\. LLM Processing Layer

Responsible for:

* Interpreting user inputs (voice or text)  
* Generating context-aware responses based on website structure, session memory, and intent  
* Producing structured action instructions (e.g., {action: "scroll", target: "faq\_section"})

Can be powered by OpenAI, Claude, or custom models.

#### 5\. Supabase (Database and Session Memory)

Supabase handles:

* Session persistence (page visits, conversation logs, memory embeddings)  
* Lead storage (name, email, message intent)  
* Cross-device session recall via user ID/email  
* Real-time row-based syncing (optional)

#### 6\. n8n Workflow Automation

n8n powers backend automation tasks including:

* Sending captured leads to CRM or email  
* Triggering internal alerts or follow-ups  
* Logging analytic events (e.g., session started, session resumed, form auto-filled)

---

### 3.2 Data Flow and Lifecycle

#### Basic Lifecycle: Anonymous User

1. Page loads → widget initializes → anonymous session ID created  
2. User opens assistant → begins chat or voice interaction  
3. Input sent to AI via WebSocket → AI interprets \+ responds  
4. AI sends structured action (e.g., scroll, highlight) to frontend  
5. Actions are executed and logged (conversation, actions, DOM references)  
6. User may provide an email → anonymous session is upgraded to persistent session

#### Returning User (Same Device)

1. Widget checks for `siteguide_session_id` in localStorage  
2. If found, fetches memory from Supabase  
3. Assistant greets the user and optionally offers to resume last session

#### Returning User (Different Device)

1. User says “Pick up where I left off” or provides email  
2. Widget makes authenticated query to Supabase to fetch session history  
3. Memory is restored and interaction resumes

---

### 3.3 High-Level Diagrams

A future version of this document will include full visual diagrams:

* Component Communication Flow (Frontend → WebSocket → AI → Supabase)  
* Session Lifecycle Diagram  
* DOM Interaction Flow (scroll → highlight → pointer → confirmation)  
* Multi-tenant architecture for scaling across many websites

*(Let me know if you want me to generate those as vector diagrams or Mermaid syntax.)*

---

### 3.4 Technologies and Tools Used

| Component | Technology |
| :---- | :---- |
| Assistant Frontend | Vanilla JS (or React), Tailwind CSS (optional), Web Speech API |
| Voice Processing | Web Speech API (MVP), ElevenLabs (enhanced) |
| DOM Interaction | IntersectionObserver, MutationObserver, scrollIntoView |
| Backend AI Logic | OpenAI, Anthropic, or LLM via API |
| Real-Time Communication | Node.js \+ socket.io or ws |
| Memory \+ Storage | Supabase (PostgreSQL \+ RLS) |
| Plugin Platform | WordPress (PHP 7+, Gutenberg compatible) |
| Automation | n8n (self-hosted or cloud-hosted) |
| Hosting | DigitalOcean VPS (WebSocket), Vercel/Cloudflare (static JS), Supabase (backend) |

---

# 4\. Functional Feature List

Each feature listed below will be fully defined in Section 5\. This list provides a high-level overview of what the assistant must do, how critical each item is to the MVP, and what other systems or components it depends on.

| \# | Feature Name | Description | Dependencies | Priority |
| :---- | :---- | :---- | :---- | :---- |
| 1 | Conversational AI Interface | Accepts user input via chat or voice, sends it to the AI, and renders natural responses | LLM API, WebSocket | Must |
| 2 | Scroll-to-Element Functionality | Automatically scrolls to the most relevant section on the page based on AI instruction | DOM scanning, WebSocket | Must |
| 3 | DOM Element Highlighting | Visually highlights target content using animation and styling | DOM targeting engine | Must |
| 4 | Voice Input and Output | Users can speak to the assistant and hear its responses aloud | Web Speech API, ElevenLabs | Should |
| 5 | Persistent Session Memory | Tracks user behavior and history locally and in Supabase | Supabase | Must |
| 6 | Email-Linked Session Recovery | Allows users to recover past sessions across devices using their email address | Supabase, UI logic | Must |
| 7 | Cross-Page Session Continuity | Remembers the conversation and behavior across internal site page navigations | Local memory \+ Supabase | Must |
| 8 | Lead Capture via Conversation | Collects name, email, and intent as part of natural chat flow | n8n, Supabase | Must |
| 9 | WordPress Plugin | Allows easy installation, customization, and activation on any WordPress site | WordPress, Admin UI | Must |
| 10 | Real-Time AI Command Execution | Receives AI commands like “scroll to pricing” over WebSocket and executes them | WebSocket, AI backend | Must |
| 11 | Widget Customization Panel | Admin UI in WordPress to customize assistant name, icon, color, voice mode, page exclusions | Plugin Admin Panel | Must |
| 12 | Page-Aware Prompting | AI adjusts tone and behavior based on page context (e.g., homepage vs. FAQ) | URL resolver, prompt system | Should |
| 13 | Visual Pointer Overlay (Optional) | Optional arrow or pulse pointer that visually emphasizes what the AI is referencing | CSS renderer, DOM mapping | Could |
| 14 | Session Rehydration on Load | Automatically restores memory and scroll state on new visit or page load | Supabase, session engine | Must |
| 15 | n8n Workflow Automation | Routes leads, stores logs, sends notifications or analytics data | n8n Webhooks or Supabase Triggers | Must |
| 16 | Fallback and Error Handling | Handles failure cases (e.g., no scroll target found, AI timeout) gracefully | Error monitoring system | Must |
| 17 | Mobile and Accessibility Compliance | Assistant is responsive, accessible via keyboard, and screen-reader friendly | Frontend \+ voice UI | Should |
| 18 | WebSocket Connection Management | Reconnects on refresh, detects dropped sockets, resumes session context | WebSocket handler | Must |
| 19 | Shadow Mode (Phase 2\) | Allows admin to observe live sessions (read-only DOM stream) | WebSocket, viewer UI | Could |
| 20 | Analytics and Event Logging | Logs usage events such as opens, closes, scrolls, highlights, and lead captures | Supabase, n8n, optional dashboard | Should |

---

### Feature Priority Key

* **Must**: Required for MVP launch. These features must be stable, tested, and integrated.  
* **Should**: Not strictly required for MVP but highly recommended for product completeness or reliability.  
* **Could**: Nice-to-have or experimental features that can be deferred or gated behind admin controls.

---

# 5.1 Conversational AI Interface

### Purpose

The Conversational AI Interface is the user-facing module that accepts user input (typed or spoken), forwards it to the AI backend, and renders the AI’s response within a styled chat widget. It serves as the primary interface for interacting with the assistant, and is responsible for triggering all downstream co-browsing actions, such as scrolling, highlighting, and lead capture.

---

### User Story

* As a visitor to a website, I want to ask questions in a natural way so that the AI can help me find the content I need without searching manually.  
* As a mobile user, I want to speak to the assistant and receive spoken answers hands-free.  
* As a returning visitor, I want the assistant to remember me and pick up where I left off.

---

### Functional Requirements

#### Input Handling

* Accepts natural language input from user via text field.  
* Optional microphone button allows speech-to-text input via Web Speech API.  
* Detects when input is empty, too short, or outside expected behavior (e.g., non-verbal sounds).  
* Detects user requests that are:  
  * Content-related (e.g., “Where is the pricing?”)  
  * Procedural (e.g., “I want to schedule a consultation.”)  
  * Memory-linked (e.g., “Pick up where I left off.”)  
  * Identifying (e.g., “My email is [john@acme.com](mailto:john@acme.com).”)

#### AI Query Execution

* Formats user input into a structured JSON payload:

```json
{
  "session_id": "abc123",
  "message": "Where is the pricing?",
  "page_url": "https://clientsite.com/pricing",
  "timestamp": 1692721934,
  "device_info": {...},
  "memory_context": {...}
}
```

* Sends query to backend AI processor via WebSocket or REST (depending on architecture decision).  
* Waits for AI response or fails after a defined timeout (e.g., 10 seconds).  
* On error, shows fallback response:  
  “I didn’t quite catch that. Can you try rephrasing it?”

#### Output Rendering

* Renders AI response in chat bubble using typing animation (e.g., one character per 10ms).  
* Response may include:  
  * Plain text  
  * Action instructions (e.g., `scrollTo`, `highlight`, `captureLead`)  
  * Follow-up question prompts (e.g., “Would you like me to show you that section?”)

#### Session Interaction

* Saves every message (user and AI) to session memory in Supabase, with timestamp and message type.  
* Tracks which messages triggered downstream actions.  
* Supports follow-up chaining: AI can ask for clarification or present follow-up options.

#### Voice Output

* If voice mode is enabled, the AI’s response is also read aloud using:  
  * Web Speech API (MVP)  
  * ElevenLabs TTS (optional Phase 2\)  
* Auto-disables if browser lacks TTS capability.

---

### Trigger Events

| Event | Trigger Condition |
| :---- | :---- |
| Open assistant | User clicks chat bubble or loads auto-open URL |
| Input submitted | User presses Enter or microphone completes STT |
| Session resume offered | Returning visitor with known session or email |
| Action command received | AI responds with structured instruction |
| Voice playback requested | User is in voice mode and response is complete |

---

### UI/UX Requirements

* Chat bubble is persistent in lower right corner of screen (customizable).  
* When clicked, opens a full chat window with:  
  * Assistant avatar  
  * Conversation thread (persisted across pages)  
  * Input field  
  * Optional microphone toggle  
* Supports mobile layout:  
  * Full-screen modal on phones  
  * Larger tap targets  
  * Voice interaction primary, with fallback to text

---

### State Management

* Local session state is stored in memory using JavaScript module or context provider:

```javascript
const session = {
  id: "abc123",
  messages: [...],
  lastPage: "/pricing",
  memoryTokens: [...],
  voiceEnabled: true,
};
```

* On every input or response, session is synced with Supabase (async).

---

### Error Handling

* If voice input fails (e.g., user denies microphone access), show:  
  “It looks like I couldn’t access your microphone. Try typing instead.”  
* If AI times out, show:  
  “I’m having trouble connecting to the assistant right now. Please try again in a moment.”  
* If AI response is missing expected structure, fallback to:  
  “Here’s what I found—but I couldn’t navigate for you just yet.”

---

### API Integration

* AI backend endpoint:  
  `POST /ai/interpret` (or WebSocket message channel)  
  Expected response:

```json
{
  "message": "The pricing section is just below.",
  "action": "scroll",
  "target": "#pricing-table",
  "memory": {...},
  "suggestedFollowUp": "Would you like to compare plans?"
}
```

* Supabase:  
  * `insert` into `conversations` table  
  * `upsert` session memory  
  * Optional trigger to n8n for sentiment or analytics

---

### Storage Requirements

* All messages (user and AI) stored in Supabase with:  
  * `session_id`  
  * `sender_type` (user/ai)  
  * `message_text`  
  * `timestamp`  
  * `page_context`  
  * `action_triggered` (boolean)

---

### Edge Cases

* User gives empty input: disable send button  
* User speaks but says nothing (e.g., background noise): discard event  
* Multiple users on same device/browser: store separate sessions with unique anonymous IDs  
* Connection drops during interaction: queue message locally, retry once WebSocket reconnects

---

### Success Criteria

* ≥ 90% of valid inputs receive AI responses within 2 seconds  
* 100% of sessions have messages logged in Supabase  
* Typing, response, and scroll behavior feel natural and humanlike  
* Voice mode works on ≥ 80% of supported mobile devices  
* Assistant resumes previous session on page reload or site revisit without user confusion

---

---

# 5.2 Scroll-to-Element Functionality

### Purpose

This module allows SiteGuide to move the user's viewport to the most relevant section of the page based on AI interpretation of a user's question. The AI does not simply answer questions—it navigates the user directly to the relevant content.

---

### User Story

* As a site visitor, when I ask a question like “Where is your refund policy?” I want the assistant to automatically scroll the page to that section instead of just telling me to scroll manually.  
* As a business owner, I want the assistant to physically guide users to the correct areas of the page so users spend less time searching and are more likely to engage.

---

### Functional Requirements

#### AI Response Instruction

* The assistant must receive from the AI backend a scroll instruction that includes:  
  * `action: "scroll"`  
  * `target: "<DOM selector>"` (e.g., `#pricing-table`, `.faq-item-3`)  
* If no valid scroll target is returned, the assistant must fall back to a text-only response (see error handling).

#### DOM Scanning (Frontend)

* On page load (or after DOM mutations), SiteGuide must scan and cache all scrollable targets.  
* Each section should be indexed based on:  
  * Semantic tags (`section`, `article`, `main`, `aside`)  
  * Headings (`h1–h4`)  
  * Attributes (`data-siteguide-target`, `id`, `class`)  
* A "target map" should be built in memory:

```javascript
{
  "#pricing-table": HTMLElement,
  ".faq-section": HTMLElement,
  "h2:contains('Our Process')": HTMLElement
}
```

#### Scroll Behavior

* The scroll command must:  
  * Smoothly scroll the user’s browser viewport to the element  
  * Use `scrollIntoView({ behavior: 'smooth', block: 'start' })`  
  * Offset for fixed headers (e.g., subtract 80px if a sticky nav is detected)  
* Only scroll if the target element exists and is visible in the DOM  
* If user scrolls away during AI animation, the assistant should:  
  * Respect user override (no forced re-scrolling)  
  * Optionally offer to “Take me back” with a button

#### Scroll Trigger Lifecycle

* Receive scroll instruction via WebSocket message or structured response  
* Look up target in local target map  
* Validate that it’s a scrollable element (not `display: none`, `visibility: hidden`, or detached from DOM)  
* Execute scroll animation  
* Trigger internal log:

```javascript
logScrollEvent({
  session_id,
  target_selector: "#faq-section",
  timestamp: Date.now(),
  autoTriggered: true
});
```

---

### Trigger Events

| Event | Condition |
| :---- | :---- |
| Scroll action received | AI returns a `scroll` action with valid `target` selector |
| Page reload | Page context rehydrated; scroll to previous section (optional) |
| Follow-up command | User says “Take me there” after AI describes content |

---

### UI/UX Behavior

* If a scroll is triggered by the AI, the assistant chat should say:  
  * “Let me show you…” or “Here’s what you’re looking for.”  
* After the scroll, the highlighted element should remain on screen (see 5.3)  
* Optional: show a floating "Back to chat" button if scroll takes user far away from assistant position

---

### State Management

* Current scroll target should be stored in memory for:  
  * Restoring scroll position later  
  * Analytics  
  * Displaying “recently visited” interactions

```javascript
state.lastScrollTarget = "#refund-policy";
```

---

### Error Handling

| Scenario | Behavior |
| :---- | :---- |
| Target selector not found | AI says “I couldn’t find that section. Let me answer here instead.” |
| Multiple elements match selector | Scroll to the first visible one |
| Target hidden or collapsed | Do not scroll; fallback to text response |
| User scrolled during animation | Cancel animation and show passive “Back to content” option |

---

### API/AI Format (Expected)

```json
{
  "message": "The pricing information is in the section below.",
  "action": "scroll",
  "target": "#pricing-table"
}
```

---

### DOM Targeting Best Practices

To improve compatibility, website owners should annotate key sections using `data-siteguide` attributes in their HTML:

```html
<section id="pricing-table" data-siteguide="pricing">...</section>
```

The DOM scanner should prioritize these attributes when selecting scroll targets.

---

### Success Criteria

* ≥ 90% of valid scroll actions land on the correct content section  
* Scroll animation duration is ≤ 600ms and feels natural  
* Element is visible in the viewport after scrolling  
* No jitter, double-scrolling, or abrupt jumps  
* Scroll does not interfere with core page functions (e.g., modals, nav bars)

---

### Where it fits in the PRD

This feature belongs in **Section 5.4: Navigation Control**, which we’ll add as a new module between 5.3 (DOM Highlighting) and 5.5 (Voice Input/Output). That section will define the assistant’s ability to:

* Programmatically click buttons or links  
* Navigate to new internal pages without losing session memory  
* Resume chat context immediately upon load

---

### Why it matters

SiteGuide isn’t just a passive scroll-and-highlight tool — it should feel like the AI is *guiding you through the site*. That means:

* Clicking “Book Now” for the user  
* Jumping from homepage to pricing  
* Taking the user to “Contact” or “Testimonials” pages when asked

**The experience must feel uninterrupted**, even though the browser is technically loading a new document.

---

### Technical Implications

We’ll need to:

* Intercept link clicks triggered by SiteGuide (not the user)  
* Store all session data and conversation history in local memory (and Supabase)  
* Rehydrate the assistant UI instantly after page reload  
* Maintain the open chat state, scroll history, and conversation log

---

# 5.3 DOM Element Highlighting

### Purpose

Once the AI has scrolled the user to the relevant content on the page, it must clearly indicate *what* the user is supposed to look at. Highlighting ensures that the user’s attention is drawn to the precise block, heading, form, or table the AI referenced — reducing confusion and increasing clarity.

---

### User Story

* As a user, when the assistant scrolls me to a section, I want to instantly understand *which* part is relevant so I don’t waste time guessing.  
* As a business owner, I want the assistant to visually call out key information like pricing, guarantees, or lead forms to maximize conversion.

---

### Functional Requirements

#### Trigger Conditions

* Highlighting is activated after a successful scroll event.  
* May also be triggered independently if the AI refers to a visual element (e.g., “Look at the refund section above.”).

#### Target Identification

* Same `target` selector is used as for scrolling (e.g., `#faq-section`, `.refund-policy`)  
* If no valid target is available, assistant should skip highlighting

#### Visual Behavior

* Highlight effect is non-obtrusive, WCAG-compliant, and disappears after a short duration (configurable)  
* Acceptable effects:  
  * **Pulse border**: animated outline glow around element  
  * **Background fade**: gentle highlight color behind content  
  * **Animated outline**: CSS `box-shadow` flicker or ring animation

**Example implementation:**

```css
.siteguide-highlight {
  outline: 3px solid #facc15;
  outline-offset: 4px;
  animation: pulseHighlight 1.5s ease-in-out 2;
}
@keyframes pulseHighlight {
  0% { outline-color: transparent; }
  50% { outline-color: #facc15; }
  100% { outline-color: transparent; }
}
```

#### Duration and Timeout

* Default highlight duration: **3 seconds**  
* Element is automatically cleared of the class after animation completes  
* If the user hovers over the highlighted element, the animation should pause or extend visibility

---

### User Feedback & Interaction

| Condition | Assistant Behavior |
| :---- | :---- |
| Scroll \+ highlight | “Here’s the section you asked for — I’ve highlighted it below.” |
| Highlight only | “Take a look at the guarantee here.” |
| User scrolls away | Optionally display floating “Scroll Back” button |
| Element is too small | Expand or wrap to larger container automatically |

---

### Accessibility Considerations

* Avoid blinking, flashing, or seizure-inducing effects  
* Ensure that screen readers are not distracted or misrouted by hidden visual overlays  
* Highlighted areas must remain keyboard-accessible if tabbed

---

### Error Handling

| Scenario | Behavior |
| :---- | :---- |
| Target element not visible | Log event, fallback to chat-only message |
| Element too small (\<32px height) | Scroll to parent element instead |
| Highlight already active | Restart animation and update styling |
| User navigates away during animation | Cancel highlight and clear class |

---

### API/AI Format (Integrated with Scroll)

```json
{
  "action": "scroll",
  "target": "#faq-section",
  "highlight": true,
  "message": "Here’s the answer to your question on returns."
}
```

If `highlight` is true, apply animation after scroll is complete.

---

### Storage and Analytics

| Data Point | Stored in Supabase? | Used for Analytics? |
| :---- | :---- | :---- |
| Selector highlighted | Yes | Yes |
| Duration of user view | Optional | Yes |
| User clicked highlighted? | Optional | Yes |

---

### Success Criteria

* ≥ 90% of valid scrolls are followed by correctly rendered highlight animation  
* Animation completes smoothly on all modern browsers  
* Highlight is visually noticeable but non-intrusive  
* No DOM errors occur from missing or malformed target elements  
* User engagement (scroll, dwell, or click) increases on highlighted content

---

# 5.4 Navigation Control

### Purpose

This module allows SiteGuide to trigger **automated internal page navigation** (i.e., clicking links or simulating navigation) in response to user intent, while preserving the assistant’s state and session memory across page loads. This enables the assistant to say things like:

“Let’s go to the pricing page so I can show you,”  
...and then take the user there immediately.

---

### User Story

* As a user, I want the assistant to move me to another page (e.g., “Show me your services”) so I don’t have to search for the right menu or link.  
* As a returning user, I want to continue our conversation after the new page loads without restarting the assistant or losing context.

---

### Functional Requirements

#### Link Resolution

* When the LLM responds with a navigation instruction, the payload should contain:

```json
{
  "action": "navigate",
  "target": "/pricing",
  "message": "Let’s go to the pricing page so I can show you."
}
```

* The assistant must:  
  1. Confirm the destination is a valid internal path (same domain only)  
  2. Prevent navigation loops or invalid URLs  
  3. Delay execution by 500–1000ms to allow the AI message to display  
  4. Trigger `window.location.href = target` (or `history.pushState` for SPAs if supported)

#### Session Preservation

* Before navigation:  
  * Current session ID is saved to `localStorage`  
  * Conversation history is serialized and stored locally and (optionally) in Supabase  
  * Target page URL is stored in `session.lastRoute`  
* On page load:  
  * Widget checks for `siteguide_session_id` and `siteguide_lastRoute`  
  * Chat window automatically restores:  
    * Previous messages  
    * Scroll position (if provided)  
    * Assistant open state (if chat was open before reload)

#### Widget State Behavior

| State Before Navigation | Behavior on New Page |
| :---- | :---- |
| Chat open | Chat reopens automatically with previous conversation |
| Chat closed | Chat remains closed, session is silently preserved |
| Scroll in progress | Scroll resumes (if same target exists on new page) |

---

### Trigger Events

| Event | Trigger Condition |
| :---- | :---- |
| Navigation action | AI returns `action: navigate` |
| User says “Go to…” | NLP detects intent to visit another page |
| Assistant references a page | e.g. “You can find this on our Services page.” |

---

### UI/UX Requirements

* Assistant must confirm intent and give user a second to absorb message before switching pages.  
* Optional: display a loading spinner inside the assistant avatar during page change.  
* Upon reload, assistant should say something like:  
    
  “We’re here. Let me show you the section I mentioned.”

---

### Implementation Flow

```
1. User asks: “What services do you offer?”
2. AI responds with message + navigate action to "/services"
3. Assistant shows reply: “Let’s go to the services page so I can show you.”
4. Assistant waits 750ms
5. `window.location.href = "/services"`
6. On page load:
   - SiteGuide reads session ID from localStorage
   - Restores prior memory, conversation, open state
   - Initiates follow-up scroll/highlight (if instructed)
```

---

### Error Handling

| Scenario | Fallback Behavior |
| :---- | :---- |
| Target path is not same-origin | Cancel navigation and say “I can’t take you there directly, but here’s the link.” |
| Broken link or 404 after load | Assistant detects via `window.location` \+ `document.title` and offers apology |
| Session ID not found on load | Start a new session and show welcome message |
| SPA navigation failure (JS error) | Fall back to full `window.location.href` |

---

### Developer Notes

* Navigation can be triggered either:  
  * From AI (`navigate` action)  
  * Or internally, via assistant UI button (e.g., “Take me to pricing” prompt)  
* Must integrate with existing scroll/highlight stack: if AI wants to scroll after navigation, target selector must be checked on new page and delayed until `DOMContentLoaded`.

---

### Success Criteria

* ≥ 90% of internal navigation attempts succeed without user confusion  
* Chat session resumes within 1 second after page load  
* User never sees a blank chat window unless starting fresh  
* No flicker or loss of assistant UI state  
* Users complete multi-page journeys without needing to re-initiate conversation

---

# 5.5 Voice Input and Output

### Purpose

SiteGuide must support a fully voice-driven experience for users who prefer or require hands-free interaction—particularly on mobile devices. This includes the ability to:

1. Speak to the assistant instead of typing  
2. Hear spoken responses from the assistant rather than reading

Voice interaction significantly enhances accessibility, reduces friction for mobile users, and makes the assistant feel more human and responsive.

---

### User Story

* As a mobile visitor, I want to speak my question and hear the assistant’s answer, so I can browse the site without typing.  
* As a desktop user with limited mobility or accessibility needs, I want the assistant to be operable by voice commands alone.

---

### Functional Requirements

#### Voice Input (Speech-to-Text)

* **Triggering Voice Input:**  
  * Microphone icon is present in the assistant input bar.  
  * Clicking the mic activates live transcription via Web Speech API.  
  * Optional “voice activation phrase” (e.g., “Hey SiteGuide”) is not required for MVP.  
* **Transcription Behavior:**  
  * While listening, UI shows an animated waveform or listening animation.  
  * Partial results may be shown (if supported by browser).  
  * When speech ends, full transcription is inserted into the input field and submitted.  
  * All speech sessions are capped at 10 seconds unless paused manually.  
* **Supported Browsers:**  
  * Web Speech API is supported on most Chromium-based browsers and Safari (desktop \+ mobile).  
  * MVP implementation will not support Firefox for voice input.  
  * Feature auto-disables if unsupported.  
* **Fallback Detection:**  
  * If microphone permissions are denied, assistant displays:  
      
    “I couldn’t access your microphone. You can still type your question below.”

    
* **Security Considerations:**  
  * Voice input is not recorded or stored as audio.  
  * Only text transcription is retained in Supabase with session data.

---

#### Voice Output (Text-to-Speech)

* **Triggering Voice Output:**  
  * When voice mode is enabled in the plugin settings, assistant responses are spoken aloud using the browser’s speech synthesis engine or ElevenLabs (if configured).  
* **Playback Behavior:**  
  * Assistant reads responses in a polite, natural pace (approx. 120–150 words per minute).  
  * User can interrupt playback by clicking the mic or typing.  
  * Voice playback can be globally disabled by the site admin.  
* **Voice Customization:**  
  * MVP will use default browser voice.  
  * Future releases may allow assistant persona selection via ElevenLabs API (e.g., "Jessie" voice, male/female tones).  
* **Speech Rendering Requirements:**  
  * Response playback begins only after full text is rendered.  
  * Short delays (100–300ms) are acceptable to mimic human pacing.

---

### UI/UX Requirements

#### Microphone Icon States:

| State | Icon Behavior |
| :---- | :---- |
| Idle | Static mic icon |
| Listening | Pulsing animation or waveform |
| Transcribing | Spinner or typing dots |
| Unsupported browser | Mic icon hidden or grayed out |

#### Accessibility Considerations:

* All voice controls must be operable via keyboard  
* Microphone button must have appropriate `aria-label`  
* Visual animations must not cause flashing or seizure risk  
* Voice output must be supplemented by on-screen text at all times

---

### Voice Mode Toggle (Admin Control)

* Admin can globally enable/disable voice input and/or output from the WordPress plugin settings.  
* Optional: site admin can choose whether voice mode is enabled by default for all users or must be toggled on manually.

```php
// Example WordPress setting
$settings = [
  'voice_input_enabled' => true,
  'voice_output_enabled' => true,
  'default_voice_mode' => 'enabled',
];
```

---

### Error Handling

| Scenario | Assistant Response or Behavior |
| :---- | :---- |
| Microphone blocked | “I couldn’t access your mic. Please check browser settings.” |
| Speech not recognized | “I didn’t quite catch that. Try speaking again.” |
| Voice output not supported | Falls back to text-only output silently |
| User presses mic but browser freezes | Mic auto-stops after 10s and shows retry option |

---

### State Management and Storage

* No audio files are stored.  
* Transcribed speech is treated as plain user input and saved as:

```json
{
  "message": "Do you offer same-day shipping?",
  "input_type": "voice",
  "confidence": 0.92
}
```

* Stored in Supabase under the same schema as typed messages, with `input_type` field for analytics segmentation.

---

### Success Criteria

| Goal | Metric or Threshold |
| :---- | :---- |
| Successful voice input | ≥ 90% of attempted speech transcriptions are valid |
| Successful voice output | ≥ 95% of AI responses spoken aloud without interruption |
| Compatibility rate (voice input) | Voice input works on ≥ 80% of mobile sessions |
| Playback latency | Voice begins \<1 second after text render |
| Voice fallback behavior | 100% of unsupported sessions silently degrade to text |

---

### Technical Notes

* **Web Speech API Reference:**  
  [https://developer.mozilla.org/en-US/docs/Web/API/Web\\\_Speech\\\_API](https://developer.mozilla.org/en-US/docs/Web/API/Web\\_Speech\\_API)  
* **ElevenLabs API (Optional Phase 2):**  
  * Will require per-site authentication tokens  
  * TTS conversion must be cached or streamed to minimize delay  
* **Rate Limits & Stability:**  
  Web Speech API is client-side and has no external rate limits, but assistant must:  
  * Limit one voice session at a time  
  * Handle stop/start toggles without stacking

---

# 5.6 Persistent Session Memory

### Purpose

This module ensures that SiteGuide retains knowledge of each visitor’s interaction history — both **short-term** (within a single session or site visit) and **long-term** (across days or months). Memory allows the assistant to:

* Resume conversations across page reloads  
* Recollect prior questions, answers, and AI actions  
* Recognize returning users via stored session or email  
* Maintain context during multi-page journeys

This mimics the continuity of a human assistant — transforming the assistant from a “widget” into an intelligent, evolving guide.

---

### User Story

* As a first-time visitor, I want the assistant to remember what I’ve already asked while I navigate between pages.  
* As a returning visitor, I want the assistant to pick up where we left off, even if it’s been days or weeks.  
* As a business, I want to track user behavior and engagement over time without requiring accounts or logins.

---

### Functional Requirements

#### Anonymous Session Initialization

* On first load:  
  * Generate a `siteguide_session_id` (UUID v4)  
  * Store in `localStorage`  
  * Example:

```javascript
localStorage.setItem('siteguide_session_id', '7c49f920-89a0-442e-8f89-a1d0e4b915bb');
```

* Send this session ID with every interaction (text, voice, scroll, highlight)

#### Session Memory Structure

* Each session tracks:

```json
{
  "session_id": "abc123",
  "site_domain": "clientsite.com",
  "start_time": "2025-08-10T12:22:01Z",
  "last_active": "2025-08-10T12:45:17Z",
  "pages_visited": ["/home", "/pricing"],
  "messages": [
    { "sender": "user", "text": "What are your hours?" },
    { "sender": "ai", "text": "We’re open from 9–5, Monday through Friday." }
  ],
  "actions": [
    { "type": "scroll", "target": "#hours", "timestamp": 1691689021 }
  ],
  "status": "anonymous"
}
```

#### Long-Term Persistence

* Session object is upserted into Supabase every time:  
  * A new message is exchanged  
  * A scroll or highlight action is triggered  
  * A new page is visited  
* Supabase Tables:  
  * `sessions`  
  * `messages`  
  * `actions`  
  * `page_visits`

#### Rehydration on Page Load

* On load, SiteGuide checks `localStorage` for existing session ID  
* If found, the assistant:  
  * Restores conversation history into the chat window  
  * Restores assistant open/closed state  
  * May resume unfinished actions (e.g., if AI said “Let me show you” but page changed before scrolling)

#### Cross-Page Memory

* Memory is continuous across internal navigation:  
  * Assistant state (open/closed)  
  * Conversation context  
  * Scroll position (if applicable)

#### Session Expiration and Archiving

* Active sessions remain “live” for 6 months from last interaction  
* After expiration:  
  * Marked as archived in Supabase  
  * Can still be referenced for analytics or email-linked retrieval  
* Sessions that exceed 1MB in size (e.g., very long threads) are truncated server-side to retain only summary and metadata

---

### Memory Scope and Depth

#### What the Assistant Remembers:

| Category | Retained | Duration |
| :---- | :---- | :---- |
| Questions asked | Yes | 6 months |
| AI responses | Yes | 6 months |
| Pages visited | Yes | 6 months |
| Scroll targets | Yes | 6 months |
| User name/email (if provided) | Yes | Persistent |
| Form auto-fill attempts | Yes | 6 months |
| Voice preference | Yes | 6 months |

#### What is *not* retained:

* Exact scroll positions unless requested  
* Audio recordings (voice input is always discarded after transcription)  
* Any third-party cookies or cross-site tracking data

---

### Error Handling

| Scenario | Behavior |
| :---- | :---- |
| `localStorage` is unavailable | Fallback to in-memory session; no long-term memory |
| Supabase write fails | Retry in background; fallback to local-only memory |
| Session ID collision | Regenerate and start new session (rare with UUID v4) |
| Assistant state becomes corrupted | Clear local memory and restart session with graceful notification |

---

### Security and Privacy

* Session IDs are anonymous by default  
* If a user provides their email, it is explicitly linked to the session in Supabase:

```json
{
  "session_id": "abc123",
  "user_email": "user@example.com",
  "status": "identified"
}
```

* Sessions can only be resumed via:  
  * Same browser/device (using session ID in `localStorage`)  
  * Or user-provided email (see Section 5.7)  
* All data is stored securely in Supabase under row-level security policies  
* No sensitive data is ever sent to the LLM or frontend without explicit user input

---

### Developer Implementation Notes

* Memory manager should be implemented as a standalone module (e.g., `SessionMemory.js`)  
  * Exports: `startSession()`, `saveInteraction()`, `rehydrate()`, `syncWithBackend()`  
* Syncing strategy: use a debounce mechanism (e.g., save every 1 second max) to avoid flooding the DB  
* Versioning: memory schema should support future enhancements (e.g., per-user profiles, analytics enrichment)

---

### Success Criteria

| Objective | Metric |
| :---- | :---- |
| Short-term memory continuity | Session is preserved across 100% of internal page loads |
| Long-term memory rehydration | ≥ 90% of returning sessions restore correctly via session ID |
| Session write failure rate | \< 1% of interactions lost due to sync failure |
| Message retention | 100% of user-AI interactions visible across pages |
| Assistant open/closed state continuity | Preserved across ≥ 95% of page reloads |

---

### User Story

* As a user, I want to provide my email so I can return later and pick up the conversation where I left off.  
* As a user, I want to be able to say “remember me” and not start from scratch every time I come back to the site.  
* As a business owner, I want to retain high-value customer sessions and build longer-term relationships without requiring logins or signups.

---

### Functional Requirements

#### Email Prompt Flow

| Trigger Condition | Assistant Behavior |
| :---- | :---- |
| User asks to save session | Assistant says: “Sure, I can remember you\! What email should I use?” |
| User volunteers an email (detected) | Assistant says: “Thanks\! I’ll use that to save your conversation.” |
| System detects high engagement | After X interactions or ≥ Y minutes, assistant may ask: |

```
                                   “Would you like me to remember you for next time?” |
```

#### Data Collection

* When user provides an email, associate it with current session in Supabase:

```json
{
  "session_id": "abc123",
  "user_email": "user@example.com",
  "status": "identified"
}
```

* Validate email format client-side before sending (basic regex)  
* Only one email may be linked per session (no overwrites)  
* Backend lookup enables session merges in the future (see below)

#### Return Visit Flow

| Scenario | Assistant Behavior |
| :---- | :---- |
| Local session found | Auto-resume using `localStorage` as described in Section 5.6 |
| No local session but user provides email again | Assistant retrieves matching session from Supabase and says: |

```
                                    “Welcome back! Picking up from where we left off...” |
```

| No session found for email | Assistant says:  
“Hmm, I don’t see anything saved for that email. We can start fresh\!” |

#### Assistant Messaging UX

* Initial prompt:  
    
  “Would you like me to remember our conversation for next time? I can do that with just your email.”  
    
* On success:  
    
  “Great, I’ll remember you\! You can come back anytime and we’ll pick up where we left off.”  
    
* On error or no matching session:  
    
  “Looks like I couldn’t find your previous session. No worries—we can start fresh.”

---

### Database Behavior

* `sessions` table: adds a `user_email` column (unique per active session)  
* Index `user_email` for fast lookup  
* Retention policy: all email-linked sessions are preserved for 12 months unless deleted

#### Optional: Session Merge

* When a known user returns and creates a new anonymous session:  
  * Check for `user_email` match  
  * Optionally merge previous messages and metadata into new session  
  * Flag session as `merged_from: [old_session_id]` for auditing

---

### Developer Implementation

#### Frontend

* Memory module should expose:

```javascript
saveEmailToSession(email)
checkForEmailLinkedSession(email)
```

* Assistant must allow user to enter email via:  
  * Natural conversation (“remember me”)  
  * Manual form input if AI requests it  
  * External injection (e.g. pre-fill from site login if available)  
* Conversation history should hydrate from Supabase if no local session is available and email match is found.

#### Backend

* Supabase table schema:  
  * `session_id` (UUID)  
  * `user_email` (VARCHAR, indexed)  
  * `created_at`  
  * `last_active`  
  * `status` (anonymous | identified)  
  * `merged_from` (nullable)  
* API endpoints:  
  * `GET /session/by-email?email=...` → returns last active session  
  * `POST /session/link-email` → links email to session

---

### Security & Privacy

* Email is opt-in only; never stored or associated without explicit user input  
* User can request deletion of email-linked session (future feature)  
* Emails are stored securely in Supabase with access controls and encryption-at-rest  
* Assistant must never send outbound emails—storage is for internal continuity only unless integrated with CRM/email tools

---

### Error Handling

| Scenario | Behavior |
| :---- | :---- |
| Invalid email format | Assistant says: “That doesn’t look like a valid email. Want to try again?” |
| Supabase query fails | Assistant says: “Hmm, I had trouble saving your session. Want to try again later?” |
| Multiple sessions found for email | Assistant loads most recent one; flags for possible merge |

---

### Success Criteria

| Objective | Metric |
| :---- | :---- |
| Session restoration via email | ≥ 90% accuracy on email-linked resumption |
| Dropoff rate post-email prompt | \< 25% abandonment after email offer |
| Session match speed | \< 500ms Supabase query time |
| User confusion rate | \< 5% of users say “this isn’t what I asked about” after resuming session |
| Merged session integrity | No data loss during merge, flagged correctly |

---

# 5.8 Memory Summary and AI Recall Behavior

### Purpose

This component governs how the assistant **summarizes**, **recalls**, and **applies contextual memory** during an ongoing or restored session. Unlike raw conversation history, which can grow unwieldy or irrelevant, this memory structure ensures that SiteGuide recalls the most relevant, structured information for decision-making, navigation, and follow-up support.

---

### User Story

* As a user, I want the assistant to remember key things I’ve said or asked about, like my goals or interests.  
* As a user, I want the assistant to provide coherent, personalized responses instead of repeating generic info.  
* As a developer, I want to ensure only the most useful context is passed to the LLM to reduce cost and improve precision.

---

### Memory Architecture

#### Layers of Memory

| Layer | Description |
| :---- | :---- |
| Live Context | Most recent messages in the active session (e.g., last 5-10 exchanges) |
| Structured Summary | Condensed key facts extracted from prior interactions, formatted for LLM use |
| Historical Archive | Full conversation logs (for UI review and fallback, not sent to LLM) |

---

#### Summary Format

Memory summaries are stored in a structured format:

```json
{
  "goals": ["Learn about pricing", "Find out if there's a demo"],
  "interests": ["Small business SEO", "Weekly blog publishing"],
  "name": "Bob",
  "preferences": {
    "chatStyle": "direct and friendly",
    "followUps": true
  },
  "last_visited": "/features",
  "last_action": "Requested pricing guide",
  "timestamps": {
    "created": "2025-08-10T14:05:00Z",
    "updated": "2025-08-11T10:42:00Z"
  }
}
```

This summary can be used as a system prompt fragment or prepended as context to GPT-style LLMs in each new exchange.

---

### Context Injection Logic

* Upon every message, SiteGuide assembles a payload that includes:  
  * Last 5–10 user/assistant messages (chronological)  
  * Memory summary (inserted via system prompt or initial instruction)  
* Example:

```
SYSTEM: The user is named Bob. He’s interested in SEO tools and asked about pricing. Be direct and friendly.
```

* Summaries are updated:  
  * After significant topic changes  
  * When user expresses a new goal (e.g., “I’m also interested in eCommerce”)  
  * Upon assistant action (e.g., navigates to pricing page)

---

### Memory Update Triggers

| Event | Action |
| :---- | :---- |
| User asks a new goal | Add to goals list |
| User gives name/email | Store in summary |
| User preferences detected | Add to preferences object |
| Page navigation triggered | Update `last_visited` and `last_action` |
| Session manually ended | Flag as complete for future resume |

Summaries are rewritten after every major user interaction (approx every 4–6 turns), either as part of the memory engine or using a dedicated summarization LLM pass.

---

### Developer Responsibilities

* Create a memory controller module that:  
  * Listens for state changes and conversation events  
  * Writes updated summaries to Supabase per session ID  
  * Provides a `getMemorySummary(session_id)` function  
* Memory summary is cached client-side in case of Supabase lag  
* Provide a dev interface to **manually inspect/edit summaries** (admin view)

---

### LLM Prompt Injection Behavior

| State | Behavior |
| :---- | :---- |
| New visitor | No summary injected, full default prompt used |
| Known session (local) | Inject memory summary from localStorage |
| Known session (email) | Inject summary retrieved from Supabase |
| Fallback (no memory) | Use latest 5–10 chat messages only |

To keep prompt size minimal, summary injection should be less than 1,000 tokens total. If needed, long lists or unimportant details should be pruned from memory before inclusion.

---

### Error Handling

| Issue | Fallback/Handling |
| :---- | :---- |
| Supabase summary fetch fails | Load from local copy or proceed without |
| Memory becomes too large | Prune least recent entries using timestamp heuristics |
| LLM refuses prompt (too long) | Trim non-essential context and retry |

---

### Success Criteria

| Objective | Metric |
| :---- | :---- |
| Personalized memory used in ≥ 90% sessions | Valid memory summary injected into LLM context |
| Memory summaries updated every 3–5 turns | Automatic summarization confirmed via logs |
| LLM response accuracy ↑ | Lower confusion rate in conversations using memory |
| Developer edit UI works | Manual memory override/edit persists correctly |
| Memory injection latency \< 300ms | Total memory prep time for prompt payload |

---

# 5.9 Scroll, Highlight, and DOM Interaction Features

### Purpose

SiteGuide is more than a chatbot—it’s a **real-time interactive assistant** that can visually and physically guide the user through the website. This section defines how SiteGuide can:

* Scroll the page to focus user attention  
* Highlight specific sections or elements  
* Point to content as it’s discussed  
* Manipulate navigation contextually without breaking session flow

These behaviors make SiteGuide feel like a true co-browsing companion—more useful than a static bot and more intuitive than most help systems.

---

### User Story

* As a user, I want the assistant to move the screen for me when it refers to something so I don’t have to search.  
* As a user, I want the assistant to highlight what it’s talking about so I’m never confused.  
* As a user, I want to see visual feedback when I click on a suggestion from the assistant.

---

## Functional Requirements

### 5.9.1: Scroll to Element

#### Behavior

* When referencing a part of the page (e.g. “the pricing table”), SiteGuide will automatically scroll to that section smoothly.  
* Scroll is performed using `element.scrollIntoView({ behavior: 'smooth' })`.

#### Trigger Methods

| Trigger Type | Description |
| :---- | :---- |
| AI mentions known element | Assistant says: “You’ll find that below...” |
| AI links to ID or class | Internal message format includes target anchor |
| Hard-coded dictionary | Certain keywords mapped to selectors (e.g. “FAQs” → `#faq`) |

#### Development Needs

* Selector dictionary (semantic label → CSS selector)  
* Scroll action throttle (avoid spamming on rapid interactions)  
* Scroll offset for fixed headers (allow config, e.g. 80px)

---

### 5.9.2: Element Highlighting

#### Behavior

* Flash or outline key element for visual guidance  
* Use temporary `box-shadow` or outline animation  
* Duration: 3–5 seconds, then fade unless reactivated

#### Trigger Methods

| Scenario | Action |
| :---- | :---- |
| AI refers to a feature visually | “See the green button?” → highlights the button |
| User clicks a suggestion | Button briefly flashes to confirm the target location |
| AI links directly to anchor | Highlight scroll target automatically on arrival |

#### Development Needs

* Overlay module or dynamic class injection  
* Prevent highlight on invisible elements (use `getBoundingClientRect()`)  
* Accessibility: ensure visual styles don’t conflict with WCAG standards

---

### 5.9.3: Pointer/Arrow Overlay (Optional)

#### Behavior

* Display a temporary **floating arrow or pointer** next to the element the assistant is referencing  
* Appears for 3–10 seconds and points toward the DOM node  
* Can pulse, animate, or tilt for visibility

#### Use Cases

* On complex pages with many elements (e.g. dashboards)  
* On user request (“Can you show me where that is?”)

#### Development Needs

* Overlay container for pointer component  
* Arrow follows DOM element if page resizes or scrolls  
* Lightweight implementation (no external pointer libraries required)

---

### 5.9.4: DOM-Based Navigation and Clicking (Optional but Recommended)

#### Behavior

* Assistant can **trigger a click** on a known element when instructed to “take me there,” “show me that,” or “open it”  
* Simulates a user click or link activation, e.g.:

```javascript
document.querySelector("#pricing-btn")?.click()
```

#### Use Cases

* Streamlines flow from chat to action  
* Allows users to treat the assistant as a remote control

#### Risk Management

* Add safeguards to avoid clicking payment buttons, form submissions, etc.  
* Use whitelist of click-safe selectors only

#### Development Needs

* Click controller module  
* AI output parser that detects action-intent messages  
* Optional confirmations: “Click now?” → \[Yes\] \[No\]

---

### 5.9.5: Multistep Visual Tours (Optional)

#### Behavior

* Assistant walks user through a **guided tour** by:  
  * Scrolling to a section  
  * Highlighting key points  
  * Explaining verbally  
  * Offering to continue: “Next step?” → scrolls again

#### Use Cases

* Onboarding for new visitors  
* Product walk-throughs  
* Multi-part navigation (e.g. blog \+ pricing \+ contact)

#### Development Needs

* Tour script JSON format:

```json
[
  {
    "selector": "#hero",
    "message": "Here’s where you’ll see our main promise."
  },
  {
    "selector": "#features",
    "message": "Now scroll down to the features section."
  }
]
```

* Progress state manager (tracks tour steps)  
* User override: “skip” or “pause tour”

---

## Developer Implementation

#### Core Methods Required

```javascript
function scrollToSelector(selector, offset = 0) { ... }
function highlightElement(selector, duration = 5000) { ... }
function clickElement(selector) { ... }
function showPointerOverlay(selector) { ... }
function runTour(stepsArray) { ... }
```

These functions should be exposed globally and callable from AI actions, message metadata, or LLM output interpretation.

#### Example: AI Triggers Highlight & Scroll

Assistant replies:

“Let me show you the pricing options.”

Internal action:

```json
{
  "type": "scroll-highlight",
  "selector": "#pricing-table"
}
```

---

## Error Handling

| Condition | Fallback Behavior |
| :---- | :---- |
| Selector not found | Assistant says: “Hmm, I couldn’t locate that section. Want to try another way?” |
| Element is off-screen or hidden | Assistant retries after scroll into viewport |
| Overlay animation fails | Skip and use scroll-only fallback |

---

## Success Criteria

| Objective | Metric |
| :---- | :---- |
| Visual feedback on 95% of triggers | Element highlight or pointer rendered |
| Scroll accuracy \> 90% | Element in viewport after scroll |
| Click-to-UI delay \< 300ms | Time between message and element response |
| No unintended actions triggered | No clicks on sensitive forms/buttons |
| Overlay performance impact \< 5% | Lighthouse or PageSpeed impact minimal |

---

# 5.10 Multilingual and Accessibility Support

### Purpose

To ensure siteGuide can be used by the widest possible audience, including those who:

* Speak different native languages  
* Use assistive technologies (screen readers, keyboard navigation, etc.)  
* Have visual, auditory, cognitive, or motor impairments

Multilingual and accessibility support are not “nice to haves.” They are structural components of a modern, global-grade user experience and must be considered in every interaction.

---

### User Story

* As a non-English speaker, I want the assistant to respond in my language automatically, so I can use the site comfortably.  
* As a user with visual impairment, I want to be able to interact with the assistant and understand its responses using screen readers.  
* As a keyboard-only user, I want to be able to navigate all features of the assistant without using a mouse.

---

## 5.10.1 Multilingual Support

#### Detection and Configuration

| Method | Behavior |
| :---- | :---- |
| Automatic browser locale detection | Default assistant language matches `navigator.language` |
| Manual language selection (optional) | User can choose from dropdown or via assistant command |
| Session-level persistence | Language setting is saved in Supabase per session/user |

#### Supported Languages (Initial Phase)

* English (default)  
* Spanish  
* French  
* German  
* Portuguese  
* Hindi  
* Arabic  
* Mandarin Chinese

Note: Additional languages will be added based on traffic or demand.

#### Assistant Behavior

* Detects language preference automatically  
* Responds and summarizes content in that language  
* Translates webpage content using embedded summaries or scraped metadata  
* UI buttons and prompts must also be localized

#### LLM Integration

* Use OpenAI’s GPT-4o or similar multilingual LLMs  
* Responses should respect the grammatical and formal norms of each language  
* Language-specific fallback phrases must be predefined in case of AI errors

#### Developer Needs

* Language file system (e.g. `/locales/en.json`, `/locales/es.json`)  
* Context language injection into all AI messages  
* AI model routing if required for localization quality

---

## 5.10.2 Accessibility Support (WCAG 2.2 Compliance)

#### Key Principles

SiteGuide must comply with the **Web Content Accessibility Guidelines (WCAG) 2.2**, including:

* **Perceivable**: Users must be able to perceive the interface  
* **Operable**: Interface must be operable via keyboard, voice, etc.  
* **Understandable**: Language and visuals must be clear  
* **Robust**: Must work across a wide range of assistive tech

#### Specific Requirements

| Feature | Behavior |
| :---- | :---- |
| **Keyboard Navigation** | Every interactive element (buttons, replies, etc.) must be tab-accessible |
| **ARIA Roles & Labels** | Apply `aria-*` attributes to chat box, buttons, and scroll/highlight actions |
| **Screen Reader Compatibility** | Announce new assistant messages properly using ARIA live regions |
| **Color Contrast** | Ensure text and background colors meet 4.5:1 contrast minimum |
| **Skip to Main Content** | Allow users to skip assistant area if desired |
| **Highlight Effects** | Must not trigger seizures or motion sensitivity |
| **Timeouts** | Extendable on user request for cognitive or motor impaired users |

#### Live Region Example:

```html
<div aria-live="polite" role="log" id="chat-feed">
  <div role="alert">Assistant: Here’s your pricing guide.</div>
</div>
```

---

### Developer Guidelines

#### HTML/JS Requirements

* Tab-index order must follow logical flow  
* All buttons and interactive areas must have:  
  * `aria-label`  
  * `role`  
  * Fallback keyboard equivalents  
* Modal dialogs (e.g., language selection) must trap focus until dismissed

#### CSS Guidelines

* Respect `prefers-reduced-motion` user settings  
* No text inside decorative images  
* Tooltips and instructional overlays must have text alternatives

---

### Analytics & Error Handling

| Metric | Tracked? |
| :---- | :---- |
| Language selected vs. default | Yes |
| Screen reader compatibility test logs | Yes |
| Navigation via keyboard | Yes |
| Timeouts/extensions used | Optional |

If the assistant fails to detect or support a requested language:

* It should respond with:  
    
  “I’m still learning that language, but I can try English or Spanish for now.”

If WCAG audit tools detect a failure (e.g., Lighthouse score \< 90):

* Developer must log and fix within patch window.

---

### Success Criteria

| Goal | Measurement |
| :---- | :---- |
| \>95% accessibility compliance score | Measured via Lighthouse \+ Axe \+ WAVE |
| \>90% response accuracy in native language | Manual verification on assistant output |
| Keyboard navigation coverage 100% | All elements usable with Tab/Shift+Tab |
| No critical accessibility violations | Zero blocking WCAG 2.2 errors |

---

# 5.11 Persistent Sessions and Context Recovery

### Purpose

To enable users to pause and resume their interaction with SiteGuide without losing context—across sessions, devices, or timeframes. This mimics a helpful human assistant who “remembers you,” even after long absences, and ensures that all prior engagement history is retained for personalization, follow-up, and marketing.

---

### User Story

* As a user, I want to leave the site and come back later without starting over.  
* As a returning visitor, I want SiteGuide to remember my name, goals, and last conversation.  
* As a business owner, I want returning users to feel like they’re building a relationship with my brand.  
* As a developer, I want a reliable way to associate persistent memory to unique users—even anonymously if needed.

---

## 5.11.1 Session Identification

| Scenario | Identifier Used |
| :---- | :---- |
| First-time visitor | Anonymous UUID stored in localStorage |
| Known device (no email yet) | UUID persisted across site visits |
| User provides email | Email becomes session key (preferred) |
| Logged-in user (WordPress site) | WordPress user ID (if integrated via plugin) |

If the email is provided, it becomes the **authoritative session key** and overrides device-based identifiers.

---

## 5.11.2 Session Data Stored

### Fields Tracked per Session

```json
{
  "session_id": "user-xyz-abc",
  "email": "example@example.com",
  "name": "Sarah",
  "first_seen": "2025-08-01T10:00:00Z",
  "last_seen": "2025-08-11T15:22:00Z",
  "last_page": "/pricing",
  "memory_summary": {
    "goals": ["Compare plans", "Understand SEO support"],
    "preferences": {
      "language": "en",
      "chatStyle": "fast and casual"
    }
  },
  "interaction_count": 14,
  "last_chat_log": [...],
  "version": "1.4.0"
}
```

All records are stored in **Supabase** under a dedicated `sessions` table.

---

## 5.11.3 Storage System Design

| Component | Technology | Notes |
| :---- | :---- | :---- |
| Database | Supabase | PostgreSQL table with indexed fields |
| LocalStorage Fallback | Browser | Anonymous sessions if Supabase fails |
| Authentication | None required | Email is enough; no login needed |
| Expiry Policy | 6–12 months | Session retained unless deleted |

Sessions are soft-persistent by default but can become **hard-persistent** when a user provides an email or logs in.

---

## 5.11.4 Session Resumption Workflow

### For Anonymous Users (local device)

1. On return, check localStorage for UUID  
2. If found, restore from Supabase using UUID  
3. Rehydrate assistant memory and chat UI  
4. Resume conversation or greet with summary:  
     
   “Welcome back\! Last time we were comparing plans. Want to pick up where we left off?”

### For Identified Users (email match)

1. Ask: “Want to continue where we left off?”  
2. Rehydrate structured memory  
3. Reload final chat log (optional)  
4. Use language, preferences, and goals from prior memory immediately

### For Logged-in WordPress Users

1. Auto-detect user ID via WP API  
2. Bypass chat intro and resume based on ID-linked session  
3. Add support for personalized dashboards

---

## 5.11.5 Recovery Triggers

| Trigger Event | Recovery Method |
| :---- | :---- |
| User returns to homepage | Auto-lookup session via UUID/email |
| User inputs email | Explicit session restore |
| Assistant prompt: “Want to continue?” | Optional UI interaction |
| Admin link with prefilled data | Deep-link with session token embedded |

In all cases, SiteGuide must first confirm the session **exists** and is **valid** before resuming.

---

## 5.11.6 Developer Responsibilities

* Ensure a `sessionController` module handles:  
  * Generation and storage of anonymous UUID  
  * Email-to-session mapping in Supabase  
  * Full memory summary and chat history synchronization  
* Provide a fallback if session cannot be recovered  
  * Fallback message:  
      
    “I couldn’t find your last session, but I’m happy to help you start again\!”

    
* Build a `resumeSession()` function that:  
  * Loads memory  
  * Rehydrates UI  
  * Sends system prompt to LLM with memory context  
* Provide admin interface to view, edit, or delete session data manually

---

## 5.11.7 Analytics and Metrics

| Metric | Tracked? |
| :---- | :---- |
| % of users returning to site | Yes |
| % of sessions resumed | Yes |
| Session duration across visits | Yes |
| Most common last\_page | Yes |
| Email collection conversion rate | Yes |

---

## 5.11.8 Security and Privacy

* No sensitive personal data beyond name/email/goals  
* Users can delete their session by saying “delete my data”  
* Optional GDPR module for account data requests  
* All session data encrypted at rest in Supabase

---

## Success Criteria

| Objective | Measurement |
| :---- | :---- |
| Anonymous users recognized across sessions | 90% recovery using UUID |
| Email-identified users resume seamlessly | \>95% accuracy in memory rehydration |
| LLM responses reflect prior goals & memory | No repetitive restarts unless session lost |
| Users report continuity in experience | Qualitative feedback during onboarding |

---

# 5.12 Integration with Lead Capture and Marketing Systems

### Purpose

Enable SiteGuide to function not only as a guide, but also as a **high-converting lead capture tool** that seamlessly connects with the business’s marketing stack. This allows for automated follow-up, qualification, segmentation, and analytics—driving measurable business outcomes from every interaction.

---

### User Story

* As a business owner, I want SiteGuide to collect names, emails, and questions from visitors, so I can follow up with them.  
* As a user, I want to be able to ask a question, leave my email, and get a response later if needed.  
* As a marketer, I want all captured data sent to my CRM, email platform, or Google Sheet automatically.

---

## 5.12.1 Data Points to Capture

| Field | Required | Source |
| :---- | :---- | :---- |
| Full Name | No | Provided by user |
| Email Address | Yes\* | Explicit or inferred |
| Phone Number | No | Optional field |
| Company (if B2B) | No | Optional prompt |
| Question/Inquiry | Yes | Captured from conversation |
| Page of Capture | Yes | Automatically recorded |
| Session ID | Yes | UUID or email key |
| Time of Capture | Yes | System timestamp |

**Note:** If email is not provided, the session is anonymous and cannot be added to CRM.

---

## 5.12.2 Capture Triggers

| Scenario | Action Taken |
| :---- | :---- |
| User asks a high-intent question | Assistant prompts: “Want us to follow up by email?” |
| User seems interested in pricing/services | Assistant offers to connect to sales |
| Conversation reaches natural endpoint | Assistant says: “Want to leave your email in case you have more questions?” |
| User requests a downloadable asset | Email gate triggered |

---

## 5.12.3 CRM / Marketing Integrations

### Built-in Webhook Support

* SiteGuide can send captured leads to:  
  * **Zapier webhook** (customizable)  
  * **Make.com** scenarios  
  * **N8N workflows** (recommended for aiConnected users)  
  * **Direct Supabase table** (optional internal DB)  
  * **Google Sheets** (for MVP setups)  
  * **HubSpot / Mailchimp / ActiveCampaign** via API/webhook

### Recommended Flow with aiConnected:

1. SiteGuide captures lead in chat  
2. Sends data to n8n webhook  
3. Workflow:  
   * Validates email  
   * Adds to Supabase or CRM  
   * Triggers email automation or follow-up alert

---

## 5.12.4 Consent and Confirmation

* When user gives email, SiteGuide should say:  
    
  “Got it\! We’ll only use your email to follow up about your question.”  
    
* All messages involving capture should reflect GDPR/CAN-SPAM compliance if needed.  
* Optional: add a small “Why are we asking this?” hover tooltip near form prompts.

---

## 5.12.5 Lead Scoring Logic (Optional)

If enabled, SiteGuide can apply basic lead scoring based on:

* Page visited (e.g., /pricing \> \+5)  
* Number of messages exchanged (\>10 \= \+2)  
* Use of commercial keywords like “quote,” “pricing,” “demo” (+10)  
* Email collected (+10)

Score can be included in webhook payload:

```json
{
  "lead_score": 25,
  "hot": true
}
```

This helps prioritize which leads receive immediate follow-up.

---

## 5.12.6 Data Enrichment (Optional)

* If user provides a business email (e.g., [sarah@acmeinc.com](mailto:sarah@acmeinc.com)), trigger background enrichment via Clearbit or similar  
* Enrichment returned:  
  * Company size, industry, revenue  
  * Social profiles  
  * Location  
* Displayed to admin in lead dashboard or passed through to CRM

---

## 5.12.7 Admin Access to Captured Leads

| Option | Description |
| :---- | :---- |
| Supabase table | All leads stored in `siteguide_leads` table |
| n8n Webhook | Can be piped to any custom dashboard |
| Daily Export | CSV export option via email or UI |
| Webhook Replay | Re-send past captures if system missed data |

---

## 5.12.8 Developer Implementation

* Create a `leadCapture()` function inside the SiteGuide assistant framework  
* Trigger logic based on chat content, intent detection, or explicit prompts  
* Add native email validation  
* Send structured data to endpoint(s) via:  
  * HTTP POST  
  * Supabase insert  
* Ensure assistant UI shows success/failure feedback (e.g., “Thanks\! We’ll be in touch.”)  
* Add fallback for offline mode: store lead locally and sync when online

---

## 5.12.9 Success Criteria

| Goal | KPI |
| :---- | :---- |
| Email capture rate | \> 15% of total users |
| Lead delivery success rate | \> 99% of leads reach CRM or webhook target |
| Follow-up email open rate (external stat) | Tracked by marketing system |
| Conversation-to-lead conversion | \> 20% for high-intent pages |
| Average lead score of captured contacts | Tracked internally for QA |

---

# 5.13 Analytics and Performance Tracking

### Purpose

To provide business owners and admins with real-time, actionable insights about how siteGuide is being used, where users are dropping off, which features are most valuable, and how leads are being generated. The analytics system also enables quality assurance, A/B testing, and future feature improvement.

---

### User Story

* As a business owner, I want to see how many users are interacting with my AI assistant, what they’re asking, and how often it leads to conversions.  
* As a marketing manager, I want to know which pages have the highest engagement and where to improve lead capture.  
* As a developer, I want to log all system events and errors for debugging and performance optimization.

---

## 5.13.1 Data to Track

| Category | Events/Fields to Track |
| :---- | :---- |
| **User Engagement** | \- Session start/end |
| \- Number of messages per session |  |
| \- Pages visited |  |
| \- Scroll/highlight actions triggered |  |
| \- Time on page with assistant open |  |
| **Intent Breakdown** | \- Questions about pricing, features, support, hours, services |
| \- Most common queries |  |
| **Lead Capture** | \- Lead form submission |
| \- Email provided |  |
| \- Drop-off before submission |  |
| \- Lead source page |  |
| **Conversion Events** | \- Booked demo |
| \- Downloaded PDF |  |
| \- Clicked outbound link |  |
| \- Signed up for newsletter |  |
| **System Metrics** | \- Assistant load time |
| \- LLM response time |  |
| \- API success/failure rates |  |
| \- Error logs |  |
| **AI Quality** | \- Thumbs up/down on responses |
| \- Follow-up rate |  |
| \- Confusion/“Didn’t help” flag rate |  |

---

## 5.13.2 Tracking Infrastructure

### Database Tables (Supabase)

* `sessions`: Stores session IDs, start/end time, user ID (if known), and page source  
* `messages`: Logs all assistant/user exchanges with timestamp, category, language  
* `events`: Logs scrolls, highlights, clicks, lead capture, and other user actions  
* `leads`: See Section 5.12 – includes source, intent tag, timestamps, score  
* `errors`: Tracks all system exceptions, API timeouts, and integration failures

### Real-Time Analytics Pipeline

* Optional: Mirror events to PostHog, Plausible, or Segment for enhanced dashboards  
* Create a Supabase view or materialized table for:  
  * Daily active users  
  * Lead conversion rate  
  * Average response time  
  * Top 10 queries

---

## 5.13.3 Developer Implementation Plan

1. **Tracking Library**  
   * Create `analytics.ts` utility with functions like `trackEvent()`, `logMessage()`, `recordError()`  
   * Include session UUID in every call  
   * Automatically log `startSession()` on assistant open  
2. **Frontend Hook**  
   * Use a centralized analytics handler (e.g., React Context or Vue plugin)  
   * Trigger on assistant events like:  
     * Message sent  
     * Message received  
     * Page scrolled  
     * Element clicked  
     * Input field shown  
     * Lead form submitted  
3. **Supabase Write**  
   * Use Supabase client to write rows to relevant tables in real time  
   * Implement rate-limiting/batching if needed  
   * Use row-level security tied to domain/project  
4. **External API Forwarding (Optional)**  
   * If client uses Segment, allow event forwarding  
   * Setup event mirror with filters to external destinations (PostHog, GA4, etc.)

---

## 5.13.4 Built-In Dashboard Features

An internal dashboard should be available to each business showing:

| Dashboard Section | Details |
| :---- | :---- |
| **Summary Stats** | \- Total sessions |
| \- Messages per session |  |
| \- Avg session duration |  |
| \- Leads captured |  |
| **Query Analysis** | \- Word cloud |
| \- Top 10 assistant questions |  |
| \- Breakdown by page |  |
| **Performance** | \- AI response time |
| \- LLM error rates |  |
| \- Assistant load time |  |
| **Leads Funnel** | \- Email capture rate |
| \- Drop-off rate |  |
| \- Conversion events triggered |  |
| **Engagement Heatmap** | \- Scroll/highlight frequency by page |
| **QA Metrics** | \- Thumbs up/down on answers |
| \- Flagged messages |  |
| \- Manual review log |  |

This dashboard can be built inside Supabase’s built-in UI or using a frontend dashboard integrated via API.

---

## 5.13.5 Notifications and Alerts (Optional)

| Type | Triggered When | Method |
| :---- | :---- | :---- |
| High engagement | \>100 sessions in a day | Email to admin |
| Lead spike | \>10 leads in \<1hr | Email or webhook |
| Error spike | \>5 API errors in 10 minutes | Slack/Discord |
| Negative feedback | \>5 thumbs-downs in a day | Internal flag |

---

## 5.13.6 Privacy & Compliance

* IP addresses and page data must be anonymized or excluded if required by GDPR/CCPA  
* Session UUID must not be directly linked to identity unless email is provided  
* Include notice in privacy policy that “This site uses an AI assistant which may track usage and anonymized questions to improve quality.”

---

## 5.13.7 Success Criteria

| Metric | Target Value |
| :---- | :---- |
| Daily active sessions | \>10 per 1,000 visitors |
| Session-to-lead conversion rate | \>15% |
| LLM response time | \<2 seconds (average) |
| Assistant load time | \<1.5 seconds (95th percentile) |
| Error-free sessions (API uptime) | 99.9% |
| Dashboard availability | 100% via Supabase or external |
| Thumbs-up to thumbs-down ratio | \>4:1 |

---

# 5.14 Admin Interface and Business Settings Panel

### Purpose

To give non-technical users full control over their siteGuide assistant without needing to edit code or manage infrastructure. The admin panel allows users to customize prompts, manage branding, configure lead forms, review analytics, export leads, and set AI behavior boundaries.

---

### User Story

* As a business owner, I want an intuitive dashboard where I can set up and personalize my assistant, review leads, and see performance metrics without writing a single line of code.  
* As a marketing manager, I want to adjust branding and tone, tweak lead form fields, and monitor assistant usage across pages and campaigns.  
* As a support staff member, I want to export the leads and session logs for follow-up or CRM import.

---

## 5.14.1 Access and Authentication

| Feature | Behavior |
| :---- | :---- |
| **Login/Signup** | OAuth with Google or email/password with magic link fallback |
| **Roles** | Admin (full access), Manager (no billing), Viewer (read-only) |
| **Access Control** | Based on domain verification and email whitelist |
| **Multi-Tenant Support** | Each account is isolated by project key; Supabase handles row-level security |

---

## 5.14.2 Dashboard Modules

Each module below is accessible via a left-hand sidebar, organized by function:

### 1\. **Home Overview**

* Total sessions this week/month  
* Lead capture summary  
* Click-through events (e.g., “Contact Us” clicked)  
* Uptime and assistant performance graph

### 2\. **Branding and Appearance**

* Business name and logo upload  
* Accent color / assistant bubble color picker  
* Assistant name and avatar image upload  
* Chat icon position (bottom left, bottom right)  
* Widget width and height (responsive preview)  
* Voice option (text-only or voice \+ text)

### 3\. **Content and Behavior Settings**

* Welcome message (editable prompt with variable injection: {business\_name}, {visitor\_first\_name})  
* Assistant tone (e.g., Formal, Friendly, Playful, Concise)  
* Navigation prompt structure (choose between informative or persuasive styles)  
* Blacklisted keywords or topics  
* Preferred default scroll behavior (smooth, instant, offset)

### 4\. **Lead Form Configuration**

* Toggle lead form on/off  
* Add/remove form fields (email, phone, name, custom questions)  
* Required vs optional field configuration  
* GDPR/CCPA compliance notice toggle  
* Lead follow-up webhook or email notification settings

### 5\. **FAQ and Suggestion Seeds**

* Seed up to 10 FAQs that the assistant will offer as clickable suggestions  
* Upload FAQ as CSV or write manually  
* Label each with display title and assistant response  
* Sync with on-site FAQ section (optional scraper or selector)

### 6\. **Pages & Paths**

* Set different behaviors per URL path (e.g., `/pricing`, `/contact`)  
* Custom welcome messages per page  
* Optionally disable siteGuide on certain pages (e.g., `/checkout`)  
* Assign priority paths to increase attention (e.g., homepage gets full animations)

### 7\. **Analytics**

* Real-time traffic with assistant engagement overlay  
* Scroll events per section  
* Highlight usage  
* Conversion funnel: visit → interaction → scroll → form shown → form submitted

### 8\. **Leads**

* Sortable, filterable lead table (by date, intent, page, field)  
* Export as CSV, JSON, or sync via webhook to CRM  
* View full chat log associated with each lead  
* Manual lead score override

### 9\. **Voice Settings**

* Choose AI voice style (e.g., calm, confident, cheerful, professional)  
* Upload fallback text for key actions (optional)  
* Enable/disable voice on mobile

### 10\. **Privacy and Security**

* Add cookie consent banner trigger  
* Request user consent before activating voice or tracking  
* Purge data by session ID or email  
* Enable/disable persistent memory storage per region  
* Enable/disable IP logging

---

## 5.14.3 Settings Architecture and Storage (Technical)

| Setting Type | Stored In Supabase Table | Notes |
| :---- | :---- | :---- |
| Branding & UI | `site_settings` | Logo URL, colors, position, size |
| Behavior Config | `assistant_behavior` | Welcome message, tone, fallback responses |
| Lead Form Config | `lead_fields` | Field label, type, required flag |
| FAQ & Seed Data | `assistant_faqs` | Text, click triggers, path association |
| Page-Specific Behavior | `page_settings` | Path URL, overrides, active status |
| Analytics Logs | `events`, `sessions`, `leads` | Stored in real-time |
| Voice Options | `voice_settings` | TTS engine selection, pitch/speed preferences |
| Security Preferences | `compliance_settings` | Consent config, privacy flags |

All settings are scoped to the customer’s project key and domain, with row-level security to prevent cross-access.

---

## 5.14.4 UI/UX Principles

* Mobile-first responsive design  
* Side navigation with collapsible modules  
* Toast-based notifications on save, error, or success  
* Inline previews for branding updates  
* Tooltip help text for advanced options  
* Setup checklist wizard on first login

---

## 5.14.5 Success Criteria

| Objective | Metric |
| :---- | :---- |
| Easy setup | 90%+ of users complete onboarding in \<15min |
| Lead visibility | 100% of leads logged and visible in panel |
| Customization adoption | \>75% of users modify branding or messaging |
| Data security | Zero cross-tenant data leakage |
| Dashboard responsiveness | Loads in \<2s on 4G connection |
| Export reliability | 100% download success for CSV exports |

---

# 6\. Deployment, Hosting, and Technical Stack

---

## 6.1 Deployment Strategy Overview

siteGuide is a JavaScript-based co-browsing assistant that integrates into any WordPress (and eventually any CMS or custom HTML) website via a single script tag. The backend services for memory, persistent sessions, lead storage, and admin controls are hosted on a cloud stack combining DigitalOcean, Supabase, and open-source runtime tools.

Deployment is structured to minimize client setup complexity while maintaining scalability across thousands of accounts.

---

## 6.2 Frontend Integration (Client Websites)

### Script Loader

Each client receives a unique `<script>` tag that loads siteGuide into their website.

Example:

```html
<script defer src="https://cdn.aiconnected.ai/siteguide.js" data-site-id="abc123"></script>
```

### Script Features

* Loads widget and assistant UI dynamically  
* Pulls branding, welcome prompts, and voice settings from Supabase via the site ID  
* Tracks user interactions, scroll targets, highlights, and form submissions  
* Establishes socket or polling connection to maintain co-browsing state

### Installation Platforms

* **WordPress:** Plugin wrapper that auto-injects the script in `<head>`  
* **Shopify:** Theme snippet and admin console helper app (Phase 2\)  
* **Custom Sites:** Copy-paste embed code

---

## 6.3 Hosting Infrastructure

| Component | Platform | Purpose |
| :---- | :---- | :---- |
| Frontend Embed Script | DigitalOcean CDN | Fast delivery of siteGuide widget across all sites |
| Widget UI & Assets | DO App Platform | HTML/CSS/JS for assistant, voice overlay, chat interface |
| Backend API | DO App Platform | Handles session tracking, actions, lead collection |
| Database | Supabase (Postgres) | Stores user sessions, memory data, leads, preferences |
| Auth/Access Control | Supabase | Role-based access to Admin Panel |
| Admin Panel | DO App Platform (Next.js) | Business-facing control dashboard |
| Persistent Vector Store | Supabase Edge Functions | Lightweight embeddings for ongoing memory recall |
| AI Model Runtime | Local LLM or hosted endpoint (Phase 2\) | Low-latency response generation |
| Analytics | Supabase \+ Logflare | Event tracking and funnel analysis |

---

## 6.4 Technical Stack Overview

### Frontend (Client-Facing)

* **Language:** JavaScript (ES6+)  
* **Framework:** Vanilla JS \+ Stimulus/AlpineJS (lightweight control)  
* **Voice:** Web Speech API or ElevenLabs (if enabled)  
* **UI Styling:** TailwindCSS, CSS custom properties injected per site  
* **Browser Storage:** `localStorage`, `sessionStorage`, and optional IndexedDB

### Backend (Server-Facing)

* **Runtime:** Node.js (API and sync calls)  
* **Database:** Supabase (PostgreSQL \+ RLS)  
* **Authentication:** Supabase Auth with JWT  
* **Realtime:** Supabase Channels (WebSockets for memory refresh, voice sync)  
* **Serverless Logic:** Supabase Edge Functions (Python/Node handlers)

### Admin Panel

* **Frontend:** Next.js with Tailwind and ShadCN components  
* **State Mgmt:** React Context \+ SWR  
* **API Calls:** Supabase JS SDK  
* **Deployment:** DO App Platform CI/CD

---

## 6.5 Project Environment Structure

```
/siteguide-core
  /src
    /embed             # JS loaded into client site
    /assistant         # Chat assistant logic
    /scrolling         # Scroll and highlight handlers
    /voice             # Voice controls + speech handling
    /navigation        # Path prediction and page changes
    /forms             # Lead form UI & validation
  /admin-panel
    /pages             # Next.js Admin Routes
    /components        # Configurable dashboards
    /utils             # API + local state helpers
  /api
    /functions         # Supabase Edge or DO API functions
```

---

## 6.6 Continuous Deployment Workflow

| Action | Toolchain |
| :---- | :---- |
| Code pushed to main branch | GitHub |
| Build triggered | DO App Platform CI |
| Admin panel deployed | Static Next.js output auto-pushed |
| Embed script redeployed | Bundled & uploaded to DigitalOcean CDN |
| Supabase migrations | Auto-run via CLI (SQL schema \+ RLS enforcement) |
| Error logging | Sentry (widget) \+ Logflare (backend) |

---

## 6.7 Environment Configuration

| Key Setting | Environment Variable | Notes |
| :---- | :---- | :---- |
| Supabase Project URL | `SUPABASE_URL` | Required for all API calls |
| Supabase Anon Key | `SUPABASE_ANON_KEY` | Read access for front-end |
| Admin Auth Secret | `ADMIN_JWT_SECRET` | For role-based Admin Panel |
| CDN Base URL | `CDN_BASE_URL` | Script delivery \+ assets |
| SiteGuide Instance ID | `SITE_ID` | Passed via script tag per client |
| Voice API Key (Optional) | `ELEVENLABS_API_KEY` or TTS Provider | Only needed for premium voice |

---

## 6.8 Success Criteria

| Metric | Threshold |
| :---- | :---- |
| Time to deploy on new client site | \< 2 minutes via script or plugin |
| Script load time (embed \+ UI) | \< 800ms over 4G |
| Admin Panel load time | \< 1.5s first contentful paint |
| Supabase API response latency | \< 250ms average |
| Real-time co-browsing sync events | 99.5% delivered within 500ms |
| Deployment errors per release | Zero regressions in script loader |

---

# 7\. Data, Privacy, and Security

This section outlines how siteGuide manages user data, protects personal information, and ensures full compliance with privacy laws such as GDPR, CCPA, and other international standards. Given that siteGuide operates on public-facing websites and can collect lead data, interaction data, and usage history, strict security and transparency standards are required at every layer.

---

## 7.1 Data Types Collected

siteGuide collects and stores a mix of behavioral, contextual, and optionally, personally identifiable information (PII). These are categorized into three tiers:

### Tier 1: Anonymous Session Data (Always Collected)

* Site ID  
* Session UUID (auto-generated, anonymized)  
* Pages visited (URL paths)  
* Time spent per page  
* Clicked buttons, scrolled sections  
* AI assistant prompts and responses  
* Device type, browser, and location (city/country only)

### Tier 2: Behavioral Memory Data (Optional, if enabled)

* Previous session interactions (persisted via Supabase)  
* Scroll targets and FAQ clicked history  
* Assistant confidence scores or misfires  
* Tracked goals (e.g., clicked “book now” or submitted a form)

### Tier 3: Personally Identifiable Information (Optional, Explicit)

* Name (via lead capture)  
* Email address (for follow-ups or persistent sessions)  
* Phone number (if captured in form fields)  
* Business name, industry (if provided)

---

## 7.2 Consent & User Control

### Anonymous Mode (Default)

* All tracking is non-personal unless the user engages the assistant and chooses to leave information.  
* No cookies are required for basic session tracking.

### Explicit Consent for PII

* Users are only asked for PII when initiating a lead submission or selecting “resume session via email”.  
* All PII entry points are accompanied by:  
  * A consent checkbox (e.g., “I agree to receive follow-up emails from this business.”)  
  * Link to the privacy policy  
* PII is stored only after consent is given and includes a timestamped consent log.

### Session Persistence Disclosure

* The first time a user revisits a site with active memory, the assistant displays:  
  * “Welcome back\! I remember your last visit. Would you like me to resume where we left off?”  
  * Options: Yes / No, start fresh  
  * If “Yes” is selected, session UUID is reused. If “No,” a new session is generated.

---

## 7.3 Data Storage and Retention

### Primary Storage: Supabase PostgreSQL

* Role-based access enforced via RLS (Row Level Security)  
* Business owners can only view data for their own site ID  
* All leads and PII stored with AES-256 encryption at rest

### Session History / Memory Storage

* Persisted sessions stored in structured JSON blobs  
* Indexed by session ID and optionally by email hash  
* Sessions auto-purge after 90 days of inactivity unless marked as "active lead"

### Vector Memory Embeddings (Optional Feature)

* If enabled, past interactions are stored in vector format for memory recall  
* Stored in Supabase Edge Functions or local Pinecone-compatible store  
* Only assistant prompts/responses are embedded — no raw PII

---

## 7.4 Data Transmission and Encryption

| Transmission Context | Encryption Protocol |
| :---- | :---- |
| Embed script from CDN | HTTPS (TLS 1.2 or higher) |
| Supabase API calls (client) | HTTPS |
| Realtime updates (WebSockets) | WSS with token auth |
| Voice recording / playback | HTTPS streaming (TTS only) |
| Admin dashboard login | Supabase Auth \+ JWT |

All data-in-transit uses modern TLS protocols. Authentication tokens are scoped per role and expire after 12 hours.

---

## 7.5 Data Access and Permissions

| Role | Access Scope |
| :---- | :---- |
| Anonymous visitor | No access to stored data beyond own session |
| Business Owner | Only data from sessions on their own site ID |
| Admin (internal) | Full access for support and debugging only |

### Admin Panel Restrictions

* No raw PII can be exported unless explicitly authorized  
* All export/download buttons must include a GDPR notice  
* Audit logs must be stored for all admin data access

---

## 7.6 Legal Compliance

### GDPR

* Consent-based data capture  
* Right to access, update, or delete data supported via email or admin interface  
* Data Protection Officer contact listed in privacy policy

### CCPA

* Opt-out banner for California visitors  
* “Do Not Sell My Info” link embedded in assistant’s settings menu

### International Data Protection

* Supabase supports global hosting, fallback plan includes EU-region storage if required  
* Client-specific data location setting can be added in Phase 2

---

## 7.7 User Rights & Removal

* **Delete my data** request form available in assistant settings and on host site privacy policy  
* Users can enter their email address and receive a confirmation link to delete stored data  
* Admin tools include “Forget Session” and “Forget User” functions to fully wipe records  
* All deletions are hard-deleted, not just flagged

---

## 7.8 Breach Mitigation and Logging

* Daily audit logs of all data accesses and exports  
* Error and anomaly detection on spike in PII access  
* Internal alerts (Slack/email) for:  
  * Failed auth attempts  
  * Abnormal access patterns  
  * Large export operations

In case of breach:

* Affected businesses are notified within 72 hours  
* Users are notified by the host business (not aiConnected)  
* Full forensics retained and logged

---

## 7.9 Success Criteria

| Metric | Target |
| :---- | :---- |
| User PII stored without consent | 0 incidents |
| Average time to fulfill deletion request | \< 48 hours |
| % of sessions tracked anonymously | ≥ 90% unless lead is captured |
| Admin exports logged and auditable | 100% |
| Compliance review status | GDPR \+ CCPA certified policies |

---

# 8\. Admin Tools and Business Dashboard

This section details the full feature set of the administrative dashboard provided to business owners who install siteGuide. It defines how users (businesses) can configure, monitor, and optimize their assistant, view session replays, manage leads, and adjust behavior to better match their conversion goals.

The admin panel is hosted by aiConnected and accessed via secure login at `dashboard.aiConnected.ai`.

---

## 8.1 Authentication and Access

### Login

* Secure login via Supabase Auth (email \+ password or OAuth)  
* Optional 2FA via email or authenticator app (Phase 2\)  
* Each business user account is linked to one or more websites via a unique `site_id`

### User Roles

* **Owner:** Full access to all data and settings for a given site  
* **Editor:** Can modify assistant behavior and branding  
* **Viewer:** Read-only access to leads, transcripts, and analytics

---

## 8.2 Site Onboarding and Setup

Upon first login, the user is taken through a 4-step assistant setup process:

1. **Site Details**  
   * Site name  
   * Industry category  
   * Public URL  
2. **Assistant Configuration**  
   * Select use-case focus: Lead Generation, FAQ Help, Navigation, or All  
   * Upload up to 5 key pages (for initial semantic parsing)  
3. **Branding**  
   * Upload logo (used in chat bubble)  
   * Pick assistant color scheme  
   * Set assistant greeting (e.g., “Hi\! Need help finding anything?”)  
4. **Embed Script**  
   * One-line JS snippet provided (customized with `site_id`)  
   * Includes step-by-step WordPress instructions  
   * Includes check for script installation (active/inactive status)

All assistant settings are editable later in the dashboard.

---

## 8.3 Real-Time Interaction Feed

Business users can view a live feed of interactions on their site.

### Features

* Scrollable timeline of sessions, labeled by:  
  * Session UUID  
  * Entry page (e.g., `/pricing`)  
  * Time of visit  
  * Assistant topic (e.g., “Asked about refund policy”)  
* Toggle to view chat transcript per session  
* “Highlight in replay” option for scroll & click actions

### Filters

* By date range  
* By action type (clicked button, submitted form, etc.)  
* By page (e.g., all sessions on `/contact`)

---

## 8.4 Lead Management

siteGuide automatically saves leads captured by the assistant.

### View Leads

* Table view with:  
  * Name, email, phone, timestamp  
  * Assistant summary (e.g., “Interested in monthly subscription plan”)  
  * Lead source (page and session ID)  
* Click to view full transcript of interaction

### Actions

* Export to CSV  
* Push to CRM (Zapier or webhook)  
* Mark as contacted  
* Delete or redact lead

### Smart Tags

* Auto-generated tags (e.g., “Pricing Inquiry,” “Booking Request”)  
* Searchable and filterable by tag  
* Option to assign custom tags

---

## 8.5 Assistant Customization

Within the dashboard, users can fine-tune the assistant’s:

### Greeting

* Change default greeting based on page context  
* Set greeting delay (e.g., greet after 15s on site)

### Lead Prompt Behavior

* Set “When should the assistant offer to collect contact info?”  
  * After 2+ questions  
  * After goal reached (e.g., visited booking page)  
  * After 60+ seconds of activity

### Tone of Voice

* Options: Friendly, Professional, Casual, High-Energy  
* Future: Custom fine-tuning per business (e.g., import brand tone document)

### Language Support

* Choose one default language  
* Option to auto-detect browser language (Phase 2\)

---

## 8.6 Analytics and Performance Tracking

### Key Metrics

* Total sessions  
* Avg. session duration  
* Leads generated  
* Lead conversion rate (% of total sessions)  
* Most clicked elements (based on scroll & highlight)

### Conversion Goals

* Define conversion goals (e.g., clicked “Book Now” or submitted form)  
* View goal completions over time  
* AI will learn which phrases and paths lead to conversion and adjust behavior

### Funnel View

* Visualization of how users navigated via the assistant  
* Drop-off points highlighted  
* Common click paths mapped

---

## 8.7 Session History and Replay

Each session is stored with:

* Page paths visited  
* AI actions (scrolls, highlights, clicks)  
* Full assistant transcript  
* Lead form status  
* Dwell time and exit page

Business users can replay sessions in real-time or scrub through a timeline to analyze drop-offs and assistant accuracy.

---

## 8.8 Privacy Controls

* “Forget this user” option per session (deletes memory and transcript)  
* Toggle assistant memory on/off per site  
* Set default session expiry duration (e.g., forget after 30 days)

---

## 8.9 Success Criteria

| Functionality | Success Definition |
| :---- | :---- |
| Assistant installed | \>95% of registered users complete embed |
| Leads captured | ≥15% of sessions yield lead or booking |
| Business user login frequency | 2+ logins per week |
| Customization usage | \>50% of users change at least 2 default settings |
| Export/download compliance | 100% consent and access logs recorded |

---

# 9\. Multisite Support and Scalability

This section outlines how siteGuide will support businesses with multiple websites, teams, or assistant configurations, while ensuring robust infrastructure performance and clear segmentation of data. This is especially important for agencies, franchises, and enterprise clients managing multiple domains or regional sites.

---

## 9.1 Multisite Support

### Overview

Each business user account can create and manage multiple “Sites.” A **Site** represents a single domain or subdomain with its own assistant configuration, memory, and analytics.

### Use Case Examples

* A marketing agency installs siteGuide on 50 client websites.  
* A franchise business operates 10 local domains with distinct offerings.  
* An enterprise has different language sites (e.g., `us.example.com`, `de.example.com`).

### Site Independence

* Each site has:  
  * Its own `site_id`  
  * Separate assistant memory  
  * Unique branding, prompts, lead fields, and settings  
  * Separate analytics dashboard

### Switching Sites

* Admin users can switch between sites in the dashboard via a dropdown.  
* Each session and assistant instance reports to the correct site via `site_id` embedded in the JS snippet.

---

## 9.2 Multi-User Team Management (Future)

**Not required at launch**, but the architecture must support future team permissions per site:

| Role | Permissions |
| :---- | :---- |
| Owner | Full access across all sites under their account |
| Site Admin | Full access to one site |
| Assistant Editor | Modify assistant prompts only |
| Lead Viewer | View leads and transcripts only |

Admin panel UX must be built with this future expansion in mind, using componentized RBAC (role-based access control) logic.

---

## 9.3 Namespace Isolation

Each `site_id` creates a namespace for:

* Supabase tables (e.g., `leads_site_abc123`)  
* Vector memory storage  
* AI context injection (no bleed between sites)  
* Session cookies (stored as `siteguide_{site_id}_session`)

Isolation is critical to prevent:

* Cross-site data leakage  
* Confused memory injection  
* Duplicate analytics across different domains

---

## 9.4 Performance Scaling Strategy

siteGuide must remain performant even when installed on thousands of websites with concurrent usage. The architecture supports this by offloading responsibilities:

### On-Page Load

* Assistant assets (JS, CSS, UI logic) are served via CDN  
* Only lightweight UI bundle is loaded on client  
* Memory and reasoning are cloud-based (via aiConnected APIs)

### Interaction Workflow

* Frontend sends prompts → aiConnected API handles reasoning  
* aiConnected returns next action (chat reply, scroll, highlight, etc.)  
* Local browser executes the action; no blocking behavior

### Storage

* Supabase handles:  
  * Session metadata  
  * Leads and transcripts  
  * Interaction logs  
* Vector memory stored separately per site for AI retrieval

### Load Management

* All API endpoints and memory functions are stateless  
* Persistent memory is stored externally, only loaded when needed  
* No live WebSocket unless co-browsing view is active (very rare)

---

## 9.5 Deployment Strategy for Large Clients

For enterprise or agency-level installations:

* Provide white-label version of the dashboard  
* Allow API access to pull leads into external CRM  
* Custom subdomains per client (`clientname.aiConnected.ai`)  
* Dedicated memory instance per enterprise tenant

Optional: Offer service-level guarantees for uptime, replay storage, and assistant memory limits via SLAs.

---

## 9.6 Success Criteria

| Goal | Success Metric |
| :---- | :---- |
| Cross-site stability | Zero data leakage between sites |
| Time to add new site | Under 5 minutes with full configuration |
| Site switching usage | 70% of agency/franchise users manage 2+ sites |
| Performance degradation threshold | No slowdown up to 10,000 simultaneous sessions |

---

# 10\. Data Retention, Privacy, and Security

This section defines how siteGuide handles all user and business data with strict regard for security, privacy compliance (e.g., GDPR, CCPA), and retention policies. It ensures that siteGuide can be confidently deployed on high-trust websites — including healthcare, finance, legal, and education — without risk of data compromise or misuse.

---

## 10.1 Data Categories

The platform interacts with the following categories of data:

### 1\. Visitor Data (End User)

* Session ID (UUID)  
* Page visits  
* Clicks, scrolls, highlight paths  
* Chat transcript with the assistant  
* Lead capture data (e.g., name, email, phone)

### 2\. Business Data (Site Owner)

* Assistant configuration  
* Uploaded brand assets (logo, colors)  
* Custom prompts and overrides  
* Lead management records

### 3\. System Metadata

* Time stamps  
* API logs (request/response)  
* Browser/user agent  
* Memory vector keys (hashed)

No sensitive credit card or health data is ever collected by default.

---

## 10.2 Data Retention Rules

### For Visitor Sessions:

* Active memory: 30 days by default  
* Transcript: 90 days stored (configurable per business)  
* Full replays (scroll/click): 30–60 days (configurable, auto-expiry)  
* Leads: Stored indefinitely unless deleted by user or business

### For Business Accounts:

* Configurations and assistant settings are stored until account closure  
* Deletion of a site permanently removes assistant memory and leads for that site

Businesses may configure auto-expiry rules per data category.

---

## 10.3 Privacy Tools for Website Visitors

siteGuide complies with privacy regulations by offering the following end-user protections:

### GDPR/CCPA Banner Integration

* Auto-detects cookie banner tools (e.g., Cookiebot, Termly)  
* Delays assistant activation until consent is granted

### Data Access & Deletion

* In-chat message: “Forget my data” triggers memory and transcript wipe  
* Link in the siteGuide assistant footer: “Privacy Settings”  
* Supabase triggers delete logs and scrubs all indexed vectors for session ID

### Opt-Out Mechanisms

* Memory-free mode (temporary session, no persistence)  
* Ability for businesses to turn off memory or auto-delete after each session

---

## 10.4 Encryption Standards

### In Transit

* All API communication encrypted via HTTPS/TLS 1.3  
* All websocket or push-based updates encrypted via secure channels

### At Rest

* Supabase database encrypted with AES-256  
* Vector memory storage encrypted at disk level  
* Passwords stored using bcrypt (Supabase default)

---

## 10.5 Security Architecture

### Access Controls

* Role-based access system per site and user  
* Tokens for assistant instances scoped to `site_id`  
* No cross-site access possible

### API Protection

* Rate-limited public endpoints  
* Token auth (JWT) with auto-refresh  
* All read/write operations scoped to authorized `site_id`

### Admin Monitoring

* Admin audit logs for every assistant update or lead export  
* IP logging for dashboard activity  
* Alerts for unusual data export volumes

### Hosting Security (DigitalOcean)

* Hosted behind firewall  
* Backups run daily with encrypted snapshots  
* Auto-scaling infrastructure with DDOS mitigation via CDN

---

## 10.6 Compliance and Certifications

| Standard | Compliance Status |
| :---- | :---- |
| GDPR | Fully compliant |
| CCPA | Fully compliant |
| HIPAA | Not covered (future add-on) |
| SOC 2 | Planned via DigitalOcean infra roadmap |
| WCAG | AA-level accessible assistant UI |

---

## 10.7 Success Criteria

| Objective | Measurable Indicator |
| :---- | :---- |
| User privacy control | 100% compliance with deletion and opt-out requests |
| Security incidents | Zero breaches or unpatched vulnerabilities |
| Encryption coverage | 100% of stored PII encrypted at rest and in transit |
| Business adoption in sensitive fields | At least 10% of users from regulated industries |

---

# 11\. Optional Enhancements and Future Features

This section outlines advanced capabilities that are not part of the core MVP for siteGuide but represent high-value additions for future iterations. These features aim to deepen personalization, streamline integrations, and expand the assistant’s utility across more complex customer journeys.

---

## 11.1 Persistent Cross-Device Memory (User-Level Identity)

### Overview

Currently, session memory is stored per browser via session cookies and optionally resumed via email input. Future updates will enable:

* Memory that persists across different devices (mobile, desktop, tablet)  
* Seamless recall of past conversations regardless of browser or IP

### Implementation

* Add user account creation for site visitors (email \+ OTP, no password)  
* Upon login, assistant retrieves full memory tied to that user across all sessions  
* Memory entries will now use `user_id` in addition to `session_id`

### Benefit

* Enables deeper personalization (e.g., “Welcome back, here’s where we left off.”)  
* Ideal for e-commerce (cart recovery), SaaS onboarding, and service industries

---

## 11.2 CRM/Inbox Memory Training

### Overview

SiteGuide could eventually use historical data (e.g., past customer emails, CRM conversations, FAQs) to train the assistant’s tone, knowledge, and objection handling.

### Implementation

* Allow business to connect Gmail, HubSpot, Salesforce, or import CSVs  
* N8N workflow processes text content → cleans → indexes into memory  
* System adds tagged knowledge as non-user memory into vector database

### Use Cases

* Customer support pretraining  
* Personalized onboarding flows  
* Sales conversation reference material

---

## 11.3 Sentiment-Aware Conversation Routing

### Overview

The assistant can monitor sentiment during a live conversation and take specific actions based on tone or urgency.

### Examples

* Angry tone → escalate to human  
* Hesitation or doubt → offer clarification or schedule a callback  
* Excitement → accelerate toward conversion (e.g., direct booking link)

### Implementation

* Sentiment detection via OpenAI or local model  
* Assign confidence scores to emotional state  
* Trigger conditional responses in chat flow

---

## 11.4 Event-Based Assistant Behavior

### Overview

Let the assistant react to specific user behaviors, such as:

* Inactivity for 15 seconds → assistant re-engages  
* Scrolls to bottom of page → assistant offers help  
* Copies coupon code → assistant logs intent  
* Leaves a form half-filled → assistant offers to resume later

### Implementation

* Small JS listener library bundled with siteGuide script  
* Events forwarded to assistant via n8n node or native web socket  
* Assistant modifies behavior contextually

---

## 11.5 Custom Action Buttons

### Overview

Businesses can configure reusable call-to-action buttons that appear contextually in the chat (e.g., “Download Brochure,” “Book a Demo,” “Request a Quote”).

### Features

* Buttons tied to tracked actions (downloads, form opens, calendar launches)  
* Trigger scripts, open URLs, or emit custom DOM events  
* Responses can vary based on page URL or user attributes

---

## 11.6 Multilingual Support

### Overview

Enable automatic detection of the user’s preferred language (via browser locale or explicit choice) and localize:

* Assistant UI  
* Voice output (with accent control)  
* Chat responses with translated memory

### Tech

* Translation memory index per language  
* Optional integration with DeepL or OpenAI multilingual model  
* Supabase row-level localization support

---

## 11.7 AI-Powered Dynamic Product Tours

### Overview

Assistant visually guides the user through onboarding or product education by:

* Moving across multiple pages  
* Highlighting specific UI elements  
* Narrating what each feature does  
* Waiting for user input before advancing

### Use Cases

* SaaS onboarding  
* Guided demos for apps  
* Product walkthroughs for e-commerce

---

## 11.8 Advanced Lead Routing Rules

### Overview

Lead data from conversations can be conditionally routed to different destinations:

* Sales rep assignment based on region  
* Different CRM pipelines for product categories  
* Instant Slack alerts for “hot” leads only

### Configuration

* Rules defined in dashboard (If/Then UI)  
* N8N integrations execute delivery

---

## 11.9 Success Criteria for Future Feature Rollouts

| Feature | Success Indicator |
| :---- | :---- |
| Cross-device memory | 30% increase in user return-to-chat rates |
| CRM memory training | 25% reduction in live agent transfers |
| Sentiment routing | 40% faster lead escalation |
| Event triggers | 10% increase in lead engagement rates |

---

# 12\. Roadmap and Development Milestones

This section defines the phased development plan for siteGuide, breaking the project into achievable milestones with clear deliverables. It ensures alignment between technical teams, product leads, and business stakeholders by mapping each stage of the platform’s rollout — from initial prototype to full feature maturity.

---

## 12.1 Phase 0: Internal Proof of Concept (Weeks 1–2)

**Objective:** Prove feasibility of real-time DOM interaction, voice control, and persistent session memory using minimal stack.

**Deliverables:**

* Embeddable JS snippet that attaches AI to a test website  
* Working co-browsing overlay (mouse follow \+ highlight)  
* Basic chat window with GPT-powered responses  
* DOM element targeting for text highlight and scrolling  
* Session memory stored in localStorage and Supabase  
* Voice input test (Web Speech API) and text-to-speech (ElevenLabs or fallback)

**Success Criteria:**

* Assistant can read and highlight a paragraph on command  
* Page reload does not lose the session transcript  
* Voice interaction succeeds in \>90% of test cases

---

## 12.2 Phase 1: MVP Beta (Weeks 3–6)

**Objective:** Deliver a fully functional co-browsing assistant with persistent memory, working chat interface, and voice interaction on any WordPress site.

**Key Features:**

* AI overlay with chat UI and draggable co-browsing assistant  
* DOM scanning and tag-based element detection  
* Smooth scrolling and mouse-follow animation  
* Persistent session memory (local and Supabase)  
* Voice input/output (toggleable)  
* Email-based session resumption  
* Page-to-page memory continuity

**Technical Setup:**

* Supabase instance for storage, auth, and vector memory  
* Next.js management dashboard for site owners  
* Embedded JS loader script (deferred, async-ready)  
* n8n orchestration for memory, triggers, lead routing

**Success Criteria:**

* Installable via 1-line script on any WordPress site  
* Leads successfully captured and stored  
* Memory persists across navigation and logout/login  
* Works with \>80% of tested themes and site builders

---

## 12.3 Phase 2: Public Launch (Weeks 7–10)

**Objective:** Launch siteGuide as a production-ready AI assistant with basic customization options and onboarding workflow.

**New Features:**

* Assistant appearance configuration (avatar, colors, tone)  
* Memory viewer for business owners  
* Lead export tools  
* Activity log (visits, transcripts, heatmaps)  
* Usage-based billing integration

**Platform Stability Goals:**

* 99.9% uptime for API and Supabase  
* Secure authentication and encryption standards  
* No memory loss or duplication bugs

**Success Criteria:**

* 100 active businesses onboarded within first 30 days  
* \<1% session loss rate  
* CSAT \>90% for assistant UX across test users

---

## 12.4 Phase 3: Expansion (Weeks 11–14)

**Objective:** Begin adding optional modules and partner integrations for advanced use cases.

**Expansion Modules:**

* CRM/email inbox memory training  
* Cross-device persistent identity  
* Event-based engagement triggers  
* Custom action buttons  
* Full language localization  
* Zapier/Make.com integration

**Developer Support:**

* SDK or plug-in points for external developers  
* API access for programmatic lead retrieval

**Success Criteria:**

* CRM integration used by at least 25% of active customers  
* Average lead volume per business increases \>30% over beta  
* Third-party developer contributions submitted

---

## 12.5 Maintenance & Support Cycle (Ongoing)

**Responsibilities:**

* Weekly check-in on Supabase logs and memory usage  
* Monthly security audit of token/auth layers  
* Proactive UI updates for browser compatibility  
* Quarterly feature reviews based on customer feedback

**Ongoing Metrics to Monitor:**

* Assistant open rate per visitor  
* Drop-off points in conversations  
* Percentage of leads converted from assistant

---

## ✅ Missing or Underdeveloped Areas

### 1\. **Security & Compliance Guidelines**

**What’s missing:**  
A clear, dedicated section on how to handle:

* User data encryption (at rest and in transit)  
* Cross-site scripting (XSS) and injection protections in the chat overlay  
* Secure handling of memory/session data  
* Supabase row-level security policies  
* Optional GDPR/CCPA compliance for data deletion or user export

**Why it matters:**  
Investors, enterprise clients, and CTOs will expect clarity around data security — especially since siteGuide stores identifiable memory and possibly voice data.

---

### 2\. **Analytics & Insight Framework**

**What’s missing:**  
A description of what will be tracked, where it will be stored, and how businesses will view it:

* Heatmaps (page areas most highlighted or requested)  
* Assistant usage stats (open rates, most clicked responses, voice usage)  
* Lead funnel performance (drop-offs, completions)  
* Session replay or text playback options

**Why it matters:**  
Data reporting is a huge competitive differentiator, and analytics are essential to prove ROI for small business clients.

---

### 3\. **Unit Tests & QA Expectations**

**What’s missing:**  
A brief QA/testing protocol section specifying:

* What should be tested (UI components, memory persistence, DOM targeting)  
* Acceptable test coverage threshold  
* Bug classification and triage priorities (e.g., memory loss \= P0, misaligned scroll \= P2)  
* How often regression testing occurs (especially for DOM updates on client sites)

**Why it matters:**  
Even junior developers benefit from seeing what “done” means in code quality and test resilience.

---

### 4\. **Browser & Device Compatibility Matrix**

**What’s missing:**  
Explicit list of:

* Minimum browser versions (Chrome, Safari, Firefox, Edge)  
* Supported devices (desktop, iPad/tablet, mobile)  
* Voice input/output compatibility (e.g., Safari on iOS may block mic access)

**Why it matters:**  
This prevents confusion and support tickets when customers say "the assistant isn’t talking to me on my iPhone.”

---

### 5\. **Disaster Recovery & Failover Handling**

**What’s missing:**  
Scenarios and protocols for:

* Supabase outage  
* GPT model failure or API timeout  
* Frontend script failure due to site conflicts  
* Session loss or memory desync

**Why it matters:**  
Even if just briefly noted, having recovery mechanisms planned builds trust in the system’s resilience.

---

### 6\. **In-Chat Context Menu / Tooltips**

**What’s missing:**  
A UI addition that lets users:

* Click a highlighted term for more info  
* View why a certain element was selected  
* Hover over past memory or assistant replies to expand context

**Why it matters:**  
Improves user transparency and makes the AI feel more explainable — especially important for trust and legal/sensitive use cases.

---

### 7\. **Developer Environment Setup Instructions**

**What’s missing:**  
The current PRD assumes the dev will figure out how to start. You should include:

* GitHub repo structure  
* Initial command-line setup  
* Environment variable list (`.env.example`)  
* Recommended deployment environment (e.g., DigitalOcean droplet \+ Supabase project \+ Vercel frontend)

**Why it matters:**  
Reduces ramp-up time and ensures developer onboarding is smooth — especially helpful if you later outsource pieces of the work.

---

### 8\. **Glossary of Terms**

**What’s missing:**  
A simple glossary defining:

* Co-browsing  
* Session memory  
* Highlighting  
* DOM targeting  
* Rehydration  
* Vector memory  
* Supabase (if junior developers are unfamiliar)

**Why it matters:**  
Removes ambiguity, aligns the team’s mental model, and prevents incorrect assumptions during buildout.

---

## ✅ Must-Have Components Already Covered

The PRD **already does** an excellent job defining:

* AI overlay and chat interface  
* DOM targeting and element highlighting  
* Smooth co-browsing via scrolling and auto-focusing  
* Voice input and output with fallback behavior  
* Persistent session memory using Supabase/localStorage  
* Page-to-page continuity and assistant UI hydration  
* Email-linked session resumption  
* Developer roadmap, milestone plan, and fallback behavior

These are the **core capabilities**. Nothing essential to the app's core promise has been omitted in design.

---

## ❗Remaining Gaps That Could Block or Break the Build

These are *the last few real blockers* that, if not addressed, could cause the app to fail in live use or break user expectations.

---

### 1\. **Universal Page Context Restoration**

**Problem:**  
After clicking to a new page, the assistant must **instantly restore** the exact scroll position, memory log, and highlight state.

**Gap:**  
The PRD touches on this concept but doesn’t define a technical spec for:

* Re-scanning DOM after page load  
* Reapplying the last command (e.g., re-highlighting paragraph 3\)  
* Rehydrating open conversation state in the UI

**Why it matters:**  
If the AI clicks "Learn More" and the user lands on a new page with a blank assistant and lost memory, the illusion is broken.

**Solution:**  
Define a **reinitialization protocol**:

* Snapshot last action (DOM selector, command, scroll pos)  
* Reapply it after `window.onload`  
* Restore chat UI with `sessionId`

---

### 2\. **DOM Targeting Consistency**

**Problem:**  
Live websites often use dynamic classes or DOM mutations (e.g., from page builders, sliders, or animations). Relying on `querySelector` alone is brittle.

**Gap:**  
There is no fallback or adaptive targeting strategy if selectors fail.

**Why it matters:**  
AI might “click” something that doesn’t exist anymore or highlight the wrong element — causing user confusion or failure to complete an action.

**Solution:**

* Use multiple DOM targeting strategies: static selectors \+ text match fallback \+ XPath  
* Store not just the selector, but the **text content \+ position index** for fuzzy recovery  
* Gracefully degrade with a message like: “It looks like this section changed — let me find the new version for you”

---

### 3\. **Race Conditions in DOM Rendering**

**Problem:**  
If the AI tries to scroll/highlight/click before the DOM is fully hydrated (e.g., on SPA sites or heavy WordPress themes), the action will silently fail.

**Gap:**  
There’s no defined method for detecting **DOM readiness** before performing assistive actions.

**Why it matters:**  
Some client sites will appear “broken” because the AI moves too quickly after navigation or user commands.

**Solution:**

* Use `MutationObserver` or wait for specific element load before interaction  
* Add retry logic for element-based actions (e.g., scroll \+ highlight up to 3x with delay)

---

### 4\. **WordPress Script Isolation**

**Problem:**  
Many WordPress sites inject tons of JS (e.g., Elementor, WPBakery, Divi) that can conflict with your script or override events.

**Gap:**  
The PRD doesn’t define how to **sandbox** or isolate the AI’s scripts from common WordPress clashes.

**Why it matters:**  
You may see bugs that are hard to debug because other plugins intercept clicks, hijack styles, or reset DOM state.

**Solution:**

* Wrap assistant inside a **Shadow DOM**  
* Use CSS prefixing for isolation  
* Avoid assuming control over `window`, `document`, or global classes

---

### 5\. **Fail-Safe UI Behavior**

**Problem:**  
If the AI crashes or stalls, there’s no guidance yet on how to gracefully recover or notify the user.

**Gap:**  
No status indicators or fallback UI states are defined.

**Why it matters:**  
An invisible or frozen assistant \= a completely broken experience. Especially problematic in customer-facing websites.

**Solution:**

* Add a UI status pill: “Thinking...”, “Listening...”, “Connection lost”  
* Retry on GPT/Supabase failure  
* Trigger a self-heal or refresh prompt if assistant is unresponsive for 10+ seconds

---

### 6\. **Cross-Origin Memory Behavior**

**Problem:**  
You mention expanding to “all websites” — but the PRD assumes you’ll always have access to embed a script on the target site.

**Gap:**  
There’s no plan for supporting co-browsing across sites you **don’t own**, or across multiple domains (e.g., subdomains, client portals).

**Why it matters:**  
This becomes relevant once you expand beyond single-site deployments and want full session memory across apps (e.g., WordPress \+ Shopify).

**Solution:**

* For now, scope to same-origin sessions  
* Flag this as a future milestone: **Cross-Origin Shared Session Layer**, possibly using OAuth \+ client-side session tokens

---

## ✅ Summary: Build is Feasible with Minor Additions

You are **95% complete** in design. The remaining \~5% are critical execution details that, if skipped, would cause:

* Inconsistency across real-world websites  
* Broken assistant behavior after navigation  
* Perceived bugs due to race conditions or DOM conflict  
* Loss of user trust due to UI crashes or incorrect highlights

Once you address the above 6 points explicitly in the PRD (even briefly), a developer — junior or senior — should be able to build the **exact experience you envision**, end-to-end.

Would you like me to revise the PRD to include these, or just generate the add-on sections to paste in?

---

Powered by [ChatGPT Exporter](https://www.chatgptexporter.com)  
