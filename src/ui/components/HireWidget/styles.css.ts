import { style } from '@vanilla-extract/css'

export const container = style({
  background: '#f5d958',
  padding: '0.25rem',
})

export const block = style({
  background: '#fcf4ca',
  textDecoration: 'none',
  display: 'flex',
  flexDirection: 'column',
  color: 'black',
  transition: 'background 150ms ease-out',
})

export const blockContent = style({
  padding: '1rem',
})

export const description = style({
  marginTop: '0.5rem',
})

export const hireButton = style({
  marginTop: '1rem',
  flex: 'none',
  height: '2rem',
  fontSize: '1rem',
  background: '#129e4f',
  color: 'white',
  border: '0',
  padding: '0 1rem',
  cursor: 'pointer',
  alignItems: 'center',
  textDecoration: 'none',
  display: 'flex',
  justifyContent: 'center',

  ':hover': {
    background: '#17cf67',
  },
})

export const header = style({
  fontSize: '1.05rem',
  lineHeight: '1.4',
  fontWeight: '600',
})

export const footer = style({
  color: '#837430',
  fontWeight: '600',
  textAlign: 'center',
  display: 'block',
  padding: '0.5rem 0',
  fontSize: '0.8rem',
})
