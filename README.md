# PDF to Podcast

**PDF to Podcast** transforms any PDF document into a podcast-ready audio episode using advanced AI text-to-speech (TTS) providers. Upload a PDF, select your preferred voice and provider, and receive an MP3 and a ready-to-use RSS feed for your podcast app.

---

## 🚀 Quick Launch

Deploy this app to your favorite platform with one click:

<p align="left">
  <a href="https://vercel.com/new/clone?repository-url=https://github.com/knoksen/pdf-to-podcast&env=GEMINI_API_KEY&envDescription=Your%20Gemini%20API%20Key&envLink=https://aistudio.google.com/app/apikey">
    <img src="https://vercel.com/button" alt="Deploy with Vercel" height="32">
  </a>
  <a href="https://app.netlify.com/start/deploy?repository=https://github.com/knoksen/pdf-to-podcast">
    <img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify" height="32">
  </a>
  <a href="https://railway.app/new/template?template=https://github.com/knoksen/pdf-to-podcast&envs=GEMINI_API_KEY">
    <img src="https://railway.app/button.svg" alt="Deploy on Railway" height="32">
  </a>
  <a href="https://render.com/deploy?repo=https://github.com/knoksen/pdf-to-podcast">
    <img src="https://render.com/images/deploy-to-render-button.svg" alt="Deploy to Render" height="32">
  </a>
  <a href="https://codesandbox.io/p/github/knoksen/pdf-to-podcast">
    <img src="https://codesandbox.io/static/img/play-codesandbox.svg" alt="Open in CodeSandbox" height="32">
  </a>
  <a href="https://replit.com/github/knoksen/pdf-to-podcast">
    <img src="https://replit.com/badge/github/knoksen/pdf-to-podcast" alt="Run on Repl.it" height="32">
  </a>
  <a href="https://gitpod.io/#https://github.com/knoksen/pdf-to-podcast">
    <img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod" height="32">
  </a>
  <a href="https://glitch.com/edit/#!/import/github/knoksen/pdf-to-podcast">
    <img src="https://cdn.glitch.com/5f9ff6fa-6d73-4e51-8d3b-6b8bc4b2a5b6%2Fglitch-badge.svg?v=1599046355486" alt="Remix on Glitch" height="32">
  </a>
  <a href="https://stackblitz.com/github/knoksen/pdf-to-podcast">
    <img src="https://developer.stackblitz.com/img/open_in_stackblitz.svg" alt="Open in StackBlitz" height="32">
  </a>
</p>

**Docker:**  

```sh
docker run -d -p 3000:3000 -e GEMINI_API_KEY=your_key ghcr.io/knoksen/pdf-to-podcast:latest
```

**Heroku:**  
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/knoksen/pdf-to-podcast)

**Fly.io:**  

```sh
fly launch --image ghcr.io/knoksen/pdf-to-podcast:latest
```

---

## 📝 Features

- **PDF Upload:** Drag & drop or select a PDF, up to 50MB.
- **Provider Selection:** Choose TTS engine: gTTS (free), OpenAI, or Azure.
- **Voice Selection:** Customizable voice (where supported).
- **Episode Management:** See, play, and download all generated episodes.
- **Podcast-Ready:** Instant RSS feed for any podcast app.
- **Modern UI:** Built with React, TailwindCSS, and best practices.
- **API-First:** Easily extensible for new TTS providers.

---

## 🛠️ Architecture & Tech Stack

- **Frontend:** React (Vite), TypeScript, TailwindCSS
- **Backend:** Node.js (Express/Fastify), REST API
- **TTS Providers:** gTTS (Google Text-to-Speech), OpenAI, Azure Cognitive Services
- **Storage:** Local filesystem (default), configurable for cloud (e.g., S3)
- **Deployment:** Vercel, Netlify, Railway, Render, Docker, etc.
- **CI/CD:** GitHub Actions (recommended)
- **RSS Generation:** Automatic and standards-compliant

---

## ⚙️ Configuration & Environment

Create a `.env.local` file in the root with:

```
GEMINI_API_KEY=your_gemini_api_key
# Optionally:
# OPENAI_API_KEY=your_openai_key
# AZURE_API_KEY=your_azure_key
# AZURE_REGION=your_azure_region
# STORAGE_DIR=/path/to/episodes
```

- `GEMINI_API_KEY` is required for Gemini-based TTS.
- Add other provider keys as needed.

---

## 🧑‍💻 Local Development

**Prerequisites:**  

- Node.js 18+
- npm

**Steps:**

```sh
git clone https://github.com/knoksen/pdf-to-podcast.git
cd pdf-to-podcast
cp .env.local.example .env.local # then edit the file
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 🗒️ Usage

1. Upload your PDF.
2. Choose a provider and voice (if available).
3. Click **Generate Episode**.
4. When processing is complete, play or download the MP3.
5. Use `/rss.xml` in your podcast app.

---

## 🧩 API (for Developers)

- `POST /api/episodes` – Upload a PDF and metadata
- `GET /api/episodes` – List all podcast episodes
- `GET /api/episodes/:id/audio` – Download episode audio
- `GET /rss.xml` – Get podcast RSS

> **Extending:**  
> Add your own TTS provider by implementing a new provider in `/services/tts/` and updating the provider options.

---

## 📦 Docker

Build your own image:

```sh
docker build -t pdf-to-podcast .
docker run -d -p 3000:3000 -e GEMINI_API_KEY=your_key pdf-to-podcast
```

---

## 🧪 Testing

```sh
npm run test
```

---

## 🤝 Contributing

PRs and issues welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

---

## 📄 License

[MIT](LICENSE)

---

## ✨ Credits

- [Vercel](https://vercel.com), [Netlify](https://www.netlify.com), [Railway](https://railway.app), [Render](https://render.com), [Azure Cognitive Services](https://azure.microsoft.com/services/cognitive-services/), [OpenAI](https://openai.com/), [gTTS](https://pypi.org/project/gTTS/), [Google Gemini](https://aistudio.google.com/)

---

## 🗣️ Questions?

Open an [issue](https://github.com/knoksen/pdf-to-podcast/issues) or start a [discussion](https://github.com/knoksen/pdf-to-podcast/discussions).

---

## 🖥️ Build a Windows EXE

This repo now includes a minimal Electron wrapper and electron-builder configuration to create a Windows executable (NSIS installer).

Prerequisites:

- Node.js 18+ and npm
- On Windows: make sure you have the required build tools for native modules (optional)

Quick steps (Windows cmd.exe):

```cmd
npm install
npm run electron:build
```

Artifacts will be written to the `release` directory.
