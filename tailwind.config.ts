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
        inter: [ "Inter", "sans-serif" ]
      },
      colors: {
        "gray-600": "#475467",
        "gray-700": "#344054",
        "gray-50": "#F9FAFB",
        "base-secondary-text": "#072446",
        "base-primary-green": "#139D8C",
        "base-primary-yellow": "#E2BB53",
        "base-white": "#FFFFFF",
        "primary-yellow": "#E1AE25",
        "gray-iron-500": "#70707B"

      }
    },
  },
  plugins: [],
};
export default config;
