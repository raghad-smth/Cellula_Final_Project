# KAIRO

**KAIRO** is a **context-aware intelligent agent** designed to deliver highly accurate, contextually relevant responses by leveraging multiple reasoning and retrieval tools in real-time.
The name **KAIRO** originates from the Greek word *“καιρός”*, meaning *the right or opportune moment* — a reflection of the agent’s ability to remain aware of context and respond appropriately based on the information it receives.
<img width="1889" height="824" alt="image" src="https://github.com/user-attachments/assets/b27240bd-b2d1-4cc5-99db-cdd29da74746" />

---

## 🔷Overview

KAIRO is built to go beyond simple query answering.
When a user submits a query, the system dynamically analyzes the context, determines what is missing, searches for relevant information, and ensures the final response aligns with the user’s intent.

In simpler terms, KAIRO acts as an intelligent assistant that understands **what you mean**, not just **what you say** — providing high-quality, contextually aware answers.

---

## 🔷Technologies Used

KAIRO combines multiple advanced tools and frameworks to achieve reliable performance and modularity.

### 🔷**Core Technologies**

* **LangChain** – For building, chaining, and managing tool logic.
* **LangSmith** – For debugging and tracing each tool’s performance.
* **FastAPI** – Backend framework used for deploying the main API.
* **React (via v0)** – Used to build the front-end interface for user interaction.
* **OpenRouter (GPT-4-mini)** – The primary large language model used for reasoning and response generation.
* **Tavily API** – Handles live web search functionality within the agent.

---

## 🔷 Architecture Overview

KAIRO operates through a modular tool-based architecture.
Each tool is responsible for a specific step in the reasoning process. All tools are located inside the `tools/` directory, and each tool has its own custom prompt defined inside the `prompts/` directory.

### 🔷 **Toolchain Summary**

1. **Conscious Presence Judge** – Determines whether the current context is sufficient or if additional information is needed.
2. **Web Search Tool (Tavily)** – Performs live internet searches to gather external data when required.
3. **Memory Tool** – Manages short- and long-term contextual memory for the agent.
4. **Relevance Checker** – Performs a “sanity check” to ensure the final output matches the intent and context of the input query.

The main agent orchestrating these tools can be found in the `agent/` directory.

The front-end implementation (React-based interface) is stored under the `frontend/` directory.

---

## 🔷 Directory Structure

```

│
├── agent/                # Core agent logic
├── tools/                # All implemented tools
├── prompts/          # Prompts associated with each tool
│
├── frontend/             # Front-end interface (React)
├── requirements.txt      # Library versions and dependencies
└── main.py               # Backend entry point (FastAPI)
```

## Setup and Installation

Before running KAIRO, ensure all dependencies are installed using the provided `requirements.txt` file.
This file contains the compatible versions for all required libraries, including LangChain, LangGraph, and others.

```bash
pip install -r requirements.txt
```

---

## 🔷 Running the Project Locally

Currently, KAIRO is set up to run locally. To launch the full application with both backend and frontend:

### **1. Run the Backend**

```bash
uvicorn main:app --reload
```

### **2. Run the Frontend**

In a separate terminal:

```bash
cd front-end
npm run dev
```

Once both are running, you can access the web interface locally and interact with KAIRO.
If you’ve set up your **LangSmith API key**, you’ll also be able to monitor each tool’s behavior and execution trace in real time.

---
