import { style } from '@vanilla-extract/css'

export const code = style({
  display: 'block',
  color: '#5d583b',
  backgroundColor: '#fffffe',
  font: "13px Consolas, 'Liberation Mono', Menlo, Courier, monospace",

  '::after': {
    display: 'none',
  },

  '::before': {
    display: 'none',
  },
})

export const pre = style({
  overflowX: 'auto',
  border: '1px solid #b9a2b2',
  backgroundColor: '#fffffe',
  padding: '.25rem .5rem',
})
