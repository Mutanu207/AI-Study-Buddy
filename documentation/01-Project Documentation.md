# AI Study Buddy - Project Documentation

> **Version:** MVP 1.0
> **Status:** In Development
> **Last Updated:** June 2026

---

## Table of Contents

1. Introduction
2. Problem Statement
3. Project Objectives
4. Project Scope
5. Features
6. Technology Stack
7. High-Level Architecture*
8. Database Overview*
9. Authentication Overview
10. AI Overview
11. Future Enhancements
12. Project Roadmap

---

# 1. Introduction
## AI Study Buddy

AI Study Buddy is an AI-powered web application designed to help students study more effectively by transforming uploaded PDF learning materials into interactive study sessions. Instead of passively reading notes, users can upload their study documents, generate AI-powered questions, answer them in real time, and receive feedback on their understanding.

The application combines modern web development with Retrieval-Augmented Generation (RAG) to provide personalized study experiences based on a student's own learning resources rather than relying solely on general-purpose AI knowledge. This allows questions to remain relevant to the uploaded material while encouraging active recall and self-assessment.

The project was developed to explore the integration of Artificial Intelligence into full-stack web applications while following modern software engineering practices. Beyond implementing AI features, the system emphasizes clean architecture, secure authentication, modular backend design, and maintainable code that can be extended as new features are introduced.

AI Study Buddy is being developed incrementally using a Minimum Viable Product (MVP) approach. The first version focuses on secure user authentication, PDF management, AI-powered question generation, and study session management. Future iterations will introduce cloud storage, analytics dashboards, enhanced AI evaluation, and scalability improvements to support a production-ready learning platform.

## Problem Statement
## 2. Problem Statement

Many students struggle to revise effectively using traditional study methods such as rereading notes or highlighting textbooks. These methods often encourage passive learning and provide little feedback on a student's actual understanding of the material.

While Large Language Models (LLMs) have made AI-assisted learning more accessible, general-purpose chatbots are not specifically designed to assess a student's comprehension of their own learning materials. They may also generate questions that are not grounded in the uploaded content, reducing the reliability of the learning experience.

This project aims to solve these challenges by developing an AI-powered study assistant that generates personalized revision questions directly from a student's uploaded PDF documents using Retrieval-Augmented Generation (RAG). The system evaluates student responses, provides detailed feedback, tracks learning progress across study sessions, and helps students identify areas requiring further revision.

## 3. Project Objectives

The objectives of the AI Study Buddy project are:

- Develop a secure full-stack web application for AI-assisted studying.
- Allow students to upload PDF learning materials.
- Generate context-aware revision questions using Retrieval-Augmented Generation (RAG).
- Evaluate student answers using an AI-powered evaluation pipeline.
- Provide detailed feedback for every answer.
- Track study progress across multiple sessions.
- Visualize learning performance through dashboards and session history.
- Build a scalable architecture that separates the AI service from the main application backend.

## 4. Project Scope

### In Scope

- User authentication
- Secure session management
- PDF upload and storage
- AI-generated questions
- AI evaluation of student answers
- Feedback generation
- Dashboard analytics
- Study session history
- Progress tracking

### Out of Scope (Version 2)

- OCR for scanned PDFs
- Image understanding inside PDFs
- Voice-based interactions
- Collaborative study sessions

## 5. Features

### Authentication

- User Registration
- User Login
- Secure Logout
- JWT Authentication
- Refresh Token Rotation

### Study Sessions

- Create study sessions
- Upload PDF learning materials
- Automatic question generation
- Session tracking

### AI Features

- Retrieval-Augmented Generation (RAG)
- Context-aware question generation
- AI answer evaluation
- Personalized feedback

### Dashboard

- Session history
- Performance analytics
- Score visualization
- Learning progress tracking

### Security

- HTTP-only Cookies
- Protected Routes
- Secure Authentication

## 6. Technology Stack

### Frontend

- React
- Material UI
- Axios
- React Router

### Backend

- Node.js
- Express.js
- PostgreSQL
- JWT Authentication

### AI Service

- Python
- FastAPI
- PyMuPDF
- Retrieval-Augmented Generation (RAG)

### Development Tools

- Git
- GitHub
- Postman
- VS Code

## 9. Authentication Overview

The application implements JWT-based authentication using short-lived access tokens and long-lived refresh tokens.

Access tokens are used to authorize protected API requests, while refresh tokens are securely stored as HTTP-only cookies and are used to obtain new access tokens when required.

Authentication includes:

- User Registration
- User Login
- Refresh Token Rotation
- Secure Logout
- Protected Backend Routes

This design improves both usability and security by allowing users to remain logged in without repeatedly entering their credentials while reducing the impact of compromised access tokens.

## 10. AI Overview

The AI component of the system is implemented as a separate FastAPI microservice.

Instead of embedding AI functionality directly inside the Express backend, the project follows a microservice architecture where the backend communicates with the AI service through HTTP requests.

The AI service is responsible for:

- Loading uploaded PDF documents.
- Cleaning extracted text.
- Splitting text into semantic chunks.
- Generating embeddings.
- Retrieving relevant context.
- Generating revision questions.
- Evaluating student answers.
- Producing personalized feedback.

Separating the AI service from the application backend improves scalability, maintainability, and allows independent development of AI functionality.

## 11. Future Enhancements

Future versions of the system will include:

- OCR support for scanned PDF documents.
- Multimodal RAG with image understanding.
- Adaptive question difficulty.
- Spaced repetition scheduling.
- AI-generated study summaries.
- Multi-language support.
- Voice-based revision.
