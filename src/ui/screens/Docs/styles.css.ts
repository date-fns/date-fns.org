import { style } from '@vanilla-extract/css'

export const screen = style({
  height: '100%',
  width: '100%',
  overflowY: 'auto',
  background: '#fffdf9',
})

export const content = style({
  flex: 'auto',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch',
  minHeight: '0',
  position: 'relative',
  maxWidth: '80rem',
  margin: '0 auto',
  width: '100%',
})

export const loading = style({
  padding: '30px',
})

export const navBarContainer = style({
  flex: 'none',
  height: '2rem',
  position: 'sticky',
  top: 0,
  zIndex: 1,
})

export const docContainer = style({
  height: 'auto',
  minHeight: '100%',
  flex: 'auto',
  overflowY: 'auto',
  marginLeft: '25rem',

  ':after': {
    display: 'none',
    content: '',
    backgroundColor: 'grey',
    opacity: '0.5',
    height: '100%',
    width: '100%',
    left: '0',
    top: '0',
    position: 'absolute',
  },

  '@media': {
    'screen and (max-width: 767px)': {
      marginLeft: 0,
    },
  },
})

export const docContainerMenuOpen = style({
  ':after': {
    display: 'block',
  },

  '@media': {
    'screen and (max-width: 767px)': {
      overflowY: 'hidden',
      MozUserSelect: 'none',
      KhtmlUserSelect: 'none',
      WebkitUserSelect: 'none',
      userSelect: 'none',
    },
  },
})

export const finderContainer = style({
  flex: 'none',
  width: '25rem',
  maxWidth: '100%',
  position: 'fixed',
  bottom: 0,
  top: '2rem',

  '@media': {
    'screen and (max-width: 767px)': {
      display: 'none',
      position: 'absolute',
      left: '0',
      top: '0',
      height: '100%',
      zIndex: '10',
    },
  },
})

export const finderContainerMenuOpen = style({
  '@media': {
    'screen and (max-width: 767px)': {
      display: 'block',
    },
  },
})
