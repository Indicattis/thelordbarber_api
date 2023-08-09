import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      safelist: [
        {
            pattern: /^grid-cols-/,
            variants: ['sm', 'md', 'lg', 'xl', '2xl'],
        }
      ],
      colors: {
        onHover: 'rgb(9,9,11)',
        defaultColor: '#000000',
        onActive: '#ff9e00',
        whiteColor: 'rgb(244,244,245)',
        darkTheme: 'rgb(9,9,11)',
        textColor: 'rgb(212, 212, 216)',
        sidebarColor: '#000000e0'
      },
      fontFamily: {
        'senthir': ['SENTHIR', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
