import { style } from '@vanilla-extract/css'

export const content = style({
  flex: 'auto',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch',
  minHeight: '0',
  position: 'relative',
})

export const loading = style({
  padding: '30px',
})

export const navBarContainer = style({
  flex: 'none',
  height: '2rem',
})

export const screen = style({
  display: 'flex',
  height: '100%',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'stretch',
  overflow: 'hidden',
})

export const docContainer = style({
  height: 'auto',
  minHeight: '100%',
  flex: 'auto',
  overflowY: 'auto',

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
