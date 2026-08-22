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

## Date

2026-07-21

## Today's Work

- Refactored the LLM prompt architecture by separating system prompts and user prompts into a dedicated `prompts/` package.
- Created a reusable `QUESTION_SYSTEM_PROMPT` for question generation.
- Updated `generator.py` to load prompts from external prompt files instead of embedding prompts directly in code.
- Implemented the `generate_questions()` method in `generator.py`.
- Designed and implemented `QuestionValidator` to validate LLM-generated questions before storing them.
- Finalized the question generation pipeline architecture where Python attaches the `chunk_index` instead of relying on the LLM.
- Reviewed the complete RAG data flow from document splitting through question generation and clarified how chunk metadata will be used during answer evaluation.
- Designed the retrieval strategy for the Answer Evaluation Pipeline using both `session_id` and `chunk_index` to uniquely retrieve the correct source chunk.

## Lessons Learned

- JSON arrays returned by an LLM become Python lists after using `json.loads()`.
- Validation should be separated from generation to follow the Single Responsibility Principle.
- Prompt engineering becomes easier to maintain when prompts are stored outside application logic.
- The LLM should only generate educational content while Python is responsible for attaching application-specific metadata such as `chunk_index`.
- `session_id` and `chunk_index` together uniquely identify the correct source chunk for retrieval during answer evaluation.
 
---

## 23 July 2026

### API and Backend Design

Refined backend architecture and continued documenting data flow before implementation.

### Decisions Made

- Planned controller inputs and outputs before writing implementation.

- Designed service functions based on business logic rather than frontend requirements.

- Continued separating validation, business logic and persistence layers.

### Engineering Notes

Planning request flow before implementation reduced unnecessary refactoring and made function responsibilities much clearer.

---

## 27 July 2026

### Question Generation Pipeline Improvements

Focused on improving the quality of generated quiz questions rather than simply increasing generation speed.

### Decisions Made

- Updated the LLM prompt to prioritize conceptual understanding instead of direct memorization.

- Added explicit instructions for:
  - Educational content only
  - Difficulty classification
  - Topic generation
  - Empty JSON output for administrative chunks

- Began filtering administrative chunks before question generation to avoid wasting LLM calls.

### Engineering Notes

Filtering irrelevant chunks before generation reduced unnecessary inference cost while improving overall question quality.

---

## 28 July 2026

### Question Generation Coverage

Focused on improving question coverage across uploaded documents.

### Decisions Made

- Introduced random chunk selection before generation to avoid repeatedly generating questions from similar document sections.

- Added configurable question generation per chunk based on document size:
  - Small documents → more questions per chunk
  - Medium documents → two questions per chunk
  - Large documents → one question per chunk

- Decided that quiz coverage should prioritize exposing learners to different document sections rather than generating many questions from the same chunk.

### Engineering Notes

Balancing question generation against document size produces better document coverage while controlling LLM usage.

---

## 29 July 2026

### Pipeline Reliability and Production Readiness

Improved the orchestration logic of the Question Generation Pipeline.

### Decisions Made

- Replaced the original generation loop with a controlled loop that:
  - Randomizes chunk order
  - Stops once the target number of questions has been reached
  - Avoids unnecessary LLM calls after the target has been satisfied

- Introduced a separate `selected_documents` list to preserve the original filtered document collection while safely removing processed chunks during generation.

- Investigated environment issues involving FastAPI, Uvicorn and virtual environments to ensure the correct Python interpreter and package installations were being used.

### Engineering Notes

Separating document selection from the original dataset improved maintainability and made future generation strategies easier to implement.

Debugging virtual environment inconsistencies reinforced the importance of verifying interpreter paths, installed packages and execution environments before investigating application code.

---
# Engineering Journal

## Date
1 August 2026

## Summary

Focused on implementing the Question Retrieval flow and designing the data flow between the Questions, Answers, Feedback and AI modules.

### Work Completed

- Implemented the Questions page layout using Material UI.
- Created a custom React hook responsible for fetching questions using the session ID.
- Implemented dynamic routing using `useParams()` to retrieve the current session.
- Connected the frontend to the backend endpoint for retrieving session questions.
- Debugged API routing and identified an HTTP method mismatch (`POST` vs `GET`) when fetching questions.
- Rendered questions dynamically from database data using `Array.map()`.
- Fixed React list rendering by using unique keys for each question.
- Designed the frontend answer collection strategy before implementing submission.
- Planned the payload structure that will be sent to the backend after the quiz is completed.
- Designed the relationship between Questions, Answers and Feedback modules before implementation.

### Key Learnings

