import { style } from '@vanilla-extract/css'

export const container = style({
  background: '#f5d958',
  padding: '0.25rem',

  '@media': {
    '(prefers-color-scheme: dark)': {
      background: '#641d03',
    },
  },
})

export const header = style({
  fontSize: '1.05rem',
  lineHeight: '1.4',
  fontWeight: '600',

  '@media': {
    '(prefers-color-scheme: dark)': {
      color: '#ded7a9',
    },
  },
})

export const block = style({
  background: '#fcf4ca',
  textDecoration: 'none',
  display: 'flex',
  flexDirection: 'column',
  color: 'black',
  transition: 'background 150ms ease-out',

  '@media': {
    '(prefers-color-scheme: dark)': {
      background: '#411302',
    },
  },
})

export const footer = style({
  color: '#837430',
  fontWeight: '600',
  textAlign: 'center',
  display: 'block',
  padding: '0.5rem 0',
  fontSize: '0.8rem',

  '@media': {
    '(prefers-color-scheme: dark)': {
      color: '#a8a493',
    },
  },
})

export const blockContent = style({
  padding: '1rem',
})

export const form = style({
  display: 'flex',
  alignItems: 'center',
  margin: '0.5rem 0 0',
})

export const input = style({
  flex: 'auto',
  height: '2rem',
  background: '#f9f6e3',
  fontSize: '1rem',
  padding: '0 0.5rem',
  borderRadius: '0',
  color: 'black',
  marginRight: '0.5rem',
  border: '1px solid black',

  '@media': {
    '(prefers-color-scheme: dark)': {
      borderColor: '#290d03',
      background: '#290d03',
      color: 'white',
    },
  },
})

export const subscribeButton = style({
  flex: 'none',
  height: '2rem',
  fontSize: '1rem',
  display: 'block',
  background: 'black',
  color: 'white',
  border: '0',
  padding: '0 1rem',
  cursor: 'pointer',
  alignItems: 'center',

  ':hover': {
    color: 'red',
  },

  '@media': {
    '(prefers-color-scheme: dark)': {
      color: '#ded7a9',
      background: '#925603',

      ':hover': {
        color: 'white',
      },
    },
  },
})

export const twitterIcon = style({
  width: '24px',
  marginRight: '5px',
  position: 'relative',
  top: '6px',
})

export const twitterLink = style({
  color: 'black',
  textDecoration: 'none',
})
