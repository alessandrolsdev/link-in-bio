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
        // Base escura premium (Cinza rico ao invés de preto absoluto)
        background: "#0a0a0a",
        surface: "#111111",

        // Paleta de cores Neon (Foco em Emerald para identidade visual)
        neon: {
          DEFAULT: "#10b981", // Cor base (Emerald-500)
          glow: "#34d399",    // Variação para efeitos de brilho (Emerald-400)
          dim: "rgba(16, 185, 129, 0.1)", // Variação translúcida para fundos sutis
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        // Padrão de grid cibernético para seções de destaque
        'cyber-grid': "url('/grid-pattern.svg')",
      },
    },
  },
  plugins: [],
};
export default config;