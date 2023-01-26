import { style, globalStyle } from '@vanilla-extract/css'

export const entity = style({
  selectors: {
    '&:not(:last-child)': {
      marginBottom: '1rem',
    },
  },
})

export const miltiEntity = style({
  border: '1px solid #5844521a',
  padding: '1rem',
  background: '#fffefd',
})

globalStyle(`${miltiEntity} > :first-child > :first-child`, {
  marginTop: '0',
})
