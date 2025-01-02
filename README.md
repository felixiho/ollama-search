# Ollama Search

Open-source AI-powered search engine based off [Ollama](https://ollama.ai/) models.

## Features

- 🔍 Generate search queries with langchain
- 💾 Search with [Tavily](https://tavily.com/)
- 🚀 Answer questions with local installed ollama models (llama3, mistral, gemma)
- 🎨 Clean and intuitive user interface

## Getting Started

### Prerequisites

- Ollama installed and running locally
- Node.js (version 18 or higher)
- [Tavily](https://tavily.com/) API key

### Installation

```bash
git clone https://github.com/felixiho/ollama-search
cd ollama-search
pnpm install
cp .env.example .env.local
```

### Usage

Update your .env with the tavily api key

Start application:

```bash
pnpm dev
```

## Roadmap

- [x] Implement search functionality via Tavily
- [x] Support local LLMs via Ollama
- [x] Add support for chat history
- [x] Multiple model support
- [ ] Add support for Google search
- [ ] Add support for research mode via PDF search
- [ ] Add image search support
- [ ] Add support for cloud models
- [ ] Add support docker

## Contributing

We welcome contributions! Please feel free to submit pull requests, create issues, or suggest new features.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
