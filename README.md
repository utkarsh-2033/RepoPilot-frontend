# RepoPilot — Frontend

> **Modern web interface for RepoPilot, an AI-powered codebase assistant that connects GitHub repositories, indexes source code, and provides grounded AI answers with source citations.**

**Backend:** [RepoPilot Backend](https://github.com/utkarsh-2033/RepoPilot)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | **Next.js 16 (App Router)** |
| **Language** | **TypeScript** |
| **Styling** | **Tailwind CSS 4** |
| **Server State** | **TanStack React Query** |
| **Components** | **shadcn/ui** |
| **Icons** | **Lucide React, React Icons** |
| **Theme** | **next-themes** |

---

## ✨ What is RepoPilot?

RepoPilot is an **AI-powered codebase assistant** that lets developers connect their GitHub repositories and ask questions about their actual codebase.

Instead of treating an AI model as a generic chatbot, RepoPilot grounds responses in the indexed repository and exposes the source files used to generate the answer.

The frontend provides the complete user-facing experience:

```text
GitHub Login
     ↓
Repository Dashboard
     ↓
Select Repository
     ↓
Index Repository
     ↓
Track Indexing Progress
     ↓
Create Chat Session
     ↓
Ask Question
     ↓
Stream AI Response
     ↓
Display Source Citations
```

The frontend communicates with a separate **Spring Boot + Spring AI backend** responsible for GitHub integration, repository indexing, vector retrieval, LLM generation, and citation validation.

---

## 🧠 Core Features

### 🔐 GitHub Authentication

The frontend integrates with the backend's GitHub OAuth flow.

Users can:

- Start GitHub authentication
- Retrieve the authenticated user
- Maintain the authenticated session through HTTP credentials
- Log out through the backend

The API layer uses:

```ts
credentials: "include"
```

so authentication cookies/session information are included in requests.

---

### 📦 Repository Management

Users can interact with their GitHub repositories through the dashboard.

The frontend supports:

- Fetching repositories
- Synchronizing repositories from GitHub
- Selecting a repository
- Starting repository indexing
- Monitoring indexing status

---

### ⚡ Repository Indexing

After selecting a repository, the frontend can trigger backend indexing:

---

## 💬 Streaming AI Chat

One of the most important parts of the frontend is the **streaming chat implementation**.

Instead of waiting for the complete LLM response, the frontend consumes the backend's SSE stream incrementally.

```text
User Question
      │
      ▼
POST /api/chat/session/{id}/message
      │
      ▼
Spring Boot + Spring AI
      │
      ▼
LLM
      │
      ├── token
      ├── token
      ├── token
      ├── citations
      └── done
      │
      ▼
Frontend Stream Parser
      │
      ├── update answer
      ├── update citations
      └── complete message
```

---


### Stream lifecycle

```text
HTTP Response
     ↓
ReadableStream
     ↓
TextDecoder
     ↓
Line Buffer
     ↓
SSE Event Parser
     ↓
Event Type
 ┌───┼───────────┐
 ↓   ↓           ↓
token citations done
 ↓   ↓           ↓
UI  Sources   Complete
```

The implementation also handles partial chunks correctly by maintaining a buffer when an SSE event is split across multiple network reads.

---

## 📚 Source Citations

RepoPilot's chat interface supports citations returned by the backend.

The backend validates citations against the retrieved RAG context before sending them to the frontend.

The frontend receives the validated citation data and can associate an answer with its underlying repository sources.

Conceptually:

```text
AI Answer
   │
   ├── [C1]
   ├── [C2]
   └── [C3]
        │
        ▼
Retrieved Repository Chunks
        │
        ▼
File + Line Metadata
```

This makes the chat experience **source-grounded rather than purely conversational**.

---

## 🗂️ Frontend Architecture

The project follows the Next.js App Router structure:

```text
RepoPilot-frontend/
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── ...
│
├── components/
│   ├── landing/
│   ├── providers/
│   └── ...
│
├── hooks/
│
├── lib/
│   ├── api.ts
│   └── ...
│
├── public/
│
├── types/
│
├── components.json
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── eslint.config.mjs
```

---

## 🧩 State Management

The frontend uses **TanStack React Query** for server-state management.

The application configures a shared `QueryClient` with:

- 5-minute query stale time
- disabled refetch-on-window-focus
- automatic retries for transient failures
- no automatic retry for `401` / `403` authentication errors

This provides centralized handling of backend state while avoiding unnecessary requests.

---

## 🎨 Styling & UI

The frontend uses **Tailwind CSS 4** for utility-first styling.

The component system combines:

- shadcn/ui
- Base UI
- Tailwind CSS
- Lucide React
- React Icons

---

## ⚙️ Environment Variables

```env
NEXT_PUBLIC_SERVER_URL={}
```
---

## 🚀 Getting Started

### Prerequisites

Make sure you have:

- Node.js
- npm / pnpm / yarn / Bun
- RepoPilot Spring Boot backend running
- GitHub OAuth configured in the backend

### 1. Clone

```bash
git clone https://github.com/utkarsh-2033/RepoPilot-frontend.git

cd RepoPilot-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Create:

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:8080
```

### 4. Start development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🔄 Complete System Architecture

RepoPilot is split into two repositories.

### Frontend

```text
Next.js 16
React 19
TypeScript
Tailwind CSS
TanStack Query
        │
        │ REST + SSE
        ▼
```

### Backend

```text
Spring Boot
Spring Security
Spring AI
PostgreSQL
Vector Store
        │
        ▼
GitHub API + LLM + Embeddings
```

### Complete flow

```text
                       GitHub
                         │
                         ▼
                 ┌───────────────┐
                 │ Spring Boot   │
                 │    Backend    │
                 └───────┬───────┘
                         │
             Repository Indexing
                         │
                         ▼
                    Vector Store
                         │
                         │
Next.js Frontend ────────┤
                         │
                   User Question
                         │
                         ▼
                     Retrieval
                         │
                         ▼
                    Spring AI
                         │
                         ▼
                       LLM
                         │
                     SSE Stream
                         │
                         ▼
                  Next.js Frontend
                         │
                         ▼
                 Grounded Answer
                   + Citations
```

---

## 📁 Repository Structure

```text
app/           # Next.js App Router routes and layouts
components/    # Reusable UI and feature components
hooks/         # Custom React hooks
lib/           # API client and shared utilities
public/        # Static assets
types/         # Shared TypeScript types
```

---

## 🧠 Engineering Decisions

### Centralized API abstraction

Instead of making HTTP calls directly inside components, backend communication is centralized in `lib/api.ts`.

This provides:

- typed API functions
- centralized error handling
- consistent authentication configuration
- easier backend endpoint changes

---

### Server-state management with React Query

Repository, session, and user data are server state, so TanStack Query handles caching, stale state, retries, and refetch behavior.

---

### Streaming instead of request/response chat

LLM generation can take time.

Rather than waiting for the complete response:

```text
Request → wait → complete answer
```

RepoPilot uses:

```text
Request
   ↓
Token
   ↓
Token
   ↓
Token
   ↓
Citations
   ↓
Done
```

This makes the chat interface feel significantly more responsive.

---

### Backend-driven grounding

The frontend does not attempt to determine whether an AI citation is valid.

The backend:

```text
Retrieve
   ↓
Generate
   ↓
Validate citations
   ↓
Send validated citations
```

The frontend focuses on presenting that grounded information clearly.

---

## 🔗 Related Repository

### Backend

[RepoPilot Backend](https://github.com/utkarsh-2033/RepoPilot)

---

## ⭐ RepoPilot

**Understand your codebase through the code itself.**

```text
Connect GitHub
      ↓
Index Repository
      ↓
Retrieve Relevant Code
      ↓
Ask Questions
      ↓
Stream AI Response
      ↓
Show Grounded Citations
```

RepoPilot combines a modern **Next.js frontend** with a **Spring Boot + Spring AI backend** to turn GitHub repositories into conversational, searchable codebases.
