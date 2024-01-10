import { globalStyle, style } from '@vanilla-extract/css'

export const alias = style({
  marginTop: '0.75rem',
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
