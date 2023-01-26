import { style, styleVariants } from '@vanilla-extract/css'

export const link = style({
  position: 'relative',
  top: '2px',
})

export const icon = style({
  color: '#9f8194',
  display: 'inline-block',
  transition: 'color 0.15s ease-out',
  marginLeft: '0.5rem',

  ':hover': {
    color: '#6e0839',
  },
})

export const size = styleVariants({
  small: {
    width: '1rem',
  },

  medium: {
    width: '1.5rem',
  },
})
