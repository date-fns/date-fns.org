import { style } from '@vanilla-extract/css'

export const docHeaderLink = style({
  display: 'none',
  marginLeft: '7px',
  textDecoration: 'none',
  opacity: '0.3',

  ':hover': {
    opacity: '0.6',
  },

  selectors: {
    'h1:hover &, h2:hover &, h3:hover &, h4:hover &, h5:hover &, h6:hover &': {
      display: 'inline',
    },
  },
})
