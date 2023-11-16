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

  '@media': {
    '(prefers-color-scheme: dark)': {
      color: '#c5c4c2',
      backgroundColor: '#12000a',
    },
  },
})

export const pre = style({
  overflowX: 'auto',
  border: '1px solid #b9a2b2',
  backgroundColor: '#fffffe',
  padding: '.25rem .5rem',
  borderRadius: '4px',

  '@media': {
    '(prefers-color-scheme: dark)': {
      backgroundColor: '#12000a',
      borderColor: '#2c1622',
    },
  },
})
