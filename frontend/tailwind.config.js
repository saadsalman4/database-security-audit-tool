/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'sql-primary': '#2563eb',
        'sql-light': '#dbeafe',
        'sql-dark': '#1e40af',
        'mongo-primary': '#15803d',
        'mongo-light': '#dcfce7',
        'mongo-dark': '#166534',
        'neutral-background': '#f9fafb',
        'neutral-card': '#ffffff',
        'neutral-text': '#1f2937',
        'success': '#10b981',
        'warning': '#f59e0b',
        'danger': '#ef4444',
        'info': '#6366f1'
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      }
    },
  },
  plugins: [],
};