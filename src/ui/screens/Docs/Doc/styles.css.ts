import { style, globalStyle } from '@vanilla-extract/css'

export const wrapper = style({
  padding: '30px',
  color: '#4a3142',
  backgroundColor: '#fffdf9',
  width: '100%',
  minHeight: '100%',
})

export const inner = style({
  maxWidth: '60rem',
  margin: '0 auto',
})
