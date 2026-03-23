# 🚀 AI Tooling Framework

This repository provides a set of **functions and utilities** for building intelligent assistants that can generate images, search the web, manage memory, and interact with browser content. It also includes support for running multiple tools in parallel.

---

## 📖 Overview

The framework is designed to:
- Provide **modular tools** for AI-driven tasks.
- Support **parallel execution** of multiple tools.
- Enable **memory persistence** for user preferences and facts.
- Integrate with **browser history and page content** for contextual assistance.
- Allow **skill loading** for specialized domains (quiz generation, studying, travel booking, etc.).

---

## ✨ Features

### 🔹 Image Generation
- Create new images from text prompts.
- Edit existing images with overlays or text.
- Optionally generate **transparent backgrounds** for assets.

### 🔹 Web Search
- Perform **fresh, authoritative searches** for any query.
- Always grounded in real-time information.
- Optimized queries for concise and relevant results.

### 🔹 Memory Management
- **Durable memory**: Store user preferences, facts, and context for future conversations.
- **Force delete memory**: Remove stored facts permanently when requested.

### 🔹 Browser Integration
- Search **recently closed tabs** and **history** by keywords.
- Retrieve **page content** from open tabs.
- Classify queries by category for better contextual responses.

### 🔹 Skill Loading
- Dynamically load skills by category:
  - Quiz generation
  - Flashcards
  - Studying assistance
  - Travel booking
  - Movie/TV recommendations
  - Code execution (math, data analysis, file conversion)

### 🔹 Multi-Tool Execution
- Run multiple tools **in parallel** for efficiency.
- Useful for combined tasks (e.g., search + memory update).

---

## 🛠️ Tool Definitions

| Tool | Purpose | Key Parameters |
|------|----------|----------------|
| `graphic_art` | Generate or edit images | `prompt`, `progression_text`, `transparent_background` |
| `search_web` | Perform real-time web searches | `query`, `answers` |
| `memory_durable_fact` | Store facts/preferences | `fact`, `category`, `category_value` |
| `memory_force_delete_durable_fact` | Delete stored facts | `fact_to_delete`, `category` |
| `browser_search` | Search history/tabs | `queries`, `time_range_start/end`, `states` |
| `edge_get_page_content` | Retrieve tab content | `fetch_all_tabs`, `tab_ids`, `category` |
| `load_skills` | Load specialized skills | `categories`, `goals`, `skill_names` |
| `multi_tool_use.parallel` | Run tools simultaneously | `tool_uses` |

---

## 📂 Example Usage

### 1. Generate an Image
```json
{
  "recipient_name": "graphic_art",
  "parameters": {
    "prompt": "Futuristic city skyline",
    "progression_text": "Designing a neon-lit metropolis...",
    "transparent_background": false
  }
}
```

### 2. Search the Web
```json
{
  "recipient_name": "search_web",
  "parameters": {
    "query": "latest AI conferences 2026",
    "answers": null
  }
}
```

### 3. Store a Memory
```json
{
  "recipient_name": "memory_durable_fact",
  "parameters": {
    "fact": "User prefers dark mode themes",
    "category": "Preference",
    "category_value": "Dark Mode"
  }
}
```

### 4. Run Multiple Tools in Parallel
```json
{
  "recipient_name": "multi_tool_use.parallel",
  "parameters": {
    "tool_uses": [
      {
        "recipient_name": "search_web",
        "parameters": { "query": "best vegan restaurants NYC" }
      },
      {
        "recipient_name": "memory_durable_fact",
        "parameters": { "fact": "User is vegan" }
      }
    ]
  }
}
```

---

## 📌 Roadmap

- [ ] Add support for **video generation**.
- [ ] Expand skill categories (e.g., finance, health, productivity).
- [ ] Improve **parallel execution** with error handling.
- [ ] Provide **SDKs** for Python and JavaScript integration.
- [ ] Add **unit tests** for each tool.

---

## 🤝 Contributing

Pull requests are welcome! Please ensure:
- Code is well-documented.
- Features are tested.
- README is updated with new functionality.

