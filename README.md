# 🚀 Alessandro Lima - Interactive Portfolio

![Project Banner](https://img.shields.io/badge/Status-Active-success?style=for-the-badge) ![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge) ![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge&logo=typescript)

> Portfólio interativo com estética cyberpunk/hacker, widgets em tempo quase real e camada visual orientada por sinais externos.

---

## ⚡ Visão geral

O projeto usa **Next.js 16 + React 19** com composição server-first para renderizar a home, mantendo interações client-side apenas onde elas agregam UX real.

Os módulos principais combinam:

- widgets de GitHub, Spotify, Discord/Lanyard, YouTube e WakaTime
- terminal interativo com Gemini em `Ctrl+J` ou `Cmd+J`
- links rastreados para telemetria de interação
- identidade visual neon com animações em Framer Motion

---

## ✨ Funcionalidades principais

- **Design cyberpunk/hacker** com tipografia monoespaçada, brilho neon e overlays visuais.
- **Nexus Control Panel** com resumo de sinais externos e foco atual do perfil.
- **Widgets server-first** para GitHub, Spotify, YouTube e WakaTime com fallback explícito para loading, vazio e indisponibilidade.
- **Presença Discord via Lanyard** consumida por hook client-side para refletir atividade atual.
- **Terminal IA com Gemini** exposto por `src/app/api/chat/route.ts`.
- **Telemetria de cliques** para links principais via `TrackedLink`.
- **Easter egg do Konami Code** com modo visual alternativo.

---

## 🛠️ Stack atual

- **Runtime UI**: [Next.js 16](https://nextjs.org/), [React 19](https://react.dev/), [TypeScript strict](https://www.typescriptlang.org/)
- **Estilo e motion**: [Tailwind CSS 4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/), [Lucide React](https://lucide.dev/)
- **Fluxo server-first**: App Router, Server Components, Route Handlers, `fetch` com `revalidate`
- **Integrações externas**: GitHub REST API, Spotify Web API, Lanyard, YouTube Data API, WakaTime API, Google Gemini
- **Telemetria**: endpoints REST do Supabase consumidos no client para analytics de navegação

---

## 📂 Estrutura do projeto

```bash
src/
├── app/
│   ├── api/chat/route.ts      # Route Handler do terminal IA
│   ├── globals.css            # Base visual global e modo hacker
│   ├── layout.tsx             # Layout global e wrappers visuais
│   └── page.tsx               # Composição principal da home
├── components/
│   ├── ActionButtons.tsx      # CTAs rastreados e grupos expansíveis
│   ├── ConsoleTerminal.tsx    # Terminal interativo com Gemini
│   ├── NexusControlPanel.tsx  # Painel principal de sinais
│   ├── TechStack.tsx          # Runtime e integrações exibidas na UI
│   └── ...                    # Widgets e componentes visuais auxiliares
├── hooks/
│   ├── useKonami.tsx          # Easter egg visual
│   └── useLanyard.ts          # Socket client-side para presença Discord
└── lib/
    ├── current-focus.ts       # Geração do status atual com Gemini
    ├── github.ts              # Perfil, eventos e métricas GitHub
    ├── spotify.ts             # Now Playing do Spotify
    ├── tracker.ts             # Telemetria client-side
    ├── wakatime.ts            # Estatísticas semanais de código
    └── youtube.ts             # Último vídeo da playlist configurada
```

---

## 🚀 Como rodar localmente

### Pré-requisitos

- Node.js LTS compatível com o runtime do Next.js 16
- npm instalado
- Variáveis de ambiente configuradas em `.env.local`

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/alessandrolsdev/link-in-bio.git
   cd link-in-bio
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure `.env.local`:
   ```env
   GEMINI_API_KEY=...

   NEXT_PUBLIC_DISCORD_USER_ID=...

   SPOTIFY_CLIENT_ID=...
   SPOTIFY_CLIENT_SECRET=...
   SPOTIFY_REFRESH_TOKEN=...

   YOUTUBE_API_KEY=...
   YOUTUBE_PLAYLIST_ID=...

   WAKATIME_API_KEY=...

   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```

4. Execute em desenvolvimento:
   ```bash
   npm run dev
   ```

5. Acesse [http://localhost:3000](http://localhost:3000).

---

## ✅ Validação local

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

---

## 📄 Licença

Este projeto está licenciado sob a licença **MIT**.
