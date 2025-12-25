/** 
 * Configuração do PostCSS.
 * Define os plugins utilizados no processamento do CSS, incluindo a integração com TailwindCSS.
 *
 * @type {import('postcss-load-config').Config} 
 */
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, // Inicializa o TailwindCSS como plugin PostCSS
    autoprefixer: {}, // Adiciona prefixos de navegador automaticamente para compatibilidade
  },
};

export default config;