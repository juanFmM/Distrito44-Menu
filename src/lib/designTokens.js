/**
 * Distrito 44 — Design Tokens
 * Adaptado de Theme Factory skill (awesome-claude-skills/theme-factory)
 *
 * Tema: "Street Gold" — Identidad oscura con acento dorado urbano
 * Inspiración: food trucks nocturnos, grafiti, luces de mercado
 */

export const tokens = {
  // Brand colors
  brand: {
    gold:       '#D4A017',
    goldLight:  '#E6B020',
    goldMuted:  'rgba(212,160,23,0.15)',
  },

  // Surfaces (dark scale)
  surface: {
    base:    '#111111',
    raised:  '#1a1a1a',
    overlay: '#1e1e1e',
    border:  '#2e2e2e',
    input:   '#2a2a2a',
    inputBorder: '#3a3a3a',
  },

  // Text
  text: {
    primary:   '#f5f5f5',
    secondary: '#9ca3af',
    muted:     '#6b7280',
    disabled:  '#4b5563',
    inverse:   '#111111',
  },

  // Status
  status: {
    error:   '#ef4444',
    errorBg: 'rgba(239,68,68,0.1)',
    success: '#22c55e',
  },

  // Typography — Bebas Neue + Inter
  font: {
    display: "'Bebas Neue', sans-serif",
    body:    "'Inter', sans-serif",
  },

  // Spacing scale (rem)
  space: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },

  // Border radius
  radius: {
    sm:   '0.5rem',
    md:   '0.75rem',
    lg:   '1rem',
    xl:   '1.25rem',
    full: '9999px',
  },

  // Shadows
  shadow: {
    card:   '0 4px 16px rgba(0,0,0,0.4)',
    cardHover: '0 8px 24px rgba(212,160,23,0.15)',
    modal:  '0 20px 60px rgba(0,0,0,0.7)',
  },
}

export default tokens
