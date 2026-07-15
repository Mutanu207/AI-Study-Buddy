# Engineering Decisions

This document records the major architectural and technical decisions made throughout the development of the AI Study Buddy project. Each decision includes the rationale behind the choice and its expected benefits.

---

# Overall Architecture

## AI Microservice Architecture

### Decision

Separate the AI functionality from the main Express backend by implementing a dedicated FastAPI microservice.

### Rationale

- Separation of concerns.
- Independent deployment and scaling.
- Python ecosystem provides better AI tooling.
- Easier maintenance.
- Backend remains focused on application logic while the AI service focuses on inference.

---

# Backend Decisions

## Controller-Service-Model Architecture

### Decision

Adopt a Controller-Service-Model architecture.

### Rationale

- Controllers handle HTTP requests and responses.
- Services contain business logic.
- Models interact directly with the database.
- Improves maintainability and testability.

---



# Authentication Decisions

## JWT Authentication

### Decision

Use JWT access tokens with refresh tokens stored as HTTP-only cookies.

### Rationale

- Secure authentication.
- Better protection against XSS attacks.
- Supports long-lived sessions through refresh tokens.

---

## Refresh Token Rotation

### Decision

Issue a new refresh token whenever the previous refresh token is used.

### Rationale

- Reduces replay attacks.
- Improves session security.

---

# Database Decisions

## Normalized Database Design

### Decision

Separate Sessions, Questions, Answers and Feedback into individual tables.

### Rationale

- Reduces duplication.
- Improves scalability.
- Simplifies querying.
- Supports analytics and future reporting.

---

# Frontend Decisions

## Custom React Hooks

### Decision

Use reusable custom hooks for fetching user information.

### Rationale

- Prevents duplicated API logic.
- Encourages code reuse.
- Simplifies state management.

---



# AI Decisions

## Build Core RAG Components Without Frameworks

### Decision

Implement Loader, Cleaner, Splitter and Retrieval components manually before introducing AI frameworks.

### Rationale

- Builds a deeper understanding of RAG internals.
- Reduces unnecessary abstraction.
- Easier debugging.

---

## PyMuPDF

### Decision

Use PyMuPDF for PDF text extraction.

### Rationale

- High extraction quality.
- Fast performance.
- Widely used in production AI systems.

---

## OCR Deferred

### Decision

Support only text-based PDFs in Version 1.

### Rationale

- Keeps the MVP focused.
- OCR introduces additional complexity.
- Planned for Version 2.

---

## Image Understanding Deferred

### Decision

Postpone multimodal image processing until after the MVP.

### Rationale

- Allows completion of the core text pipeline first.
- Vision models will be integrated in a future release.

---
---

## Semantic Chunking

### Decision

Use `RecursiveCharacterTextSplitter` with overlapping chunks.

### Rationale

- Preserves semantic context across chunk boundaries.
- Improves retrieval quality.
- Produces coherent chunks for downstream generation.

---

## LangChain Document Standardization

### Decision

Represent every chunk using LangChain `Document` objects.

### Rationale

- Standardizes data across the pipeline.
- Keeps metadata attached to text.
- Simplifies future integrations.

---

## SentenceTransformer Embeddings

### Decision

Use the local SentenceTransformer model (`all-MiniLM-L6-v2`) for embedding generation.

### Rationale

- Free to run locally.
- No API dependency.
- Fast inference.
- Strong semantic retrieval performance.

---

## Embedding Generation Separation

### Decision

Separate embedding generation from vector storage.

### Rationale

- Each module has a single responsibility.
- Easier testing.
- Supports future vector database migrations.

---

## FAISS During MVP

### Decision

Use FAISS as the initial vector database.

### Rationale

- Lightweight.
- Fast local development.
- Easy debugging.
- Production migration planned later.

---

## Production Vector Database

### Decision

Migrate from FAISS to PostgreSQL with pgvector before production deployment.

### Rationale

- Persistent storage.
- Better scalability.
- Simplifies deployment.
- Centralizes application data.

---

## Session-Centered Data Model

### Decision

Use Sessions as the parent entity for Questions, Answers and Feedback.

### Rationale

- Represents one uploaded PDF and study attempt.
- Eliminates redundant User IDs.
- Simplifies analytics.
- Supports dashboard history.

---

## Two-Pipeline RAG Architecture

### Decision

Separate the application into two independent RAG pipelines.

### Pipeline 1

- PDF Processing
- Question Generation
- Reference Answer Generation

### Pipeline 2

- User Answer Evaluation
- Context Retrieval
- Feedback Generation

### Rationale

- Improves modularity.
- Avoids regenerating questions.
- Enables repeated evaluations.
- Keeps retrieval focused on explanations.

---

## Retrieval During Evaluation

### Decision

Retrieve supporting document context only during answer evaluation.

### Rationale

- Question generation already has full document context.
- Retrieval is primarily needed to generate grounded explanations and page references.
- Reduces unnecessary vector searches.

---

## Infrastructure Evolution Strategy

### Decision

Prioritize application functionality before infrastructure optimization.

### Development

- Local uploads
- FAISS

### Production

- Amazon S3
- PostgreSQL + pgvector

### Rationale

- Accelerates MVP development.
- Reduces infrastructure complexity.
- Production architecture remains scalable.