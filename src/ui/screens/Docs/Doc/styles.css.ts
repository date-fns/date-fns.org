import { style, globalStyle } from '@vanilla-extract/css'

export const wrapper = style({
  padding: '30px',
  color: '#4a3142',
  backgroundColor: '#fffdf9',
  maxWidth: '55rem',
  minHeight: '100%',

  '@media': {
    '(prefers-color-scheme: dark)': {
      backgroundColor: '#1a030f',
      color: '#cbc0c7',
      borderRight: '1px solid #2c1622',
    },
  },
})
