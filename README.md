# 🚀 Alessandro Lima - Interactive Portfolio (Link in Bio)

![Project Banner](https://img.shields.io/badge/Status-Finished-success?style=for-the-badge) ![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge) ![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)

> **Um portfólio interativo, imersivo e gamificado com estética Cyberpunk/Hacker.**  
> Desenvolvido para demonstrar habilidades avançadas em Frontend, UX e integração com APIs.

---

## ⚡ Visão Geral

Este projeto não é apenas um "Link in Bio" comum. É uma experiência digital completa que reflete minha identidade como desenvolvedor FullStack apaixonado por interfaces modernas e código limpo.

O site combina design responsivo, animações fluidas com **Framer Motion**, integração em tempo real com **Spotify**, **GitHub**, **YouTube** e **WakaTime**, além de um chatbot integrado alimentado pelo **Google Gemini AI**.

---

## ✨ Funcionalidades Principais

- 🎨 **Design Cyberpunk/Hacker**: Cores neon, fontes monoespaçadas, efeitos de glitch e ruído visual (noise).
- 🖱️ **Interatividade Avançada**: Cursor customizado, cards magnéticos, efeitos de spotlight e tilt 3D.
- 🎵 **Widget Spotify (Real-Time)**: Mostra o que estou ouvindo agora com animação de vinil e equalizador.
- 📺 **Widget YouTube**: Exibe o último vídeo postado ou assistido.
- 📊 **Stats GitHub & WakaTime**: Monitoramento de commits e linguagens de programação mais usadas na semana.
- 🤖 **Chatbot IA (Gemini)**: Um terminal interativo onde você pode conversar com o "NEXUS_AI" sobre minha carreira.
- 🕹️ **Easter Egg (Konami Code)**: Digite `↑ ↑ ↓ ↓ ← → ← → B A` para desbloquear o **"God Mode"** (Matrix Rain + Hacker Theme).
- ⌨️ **Command Menu (`Cmd+K`)**: Navegação rápida via teclado para power users.

---

## 🛠️ Tech Stack

Este projeto foi construído utilizando as tecnologias mais modernas do ecossistema React:

- **Core**: [Next.js 14](https://nextjs.org/) (App Router), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/).
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/), [PostCSS](https://postcss.org/).
- **Animações**: [Framer Motion](https://www.framer.com/motion/).
- **Data Fetching**: [SWR](https://swr.vercel.app/) e Fetch API com caching (ISR).
- **IA**: [Google Generative AI SDK](https://ai.google.dev/) (Gemini Flash Model).
- **APIs Externas**: Spotify Web API, GitHub REST API, YouTube Data API, WakaTime API, Lanyard (Discord).
- **Ícones**: [Lucide React](https://lucide.dev/).

---

## 📂 Estrutura do Projeto

A organização do código segue as melhores práticas de arquitetura para Next.js:

```bash
src/
├── app/
│   ├── api/chat/       # Route Handler para o Chatbot (Gemini)
│   ├── layout.tsx      # Layout Global (Providers, Metadata, Fonts)
│   ├── page.tsx        # Página Principal (Composição dos Widgets)
│   └── globals.css     # Estilos Globais e Variáveis CSS
├── components/         # Componentes Reutilizáveis (UI)
│   ├── AnimatedSection # Wrapper para animações de entrada
│   ├── CyberCard       # Card principal com efeitos visuais
│   ├── TerminalModal   # Terminal interativo (Chatbot)
│   └── ... (Widgets: Spotify, GitHub, YouTube, etc)
├── lib/                # Camada de Lógica e Serviços (API Clients)
│   ├── github.ts       # Integração GitHub
│   ├── spotify.ts      # Integração Spotify
│   ├── wakatime.ts     # Integração WakaTime
│   └── youtube.ts      # Integração YouTube
└── hooks/              # Hooks Customizados
    ├── useKonami.tsx   # Lógica do Easter Egg
    └── useLanyard.ts   # Hook para status do Discord
```

---

## 🚀 Como Rodar Localmente

Siga os passos abaixo para clonar e executar o projeto em sua máquina:

### Pré-requisitos
- Node.js 18+ instalado.
- Gerenciador de pacotes (npm, yarn, pnpm ou bun).
- Chaves de API para os serviços (Spotify, GitHub, YouTube, Gemini, WakaTime) configuradas em um arquivo `.env.local`.

### Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/alessandrolsdev/link-in-bio.git
   cd link-in-bio
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure as Variáveis de Ambiente:**
   Crie um arquivo `.env.local` na raiz e preencha:
   ```env
   # Gemini AI
   GEMINI_API_KEY=sua_chave_aqui

   # Spotify
   SPOTIFY_CLIENT_ID=...
   SPOTIFY_CLIENT_SECRET=...
   SPOTIFY_REFRESH_TOKEN=...

   # YouTube
   YOUTUBE_API_KEY=...
   YOUTUBE_PLAYLIST_ID=...

   # WakaTime
   WAKATIME_API_KEY=...
   ```

4. **Execute o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Acesse:** Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 🤝 Contribuição

Contribuições são bem-vindas! Se você tiver alguma ideia para melhorar este projeto ou encontrar algum bug:

1. Faça um Fork do projeto.
2. Crie uma Branch (`git checkout -b feature/MinhaFeature`).
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`).
4. Push para a Branch (`git push origin feature/MinhaFeature`).
5. Abra um Pull Request.

---

## 📄 Licença

Este projeto está licenciado sob a licença **MIT** - sinta-se livre para usar, estudar e modificar.

---

<p align="center">
  Feito com 💜 e muito ☕ por <a href="https://github.com/alessandrolsdev">Alessandro Lima</a>
</p>
