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

## External Prompt Management

### Decision

Store all LLM prompts inside a dedicated `prompts/` package instead of embedding prompts directly inside Python classes.

### Rationale

- Separates prompt engineering from application logic.
- Makes prompts easier to update and version control.
- Improves readability of generator classes.
- Simplifies future prompt experimentation and evaluation.

---

## Python Controls Retrieval Metadata

### Decision

Assign `chunk_index` in Python after question generation instead of asking the LLM to return it.

### Rationale

- Eliminates the possibility of the LLM hallucinating incorrect chunk references.
- Keeps retrieval metadata deterministic.
- Ensures every generated question references the exact document chunk that produced it.

---

## Dedicated Validation Layer

### Decision

Validate all LLM-generated questions before storing them in the database using a dedicated validator component.

### Rationale

- Prevents malformed AI responses from entering the database.
- Separates validation from generation following the Single Responsibility Principle.
- Allows future validation rules to be added without modifying generator logic.

---

## Retrieval Using Session ID and Chunk Index

### Decision

Retrieve supporting context during answer evaluation using both `session_id` and `chunk_index`.

### Rationale

- Chunk indexes are only unique within a single uploaded document.
- Session IDs uniquely identify each uploaded PDF.
- Combining both guarantees retrieval from the correct document and prevents collisions between different study sessions.

### Chunk Filtering Before Question Generation
### Decision

Filter document chunks that contain administrative or non-educational content before sending them to the LLM.

### Rationale
Reduces unnecessary LLM calls.
Prevents generating questions from irrelevant sections such as references or course metadata.
Improves overall question quality.
Lowers inference cost.

### Adaptive Question Generation
### Decision

Generate a variable number of questions per chunk depending on the number of educational chunks extracted from the uploaded document.

### Rationale
Small documents require more questions per chunk to achieve reasonable quiz coverage.
Large documents require fewer questions per chunk to maximize topic diversity.
Prevents over-representing a single chunk while still targeting a fixed quiz size.
Randomized Chunk Selection
Decision

### Shuffle educational chunks before question generation.

### Rationale
Prevents the quiz from always covering only the beginning of a document.
Improves coverage across different topics.
Produces more varied quizzes between study sessions.
Python Controls Quiz Size
Decision

### Allow Python, rather than the LLM, to determine when sufficient questions have been generated.

### Rationale
Keeps quiz size deterministic.
Prevents unnecessary LLM calls once the target number of questions has been reached.
Separates generation logic from orchestration logic.
Educational-Only Prompt Strategy
Decision

### Explicitly instruct the LLM to ignore administrative content and return an empty JSON array when a chunk cannot produce meaningful educational questions.

### Rationale
Reduces hallucinated questions.
Prevents low-quality outputs.
Allows Python to safely skip unsuitable chunks.

# Engineering Decisions

## Question Retrieval Architecture

Questions are generated once during session creation by the AI pipeline and stored in PostgreSQL.

The Questions page never communicates directly with the AI service.

Instead, it retrieves saved questions from the backend using the current session ID.

Flow:

Starter Page
→ Upload PDF
→ Create Session
→ Python AI Service
→ Generate Questions
→ Save Questions
→ Questions Page
→ Fetch Questions from Database

This avoids repeated AI calls and makes question retrieval deterministic.

---

## State Separation

Questions and Answers are intentionally stored separately.

Questions:

- Retrieved from PostgreSQL
- Read-only
- Never modified by the frontend

Answers:

- User generated
- Mutable
- Updated as the user types

This separation keeps frontend state predictable and simplifies submission.

---

## Answer Payload Structure

Instead of updating backend state after every keystroke, answers are collected locally and transformed into the required payload only when the user ends the quiz.

Payload:

{
    sessionId,
    answers: [
        {
            questionId,
            userAnswer
        }
    ]
}

This minimizes API requests and allows validation before submission.

---

## Session Driven Retrieval

The session ID acts as the primary identifier throughout the quiz lifecycle.

It is used to:

- Retrieve questions
- Submit answers
- Generate AI feedback
- Retrieve completed feedback later

All subsequent operations are scoped to a single study session.

---

## Module Responsibilities

Questions Module

- Retrieve stored questions.

Answers Module

- Save submitted answers.
- Communicate with the AI service for evaluation.

Feedback Module

- Store AI evaluation results.
- Retrieve completed feedback for presentation.

This keeps each module responsible for one domain while allowing the Answers module to orchestrate the evaluation pipeline.
# Engineering Decisions

**Date:** 03 August 2026

---

# Decision 1

## Separate Question Generation from Answer Evaluation

### Decision

Create a dedicated `evaluation` module instead of placing answer evaluation inside the existing RAG module.

### Reason

Question Generation and Answer Evaluation solve different problems.

Question Generation pipeline:

```
PDF
        ↓
Chunking
        ↓
Embeddings
        ↓
Question Generation
        ↓
Validation
```

Answer Evaluation pipeline:

```
Student Answer
        ↓
Context Retrieval
        ↓
Answer Evaluation
        ↓
Feedback Validation
```

Separating these modules improves maintainability and allows each pipeline to evolve independently.

---

# Decision 2

## Restrict Generator Input

### Decision

Only send the following information to the LLM:

```python
{
    "question",
    "reference_answer",
    "retrieved_context",
    "user_answer"
}
```

### Reason

The LLM does not require:

- session_id
- answer_id
- chunk_index

These values are application metadata and should remain inside the evaluation pipeline.

Keeping prompts focused reduces unnecessary information and improves separation of responsibilities.

---

# Decision 3

## Pipeline Owns Metadata

### Decision

The evaluation pipeline is responsible for attaching metadata to the LLM response.

Generator returns:

```python
{
    "is_correct",
    "feedback"
}
```

Pipeline produces:

```python
{
    "answer_id",
    "is_correct",
    "feedback",
    "retrieved_context"
}
```

### Reason

The Generator should only evaluate answers.

The Pipeline is responsible for application-specific data.

---

# Decision 4

## Dedicated Feedback Table

### Decision

Store evaluation results inside a separate Feedback table.

Feedback record:

```text
feedback_id

answer_id

is_correct

feedback

retrieved_context
```

### Reason

This normalizes the database.

The Feedback table references Answers through `answer_id`, avoiding duplication while supporting session history.

---

# Decision 5

## Session ID Returned Once

### Decision

Return `session_id` only once in the final evaluation payload instead of including it inside every feedback object.

Returned payload:

```json
{
    "session_id": 28,
    "feedback": [
        {
            "answer_id": 1,
            "is_correct": true,
            "feedback": "...",
            "retrieved_context": "..."
        }
    ]
}
```

### Reason

A session contains many answers.

Repeating the same Session ID inside every feedback object introduces unnecessary duplication.

---

# Decision 6

## Separate AI Pipelines

### Decision

Create two independent AI modules.

```
ai-service/

question_generation/

evaluation/
```

### Reason

Question generation and answer evaluation have different responsibilities.

Keeping them separate improves readability, maintainability and future scalability.

Future AI capabilities such as Flashcards, Summaries and Study Plans can follow the same modular architecture.

---

# Decision 7

## Temporary In-Memory Retrieval

### Decision

Use the existing in-memory FAISS vector store during MVP development.

### Reason

The immediate objective is validating the complete end-to-end workflow:

```
Upload PDF
        ↓
Generate Questions
        ↓
Answer Questions
        ↓
Evaluate Answers
        ↓
Display Feedback
```

Persistent vector storage will be introduced during the planned migration to pgvector after the MVP has been completed and verified.