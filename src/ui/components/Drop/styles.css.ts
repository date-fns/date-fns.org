import { style, styleVariants } from '@vanilla-extract/css'

export const drop = style({
  position: 'fixed',
  opacity: 0,
  transition: 'opacity 150ms',
  zIndex: 20,
  maxWidth: '30rem',
  display: 'flex',
  alignItems: 'center',
})

export const vertical = style({
  flexDirection: 'column',
})

export const ghost = style({
  pointerEvents: 'none',
})

export const triangle = style({
  background: 'var(--color-tooltip-canvas)',
  width: '0.75rem',
  height: '0.5rem',
  position: 'relative',
  marginBottom: '-1px',
})

export const position = styleVariants({
  above: {
    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
  },

  below: {
    clipPath: 'polygon(50% 100%, 0 0, 100% 0)',
  },

  left: {
    clipPath: 'polygon(0 50%, 100% 100%, 100% 0)',
  },

  right: {
    clipPath: 'polygon(0 0, 0 100%, 100% 50%)',
  },
})

export const inner = style({
  background: 'var(--color-tooltip-canvas)',
  color: 'var(--color-tooltip-ink)',
  borderRadius: '3px',
  overflow: 'hidden',
  textAlign: 'center',
})

export const string = style({
  padding: '0.5rem',
})
