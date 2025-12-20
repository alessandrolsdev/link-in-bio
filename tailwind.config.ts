import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Nossa base "Dark Premium" (não é preto #000, é um cinza rico)
        background: "#0a0a0a", 
        surface: "#111111",
        // O verde do seu anel de perfil (ajustado para brilhar)
        neon: {
          DEFAULT: "#10b981", // Emerald-500
          glow: "#34d399",    // Emerald-400 para brilhos
          dim: "rgba(16, 185, 129, 0.1)", // Para fundos sutis
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-grid': "url('/grid-pattern.svg')", // Opcional pro futuro
      },
    },
  },
  plugins: [],
};
export default config;