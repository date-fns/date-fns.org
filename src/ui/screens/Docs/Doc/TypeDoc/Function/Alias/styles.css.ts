import { globalStyle, style } from '@vanilla-extract/css'

export const alias = style({
  marginTop: '0.5rem',
  fontSize: '14px',
  color: '#7c6973',

  '@media': {
    '(prefers-color-scheme: dark)': {
      color: '#9b838f',
    },
  },
})

globalStyle(`${alias} code`, {
  border: '1px solid #5844521a',
  background: '#fffefd',

  '@media': {
    '(prefers-color-scheme: dark)': {
      borderColor: '#2c1622',
      background: '#12000a',
    },
  },
})
