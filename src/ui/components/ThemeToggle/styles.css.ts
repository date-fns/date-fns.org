import { style } from '@vanilla-extract/css'

export const toggle = style({
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: '0.25rem 0.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.2rem',
  lineHeight: '1',
  color: '#ffe9c9',
  transition: 'opacity 0.2s ease',
  marginLeft: '0.5rem',

  ':hover': {
    opacity: 0.8,
  },

  ':active': {
    opacity: 0.6,
  },

  ':focus': {
    outline: '2px solid #ffe9c9',
    outlineOffset: '2px',
    borderRadius: '2px',
  },
})

export const icon = style({
  display: 'inline-block',
  fontSize: '1.1rem',
  lineHeight: '1',
})