- React list rendering requires the top-level element returned by `map()` to have a unique `key`.
- Fetching existing resources should use the HTTP GET method instead of POST.
- Separating immutable data (questions) from mutable user input (answers) results in cleaner state management.
- Creating payloads only at submission time keeps frontend state simple and reduces unnecessary transformations.
- Using a dedicated custom hook keeps data fetching logic separate from presentation components.

# Engineering Journal

**Date:** 03 August 2026

---

## Objective

Complete the Questions page, implement the answer submission flow, and design the Answer Evaluation pipeline.

---

## Work Completed

### Frontend

- Completed the Practice Quiz page UI using Material UI.
- Redesigned the page into a card-based layout with improved spacing and typography.
- Added dynamic rendering of questions using the fetched session questions.
- Implemented answer state management where each answer is mapped to its corresponding question ID.
- Built the payload that will be submitted to the backend.

```json
{
    "sessionId": "...",
    "answers": [
        {
            "questionId": "...",
            "userAnswer": "..."
        }
    ]
}
```

---

### Backend

Implemented the complete answer submission flow.

Current flow:

```
Frontend
        ↓
Answers Controller
        ↓
Answers Service
        ↓
Answers Model
        ↓
Save answers into Answers table
        ↓
Retrieve Question Context
        ↓
Build evaluation payload
        ↓
AI Service
```

The Answers Service now:

- Saves each user answer.
- Retrieves the corresponding question information.
- Retrieves the reference answer.
- Retrieves the chunk index.
- Enriches every saved answer with the retrieved information.
- Builds the payload that will be forwarded to the AI Service.

Example payload:

```json
{
    "session_id": 28,
    "answers": [
        {
            "answer_id": 1,
            "question": "...",
            "reference_answer": "...",
            "chunk_index": 4,
            "user_answer": "..."
        }
    ]
}
```

---

## AI Evaluation Pipeline Design

Designed the Answer Evaluation pipeline.

Current architecture:

```
Node

↓

AI Service

↓

Python

↓

Pipeline

↓

Retriever

↓

Generator

↓

Validator

↓

Return Feedback
```

Pipeline responsibilities:

- Loop through every answer.
- Retrieve the original chunk using the stored chunk index.
- Send only the required information to the LLM.
- Merge AI output with application metadata.
- Return a structured feedback payload to Node.

---

## Challenges

- Determining which information should be sent to the LLM.
- Separating application metadata from evaluation data.
- Designing a clean architecture for the evaluation pipeline.

---

## Solutions

- Removed Answer IDs and Session IDs from the LLM input.
- Kept metadata management inside the pipeline.
- Designed Retriever, Generator and Validator as independent modules with single responsibilities.

---

## Next Steps

- Implement `retriever.py`.
- Implement `generator.py`.
- Implement `validator.py`.
- Complete the evaluation pipeline.
- Save evaluation results into the Feedback table.

# Engineering Journal

## Date
2026-08-04

## Objective

Continue building the Answer Evaluation Pipeline responsible for evaluating learner responses after they have completed a quiz.

---

## Work Completed

### Completed the Evaluation Generator

Implemented a dedicated `EvaluationGenerator` class by extending the shared `Generator` class used in the Question Generation Pipeline.

This allowed reuse of:

- Groq client initialization
- LLM communication logic
- JSON parsing
- Error handling

while introducing a separate evaluation-specific method.

---

### Refactored LLM Communication

Refactored the original generator to make `_call_llm()` reusable.

Instead of hardcoding the Question Generation system prompt inside the base Generator class, the system prompt is now passed as a parameter.

This allows multiple pipelines to share the same LLM communication layer while using different prompts.

---

### Designed Evaluation Prompt

Created a dedicated evaluation prompt capable of:

- Comparing the student's answer with the reference answer.
- Validating the answer using retrieved context.
- Returning educational feedback.
- Returning the concept tested.
- Returning a boolean correctness flag.

The prompt was refined to encourage evidence-based feedback instead of simply marking answers as correct or incorrect.

---

### Built Feedback Validator

Implemented validation rules to ensure every LLM response contains:

- is_correct
- concept
- feedback

This protects downstream services from malformed model outputs.

---

### Built Evaluation Pipeline

Designed the overall evaluation pipeline consisting of:

Student Answers
        ↓
Retriever
        ↓
Generator
        ↓
Validator
        ↓
Formatted Feedback Response

The pipeline processes each learner answer individually while preserving the answer_id for later storage.

---

## Lessons Learned

Separating responsibilities across Generator, Validator and Pipeline makes the system easier to maintain.

Reusing the base Generator avoids duplicate Groq integration code while still allowing different prompts for different AI tasks.

Prompt quality has a major impact on the educational usefulness of generated feedback.

# Engineering Journal

## Date
2026-08-05

## Objective

Migrate the retrieval layer from FAISS to PostgreSQL with pgvector to create a persistent vector store shared across both the Question Generation and Answer Evaluation pipelines.

