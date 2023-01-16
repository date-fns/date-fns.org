import { style, globalStyle } from '@vanilla-extract/css'

export const signature = style({
  selectors: {
    '&:not(:last-child)': {
      marginBottom: '1rem',
    },
  },
})

export const multiSignature = style({
  border: '1px solid #5844521a',
  padding: '1rem',
  background: '#fffefd',
})

globalStyle(`${multiSignature} > :first-child > :first-child`, {
  marginTop: '0',
})
