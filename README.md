# Scaler Persona Chat 🚀

A persona-based AI chatbot that lets you have real conversations with three Scaler/InterviewBit personalities — **Anshuman Singh**, **Abhimanyu Saxena**, and **Kshitij Mishra**.

Built with React + Vite, powered by Google Gemini API, deployed on Vercel.

## 🔗 Live Demo

**[→ Try it live](https://persona-chatbot.vercel.app)**

## ✨ Features

- **Three distinct AI personas** with deeply researched system prompts
- **Persona switcher** — tabs to switch between personalities (conversation resets on switch)
- **Suggestion chips** — quick-start questions tailored to each persona
- **Typing indicator** — animated dots while the AI is thinking
- **Graceful error handling** — user-friendly messages on API failures
- **Responsive design** — works on mobile and desktop
- **Dark glassmorphism UI** with persona-specific accent colors

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + Vite |
| Styling | Vanilla CSS (glassmorphism, CSS custom properties) |
| LLM | Google Gemini 2.0 Flash |
| API Proxy | Vercel Serverless Functions |
| Deployment | Vercel |

## 🚀 Local Setup

### Prerequisites
- Node.js 18+
- A Google Gemini API key ([get one here](https://aistudio.google.com/apikey))

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/persona-chatbot.git
cd persona-chatbot

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY

# 4. Start the local API server + Vite dev server
# Option A: Use Vercel CLI (recommended)
npm i -g vercel
vercel dev

# Option B: Vite only (you'll need a separate API server)
npm run dev
```

### Environment Variables

| Variable | Description |
|----------|------------|
| `GEMINI_API_KEY` | Your Google Gemini API key |

> ⚠️ Never commit your `.env` file. The `.gitignore` is already configured to exclude it.

## 📁 Project Structure

```
persona-chatbot/
├── api/
│   └── chat.js              # Vercel serverless function (Gemini proxy)
├── src/
│   ├── App.jsx               # Main app orchestrator
│   ├── App.css
│   ├── index.css              # Design system
│   ├── main.jsx
│   ├── components/
│   │   ├── PersonaSwitcher.jsx
│   │   ├── ChatWindow.jsx
│   │   ├── MessageInput.jsx
│   │   ├── SuggestionChips.jsx
│   │   └── TypingIndicator.jsx
│   └── prompts/
│       ├── anshuman.js
│       ├── abhimanyu.js
│       └── kshitij.js
├── prompts.md                 # Annotated system prompts
├── reflection.md              # 300-500 word reflection
├── .env.example
├── vercel.json
└── README.md
```

## 📝 Documentation

- **[prompts.md](./prompts.md)** — All three system prompts with inline annotations explaining design decisions
- **[reflection.md](./reflection.md)** — Reflection on what worked, GIGO lessons, and what I'd improve

## 🎨 Design

- Dark theme with glassmorphism panels
- Persona-specific accent colors:
  - 🔵 Anshuman — Electric Blue
  - 🟡 Abhimanyu — Warm Amber
  - 🟢 Kshitij — Vibrant Green
- Smooth color transitions on persona switch
- Inter font from Google Fonts
- Animated typing indicator with bouncing dots

## 📄 License

MIT