---

## Work Completed

### Installed pgvector

Installed the PostgreSQL pgvector extension and enabled vector support inside the project database.

Verified that the extension was successfully available for use.

---

### Designed Chunk Storage

Created a new database table responsible for storing document chunks.

Each stored record contains:

- session_id
- chunk_index
- text
- embedding (vector)

This replaces the temporary FAISS-based storage previously used during runtime.

---

### Created Database Layer

Added a dedicated database module responsible for:

- Saving a single chunk.
- Saving all chunks generated during document ingestion.
- Retrieving chunks using session_id and chunk_index.

Separating database logic from the retrieval pipeline keeps persistence independent from AI logic.

---

### Refactored Retrieval Architecture

Began removing FAISS dependencies from the retrieval pipeline.

Instead of retrieving vectors from an in-memory index, the system now retrieves the original document chunk directly from PostgreSQL using:

(session_id, chunk_index)

This better matches the Answer Evaluation workflow where the relevant chunk is already known.

---

### Began Integration

Updated the Question Generation pipeline to persist embeddings and chunks immediately after embedding generation.

Updated the Evaluation Retriever to use PostgreSQL instead of FAISS.

---

### Debugging

Encountered multiple integration issues during migration including:

- Tensor serialization errors when inserting embeddings into PostgreSQL.
- Request validation issues between Express and FastAPI.
- Payload structure mismatches.
- Evaluation endpoint request debugging.

Although the migration is largely complete, final debugging remains before end-to-end evaluation testing.

---

## Lessons Learned

Using PostgreSQL as the source of truth simplifies the overall architecture.

Unlike FAISS, pgvector provides:

- persistent storage
- shared access across services
- simpler retrieval for known chunk references

The migration also highlighted the importance of clearly separating persistence, retrieval and AI inference responsibilities.

# Engineering Journal

## Date

2026-08-10

## Objective

Complete the Feedback page and implement the backend data flow required to retrieve and display evaluation feedback for a completed quiz session.

---

## Work Completed

### Feedback Page

- Designed the Feedback page layout using React and Material UI.
- Created a vertical card-based layout for displaying feedback for each question.
- Designed each feedback card to display:
  - Question
  - User answer
  - Feedback
  - Correctness status
  - Retrieved context
  - Concept tested
- Added an end-of-review button to allow the learner to return to the starter page.
- Implemented the Feedback page in `Feedback.jsx`.

### Frontend Data Fetching

- Created a custom React hook for fetching feedback data.
- Used the session ID to request feedback belonging to the current quiz session.
- Connected the Feedback page to the backend feedback endpoint.
- Used the fetched data to dynamically render each feedback item.

### Backend Feedback Retrieval

- Implemented backend logic for retrieving feedback associated with a specific session.
- Used the session ID to identify the learner's completed quiz attempt.
- Implemented a SQL `JOIN` to combine information from the Feedback, Answers, and Questions tables.
- Used the answer ID stored in the Feedback table to locate the corresponding answer.
- Used the question ID associated with the answer to retrieve the original question text.
- Returned the combined information required by the Feedback page.

### Data Flow

The implemented feedback retrieval flow is:

```text
Feedback Page
      ↓
Custom Feedback Hook
      ↓
Backend Feedback Endpoint
      ↓
Feedback Service
      ↓
Feedback Model
      ↓
SQL JOIN
      ↓
Feedback + Answers + Questions
      ↓
Feedback Page

# Engineering Journal

## Date

23 August 2026

---

## Objective

Continue building the completed-session experience by allowing learners to review previous study sessions, including their questions, answers, feedback, reference answers, concepts and uploaded document information.

---

## Work Completed

### Session History Page

- Continued implementing the Sessions page for displaying previous study attempts.
- Displayed the user's previous sessions in a Material UI interface.
- Included session-level information such as:
  - Session number
  - Score
  - Time taken
  - View Details action
- Preserved the session ID when retrieving the session list so that each session can be used to retrieve its associated historical data.

---

### Session Details Interface

Designed the Session Details experience using a full-screen Material UI Dialog.

The planned dialog displays:

- Session title
- Uploaded file name
- Questions
- User answers
- Reference answers
- AI feedback
- Correctness
- Concepts tested

The View Details button is responsible for opening the dialog and retrieving information for the specific session selected by the learner.

---

### Session Detail Data Flow

Designed the data flow for retrieving historical session information:

```text
Sessions Page
      ↓
User clicks View Details
      ↓
Selected Session ID
      ↓
Frontend API Request
      ↓
Backend Session Details Endpoint
      ↓
Verify Session/User Ownership
      ↓
Database Queries
      ↓
Questions + Answers + Feedback + Document
      ↓
Frontend Dialog