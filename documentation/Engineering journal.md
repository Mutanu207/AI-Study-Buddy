## Date

## 2026-07-03

Today's Work

• Built Loader.

• Built Cleaner.

• Established FastAPI communication.

Lessons Learned

• Why context managers are preferred.

• Why logging replaces print.

• Difference between raw text and cleaned text.

Engineering Decisions

• PyMuPDF selected.

• Images postponed until Version 2.

# Engineering Journal

---

# Date

2026-07-04

## Today's Work

- Planned the overall RAG architecture.
- Defined the project folder structure.
- Designed the complete document processing flow.
- Established the engineering documentation strategy.

## Lessons Learned

- Good architecture should be designed before implementation.
- Documentation should evolve alongside the codebase.

## Engineering Decisions

- Separate the RAG pipeline into small, reusable modules.
- Treat documentation as part of the engineering process.

---

# Date

2026-07-05

## Today's Work

- Implemented `splitter.py`.
- Used `RecursiveCharacterTextSplitter`.
- Added overlapping chunking.
- Attached metadata to every chunk using LangChain `Document`.

## Lessons Learned

- Chunk overlap preserves semantic context.
- Metadata becomes critical during retrieval.
- LangChain `Document` objects provide a standard structure for RAG pipelines.

## Engineering Decisions

- Standardized on LangChain `Document` objects.
- Selected RecursiveCharacterTextSplitter over fixed-size chunking.

---

# Date

2026-07-06

## Today's Work

- Built `embeddings.py`.
- Implemented the EmbeddingManager class.
- Loaded SentenceTransformer locally.
- Generated embeddings from document chunks.

## Lessons Learned

- Embedding models generate vectors but do not store them.
- Loading the model once greatly improves performance.

## Engineering Decisions

- Selected SentenceTransformers (`all-MiniLM-L6-v2`).
- Run embeddings locally instead of using an external API.
- Encapsulated the model inside a reusable class.

---

# Date

2026-07-07

## Today's Work

- Centralized configuration into `config.py`.
- Replaced hardcoded values with configuration variables.
- Standardized project constants.

## Lessons Learned

- Configuration files simplify maintenance.
- Centralized constants improve scalability.

## Engineering Decisions

- Store AI configuration separately from implementation code.

---

# Date

2026-07-08

## Today's Work

- Designed vector storage architecture.
- Compared FAISS and PostgreSQL + pgvector.
- Planned production migration strategy.

## Lessons Learned

- Embeddings and vector databases serve different purposes.
- FAISS is excellent for development and MVPs.

## Engineering Decisions

- Use FAISS during MVP development.
- Migrate to PostgreSQL + pgvector before production deployment.

---

# Date

2026-07-09

## Today's Work

- Redesigned the overall RAG architecture.
- Split the project into Question Generation and Answer Evaluation pipelines.
- Updated system architecture documentation.

## Lessons Learned

- Separating pipelines reduces coupling.
- Question generation and evaluation solve different problems.

## Engineering Decisions

- Generate questions only once.
- Store generated answers for future evaluation.
- Perform retrieval only during answer evaluation.

---

# Date

2026-07-10

## Today's Work

- Designed answer evaluation flow.
- Planned feedback generation architecture.
- Designed retrieval integration for explanations.

## Lessons Learned

- Retrieval is primarily needed during evaluation.
- Context improves explanation quality more than answer correctness.

## Engineering Decisions

- Pass retrieved context together with the question and reference answer to the LLM.
- Include page references inside generated feedback.

---

# Date

2026-07-11

## Today's Work

- Redesigned Sessions architecture.
- Planned relationships between Sessions, Questions, Answers and Feedback.
- Designed future dashboard data flow.

## Lessons Learned

- Sessions naturally group an entire study attempt.
- Avoid duplicating User IDs across every table.

## Engineering Decisions

- Session becomes the central entity.
- Questions, Answers and Feedback reference Session IDs.

---

# Date

2026-07-12

## Today's Work

- Designed answer submission flow.
- Planned evaluation request payload.
- Planned feedback response structure.

## Lessons Learned

- Stable identifiers should never depend on the LLM.
- Backend identifiers should remain outside the prompt.

## Engineering Decisions

- Keep Question IDs inside the backend.
- Map evaluation results back using backend-controlled identifiers.

---

# Date

2026-07-13

## Today's Work

- Updated GitHub README.
- Added architecture documentation.
- Added engineering documentation.
- Organized repository documentation.

## Lessons Learned

- A project README communicates engineering thinking.
- Documentation is part of software quality.

## Engineering Decisions

- Maintain Engineering Journal separately from Engineering Decisions.
- Keep architecture documentation versioned.

---

# Date

2026-07-14

## Today's Work

- Reviewed deployment strategy.
- Planned migration from local uploads to Amazon S3.
- Planned migration from FAISS to PostgreSQL + pgvector.
- Finalized MVP completion roadmap.

## Lessons Learned

- Finish functionality before optimizing infrastructure.
- Production architecture can evolve independently from MVP architecture.

## Engineering Decisions

- Complete MVP using local uploads and FAISS.
- Perform infrastructure migration during deployment preparation.

---

# Date

2026-07-15

## Today's Work

- Refactored vector storage design.
- Improved separation between embedding generation and vector storage.
- Deepened understanding of Python classes and constructors.
- Reviewed complete RAG data flow from Loader to Retriever.
- Finalized Session-centered database relationships.

## Lessons Learned

- Embedding models generate vectors; vector databases only store them.
- Single Responsibility Principle produces cleaner architectures.
- Python classes encapsulate reusable state and behavior.

## Engineering Decisions

- EmbeddingManager is responsible only for generating vectors.
- VectorStoreManager is responsible only for storing vectors.
- Retrieval will consume stored vectors without regenerating embeddings.