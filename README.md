# 🧪 Dev Lab (Experimental Workspace)

This repository is a polyglot laboratory designed for experiments, proof-of-concept (PoC) explorations, and testbeds across different programming languages and technologies.

---

## 📁 Repository Structure

```text
lab/
├── .gitignore          # Global gitignore covering all supported technologies
├── README.md           # Main laboratory documentation
│
├── react-lab/          # Pure React 18 (Vite) experimental workspace
│   ├── .gitignore
│   ├── README.md
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── table-row-dialog/  # Table row triggered dialog form (Stack Overflow #80000947)
│       ├── App.jsx
│       └── ...
│
├── spring-lab/         # Pure Java Spring Boot 3 (Maven) experimental workspace
│   ├── .gitignore
│   ├── README.md
│   ├── pom.xml
│   └── src/
│
├── rust-lab/           # (Reserved for future Rust experiments)
└── go-lab/             # (Reserved for future Go experiments)
```

---

## 🚀 Quick Start

### 1. React Lab (`react-lab`)
A lightweight and modern Vite-based React environment.

```bash
cd react-lab
npm install
npm run dev
```
The application runs by default at `http://localhost:5173`.

#### Included Experiments & Prototypes:
- **Table Row Dialog Form (`src/table-row-dialog/`)**: A solution demonstrating how to trigger an accessible modal form pre-populated with a table row's data upon click without losing background table state or navigating away.

---

### 2. Spring Lab (`spring-lab`)
A clean Java 17/21 and Spring Boot 3 REST API infrastructure.

```bash
cd spring-lab
mvn spring-boot:run
```
The application runs by default at `http://localhost:8080`.
- Health check endpoint: `GET http://localhost:8080/api/hello`

---

## 🛠️ Adding New Labs in the Future
- **For Rust:** `cargo new rust-lab`
- **For Go:** `mkdir go-lab && cd go-lab && go mod init lab/go-lab`
- The root `.gitignore` is already pre-configured for Rust and Go.
