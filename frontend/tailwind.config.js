/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(var(--tw-blur))',
      }
    },
  },
  plugins: [
    function({ addBase, theme }) {
      addBase({
        'html': {
          '-webkit-text-size-adjust': '100%',
          /* text-size-adjust not supported by Firefox/Safari */
        },
        /* Webkit scrollbar styles only - Safari/Chrome compatible */
        '::-webkit-scrollbar': {
          width: '8px',
        },
        '::-webkit-scrollbar-track': {
          background: '#f1f1f1',
        },
        '::-webkit-scrollbar-thumb': {
          background: '#888',
          'border-radius': '4px',
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: '#555',
        }
      })
    }
  ],
};

