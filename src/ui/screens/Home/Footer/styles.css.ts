import { style, globalStyle } from '@vanilla-extract/css'

export const rowIsLicense = style({
  marginTop: '1rem',
  fontSize: '0.8rem',
})

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

globalStyle(`${container} a`, {
  color: '#a07d8f',
})

export const row = style({
  selectors: {
    '&:not(:last-child)': {
      marginBottom: '0.5rem',
    },
  },
})
