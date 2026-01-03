# 🚀 Nexus Portfolio

![Project Banner](https://img.shields.io/badge/Status-Stable-success?style=for-the-badge) ![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge) ![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.0-38b2ac?style=for-the-badge&logo=tailwind-css)

> **"High-Performance Cyberpunk Link-in-Bio built with Next.js 14"**

O **Nexus Portfolio** transcende a ideia de um simples agregador de links. É uma declaração de identidade digital, uma experiência imersiva e gamificada projetada para desenvolvedores que desejam demonstrar domínio técnico e sensibilidade estética.

Construído sobre a robustez do **Next.js 14 (App Router)** e a tipagem estrita do **TypeScript**, este projeto integra APIs em tempo real, animações complexas e uma UX refinada.

---

## ✨ Features (Funcionalidades "Uau")

- 🖥️ **Terminal Quake-Style**: Um console interativo oculto (acessível via botão ou atalho) que exibe logs do sistema e permite comandos.
- 📺 **Efeitos CRT & Noise**: Filtros visuais de pós-processamento que simulam monitores antigos e granulação de filme para uma estética retro-futurista.
- 🧲 **Magnetic UI**: Botões e cards com física magnética que atraem o cursor, criando uma sensação tátil e orgânica.
- 🌧️ **Matrix Rain (God Mode)**: Um Easter Egg clássico. Digite o **Konami Code** (`↑ ↑ ↓ ↓ ← → ← → B A`) e veja a realidade se desconstruir.
- 🎵 **Spotify Real-Time**: Integração profunda com a API do Spotify, exibindo a faixa atual com visualização de vinil giratório e equalizador animado.
- 📊 **GitHub & WakaTime Stats**: Dashboards de produtividade que monitoram commits e linguagens de programação em tempo real.
- 🤖 **Nexus AI Core**: Um chatbot integrado (powered by Gemini AI) capaz de responder perguntas sobre o portfólio e o desenvolvedor.

---

## 🏗️ Arquitetura

O projeto segue uma arquitetura modular baseada em **features** e **componentes reutilizáveis**, aproveitando ao máximo o **React Server Components (RSC)**.

```bash
src/
├── app/                  # Next.js App Router (Rutas e Layouts)
│   ├── api/              # Route Handlers (Edge/Serverless Functions)
│   ├── globals.css       # Tailwind Directives & CSS Variables
│   └── layout.tsx        # Root Layout (Fonts, Providers, Metadata)
├── components/           # UI Building Blocks (Atomic Design)
│   ├── ActionButtons.tsx # Lista de links com magnetismo
│   ├── ConsoleTerminal.tsx # Terminal interativo
│   ├── MatrixRain.tsx    # Canvas Effect
│   └── ...               # Widgets (Spotify, GitHub, YouTube)
├── hooks/                # Custom React Hooks
│   ├── useKonami.tsx     # Lógica do Easter Egg
│   └── useLanyard.ts     # Integração WebSocket Discord
└── lib/                  # Business Logic & API Clients
    ├── github.ts         # GitHub API Service
    ├── spotify.ts        # Spotify OAuth & Player API
    └── ...
```

---

## ⚡ Setup & Instalação

Para rodar o Nexus Portfolio localmente, você precisará do **Node.js 18+** e de chaves de API para os serviços integrados.

### 1. Clone o Repositório
```bash
git clone https://github.com/seu-usuario/nexus-portfolio.git
cd nexus-portfolio
```

### 2. Instale as Dependências
Utilizamos `npm` (ou `pnpm`/`yarn`):
```bash
npm install
```

### 3. Configuração de Ambiente
Renomeie o arquivo `.env.example` para `.env.local` e preencha as variáveis:

```env
# Spotify Integration
SPOTIFY_CLIENT_ID=seu_client_id
SPOTIFY_CLIENT_SECRET=seu_client_secret
SPOTIFY_REFRESH_TOKEN=seu_refresh_token

# GitHub Integration
# (Opcional para limites maiores de API, mas funciona sem para dados públicos limitados)
GITHUB_TOKEN=seu_token_opcional

# YouTube Integration
YOUTUBE_API_KEY=sua_api_key
YOUTUBE_PLAYLIST_ID=id_da_playlist

# WakaTime Integration
WAKATIME_API_KEY=sua_wakatime_key

# Gemini AI (Chatbot)
GEMINI_API_KEY=sua_gemini_key
```

### 4. Execute o Servidor de Desenvolvimento
```bash
npm run dev
```
O projeto estará disponível em `http://localhost:3000`.

---

## 🎨 Estética & Design System

O Nexus Portfolio utiliza um sistema de design consistente baseado no **Tailwind CSS**:

- **Cores**: Paleta escura (Zinc/Black) com acentos Neon (Green, Purple, Cyan).
- **Tipografia**: Combinação de fontes Sans-Serif (Inter/Geist) para legibilidade e Monospace (JetBrains Mono/Fira Code) para dados técnicos.
- **Motion**: **Framer Motion** gerencia todas as transições de estado, entradas de componentes e micro-interações.

---

## 🤝 Contribuição

Contribuições são bem-vindas. Sinta-se à vontade para abrir Issues ou Pull Requests para melhorar a performance, adicionar novos widgets ou refinar a estética.

---

<p align="center">
  Built with 💻 and ☕ by <strong>Nexus Engineering</strong>.
</p>
