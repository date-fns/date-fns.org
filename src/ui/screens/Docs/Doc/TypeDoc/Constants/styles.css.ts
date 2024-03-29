import { style } from '@vanilla-extract/css'

export const list = style({
  marginTop: '1rem',
  borderTop: '1px solid #5844521a',
  paddingTop: '1rem',

  '@media': {
    '(prefers-color-scheme: dark)': {
      borderColor: '#2c1622',
    },
  },
})

export const search = style({
  marginBottom: '1rem',
})

export const name = style({
  fontFamily: 'monospace',
})

export const sectionHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})
