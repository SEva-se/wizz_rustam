import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        bg:         '#0a0a0a',
        surface:    '#111111',
        surface2:   '#1a1a1a',
        accent:     '#ffffff',
        blue:       '#0071e3',
        success:    '#34c759',
        warning:    '#ff9f0a',
        error:      '#ff453a',
        muted:      '#888888',
        border:     'rgba(255,255,255,0.08)',
      },
      borderColor: { DEFAULT: 'rgba(255,255,255,0.08)' },
      boxShadow: {
        focus: '0 0 0 3px rgba(0,113,227,0.15)',
        glow:  '0 0 20px rgba(0,113,227,0.2)',
      },
    },
  },
  plugins: [],
} satisfies Config
