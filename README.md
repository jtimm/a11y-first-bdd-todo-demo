# Accessibility-First BDD ToDo Demo  
*A demo of robust, readable end-to-end testing with Playwright, BDD, and accessibility-first UI design.*

---

## ✨ Overview

This project demonstrates how to build **reliable and maintainable end-to-end tests** by combining:

- **Accessibility-first design** → UI elements are discoverable by semantic roles and names.  
- **Behavior-Driven Development (BDD)** → features written in Gherkin double as executable documentation.  
- **Playwright** → fast, modern browser automation with first-class accessibility locators.  
- **Fluent synchronization (“suffix waits”)** → natural-language waits that keep tests stable and expressive.  

The app itself is a simple **ToDo list** with in-memory state, but the true focus is the **test strategy**.

---

## 🔑 Key Concepts

### Accessibility-First
- Elements are located using **roles** and **accessible names**, not brittle selectors.  
- Native HTML semantics come first; ARIA is minimal and purposeful.  

### Behavior-Driven Development
- Features defined in **Gherkin (`.feature` files)**.  
- Shared, **generic step definitions** keep tests clean and scalable.  
- Encourages collaboration across technical and non-technical stakeholders.  

### Fluent Synchronization
- Steps can end with suffixes like:  
  - `...and wait for the spinner to disappear`  
  - `...and wait for the "todo:created" event`  
- These map to **Playwright wait conditions**, eliminating flakiness from arbitrary `setTimeout`-style delays.  

### Clean Architecture
- `a11y.ts` → semantic, accessibility-aware locators.  
- `waiters.ts` → reusable wait strategies.  
- Shared steps + modular utilities make the test suite extensible.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Run the BDD test suite
npm test
```

---

## ✅ Why It Matters

| Common E2E Problem             | Solution in This Demo                                      |
|--------------------------------|------------------------------------------------------------|
| Flaky tests from poor waiting   | Fluent natural-language suffix waits                       |
| Brittle selectors               | Semantic locators (`role`, `name`)                         |
| Tests detached from requirements| Gherkin features as executable documentation               |
| Hard-to-scale step definitions  | Shared, generic step library + modular utilities           |

---

## 📚 Use Cases

This repo can be used to:  
- Teach **accessibility-driven test design**.  
- Showcase **Playwright + `playwright-bdd`** integration.  
- Provide a reference architecture for **scalable step definitions**.  

---

## ⚖️ License

MIT — free to fork, adapt, and reuse.  
