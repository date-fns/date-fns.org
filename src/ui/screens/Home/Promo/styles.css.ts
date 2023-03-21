import { style } from '@vanilla-extract/css'
import backgroundURL from './img/background.png'

export const outer = style({
  width: '100%',
  color: 'white',
  background: '#5a0530',
  backgroundImage: `url('${backgroundURL}')`,
  backgroundSize: 'cover',
  backgroundPosition: 'top center',
  overflowY: 'auto',

  '@media': {
    '(prefers-color-scheme: dark)': {
      borderBottom: '1px solid #31292d',
    },
  },
})

export const inner = style({
  background: 'linear-gradient(rgba(118, 10, 61, 0.7), #4c042b)',
  padding: '4rem 1rem',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',

  '@media': {
    '(prefers-color-scheme: dark)': {
      background: 'linear-gradient(#34031bb3, #1e0b14)',
    },
  },
})

export const logo = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '33px',
})

export const logoImage = style({ width: '40px' })

export const logoName = style({
  fontSize: '35px',
  color: '#fff',
  fontWeight: 400,
  marginLeft: '10px',
  position: 'relative',
  top: '-1px',
})

export const header = style({
  textAlign: 'center',
  color: '#fbd7a1',
  fontSize: '20px',
  marginTop: '2rem',
  fontWeight: 300,
})

export const text = style({
  fontSize: '16px',
  lineHeight: '22px',
  fontWeight: 200,
  textAlign: 'center',
  marginTop: '1rem',
  color: '#ffe9c9',
  maxWidth: '500px',
})

export const gettingStarted = style({
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  margin: '2rem 0',
})

export const gettingStartedLink = style({
  display: 'block',
  background: '#8c1b54',
  textAlign: 'center',
  textDecoration: 'none',
  color: '#fff',
  borderRadius: '3px',
  fontSize: '1rem',
  padding: '1rem',
  width: '12rem',
})
