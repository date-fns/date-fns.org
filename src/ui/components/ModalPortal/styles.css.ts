import { globalStyle, style, styleVariants } from '@vanilla-extract/css'

export const overlay = style({
  zIndex: 20,
  position: 'fixed',
  left: '0',
  top: '0',
  right: '0',
  bottom: '0',
  background: '#080005d4',
  overflowY: 'auto',
  display: 'flex',
  justifyContent: 'center',
})

export const overlayAdjusted = style({
  alignItems: 'center',
})

export const windowWrapper = style({
  width: '100%',
  padding: '4rem',

  '@media': {
    '(max-width: 1024px)': {
      padding: '1rem',
    },
  },
})

export const windowBase = style({
  background: '#fffdf9',
  borderRadius: '4px',
  color: '#4a3142',
  width: '100%',
  margin: '0 auto',
})

export const window = styleVariants({
  small: [
    windowBase,
    {
      maxWidth: '40rem',
    },
  ],

  medium: [
    windowBase,
    {
      maxWidth: '50rem',
    },
  ],
})

export const close = style({
  border: '0',
  background: 'transparent',
  position: 'fixed',
  width: '3rem',
  height: '3rem',
  color: '#5d3861',
  cursor: 'pointer',

  ':hover': {
    color: '#c482cb',
  },

  selectors: {
    [`${window.small} &`]: {
      marginLeft: '41rem',
    },

    [`${window.medium} &`]: {
      marginLeft: '51rem',
    },
  },
})

globalStyle(`${close} svg`, {
  width: '100%',
})
