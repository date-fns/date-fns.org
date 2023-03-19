import { globalStyle, style } from '@vanilla-extract/css'
import backgroundURL from './img/navBarBackground.png'

export const container = style({
  color: '#ffe9c9',
  background: '#5a0530',
  backgroundImage: `url('${backgroundURL}'})`,
  backgroundSize: 'cover',
  backgroundPosition: 'top center',
  width: '100%',
  height: '2rem',
})

export const outer = style({
  background: 'rgba(118,10,61,0.7)',
})

export const inner = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: '2rem',
  padding: '0 1rem',
  maxWidth: '80rem',
  margin: '0 auto',
})

export const latestLink = style({
  color: '#fbd7a1',
  marginLeft: '0.5rem',
})

export const links = style({
  display: 'flex',
})

export const select = style({
  minWidth: '5rem',
  opacity: '0.85',

  ':disabled': {
    opacity: '0.4',
  },
})

export const selector = style({
  marginRight: '1rem',

  ':last-child': {
    marginRight: '0',
  },
})

export const label = style({
  marginRight: '0.5rem',
  '@media': {
    'screen and (max-width: 550px)': {
      display: 'none',
    },
  },
})

export const link = style({
  color: '#ffe9c9',
  textDecoration: 'none',
  marginRight: '1rem',
  fontSize: '0.9rem',
  position: 'relative',
  top: '1px',

  '@media': {
    'screen and (max-width: 800px)': {
      display: 'none',
    },
  },
})

export const logo = style({
  display: 'flex',
  alignItems: 'center',
  fontSize: '1.2rem',
  lineHeight: '1.2rem',
  fontWeight: '400',
  color: 'white',
  textDecoration: 'none',
  marginRight: '2rem',

  '@media': {
    'screen and (max-width: 360px)': {
      fontSize: '1rem',
      lineHeight: '1rem',
      marginRight: '1rem',
    },
  },
})

export const logoImage = style({
  height: '1.3rem',
  marginRight: '0.5rem',

  '@media': {
    'screen and (max-width: 400px)': {
      display: 'none',
    },
  },
})

export const menuIcon = style({
  display: 'none',
  alignItems: 'center',
  fontSize: '1.2rem',
  lineHeight: '1.2rem',
  fontWeight: '400',
  color: 'white',
  textDecoration: 'none',
  marginRight: '1rem',
  cursor: 'pointer',

  '@media': {
    'screen and (max-width: 767px)': {
      display: 'flex',
    },
  },
})

globalStyle(`${menuIcon} img`, {
  width: '18px',
})
