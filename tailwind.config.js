/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0F0F12',
        'bg-secondary': '#1A1A1F',
        'bg-tertiary': '#25252B',
        'text-primary': '#EDEDED',
        'text-secondary': '#A1A1AA',
        'accent-primary': '#6366F1',
        'accent-glow': 'rgba(99, 102, 241, 0.3)',
        'success': '#10B981',
        'warning': '#F59E0B',
        'error': '#EF4444',
        'highlight-cyan': '#00FFC8',
        'highlight-purple': '#B04EFF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'glass': '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
        'modal': '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-in-out',
        'slide-in': 'slideIn 300ms ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
}
