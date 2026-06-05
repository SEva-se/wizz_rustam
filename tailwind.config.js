/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Mulish', 'Muli', 'system-ui', 'sans-serif'],
        display: ['Mulish', 'Muli', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        bg:         '#F4F4F0', // Light beige/off-white background
        dark:       '#0A0A0A', // Deep black
        surface:    '#141414', // Slightly lighter black for dark cards
        surfaceLight: '#E8E8E4', // Slightly darker beige for light cards
        accent:     '#E5FF00', // Neon yellow accent
        success:    '#E5FF00', // Reusing accent for success
        warning:    '#ff9f0a',
        error:      '#ff453a',
        muted:      '#888888',
        borderDark: 'rgba(255,255,255,0.1)',
        borderLight: 'rgba(0,0,0,0.1)',
      },
      borderColor: { 
        DEFAULT: 'rgba(0,0,0,0.1)',
        dark: 'rgba(255,255,255,0.1)'
      },
      boxShadow: {
        focus: '0 0 0 3px rgba(229, 255, 0, 0.4)', // Neon yellow focus
        glow:  '0 0 20px rgba(229, 255, 0, 0.2)',
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
      }
    },
  },
  plugins: [],
}
