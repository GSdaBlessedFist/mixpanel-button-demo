import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        "primary": {
          'DEFAULT': "#463dbb",
          'light': "#8984D7",
          'dark': "#3F37A9"
        }
      }
    },
  },
  plugins: [],
}
export default config
