import { style } from '@vanilla-extract/css'

export const container = style({
  display: 'block',
  lineHeight: '1.3',
  background: '#af045c',
  color: '#fff',
  textDecoration: 'none',
  fontSize: '1rem',
  padding: '1rem 0.5rem',

  ':hover': {
    background: '#8c1a54',
  },
})

export const emojiWrapper = style({
  flexBasis: '2rem',
  marginRight: '0.5rem',
  flexShrink: '0',
})

export const inner = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const icon = style({
  display: 'inline-block',
  fill: '#fff',
  position: 'relative',
  height: '1rem',
  top: '3px',
})
