import type { Config } from 'tailwindcss';
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
      fontFamily: {
        poppins: [ 'Poppins', "sans-serif" ],
        inter: [ "Inter", "sans-serif" ],
        "plus-jakarta": [ "Plus Jakarta Sans", "sans-serif" ]
      },
      colors: {
        "gray-600": "#475467",
        "gray-700": "#344054",
        "gray-50": "#F9FAFB",
        "base-secondary-text": "#07397D",
        "base-primary-green": "#139D8C",
        "base-primary-yellow": "#E2BB53",
        "base-white": "#FFFFFF",
        "primary-yellow": "#E1AE25",
        "gray-iron-50": "#FAFAFA",
        "gray-iron-100": "#F4F4F5",
        "gray-iron-200": "#E4E4E7",
        "gray-iron-500": "#70707B",
        "gray-iron-600": "#51525C",
        "gray-iron": "#D1D1D6",
        "neutrals-500": "#E3E4E4",
        "success-600": "#039855",
        "gray-25": "#FCFCFC"
      }
    },
  },
  plugins: [],
};
export default config;
