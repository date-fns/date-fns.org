import { style } from '@vanilla-extract/css'

export const container = style({
  width: '100%',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
})

export const option = style({
  margin: '0 5px',
})

export const optionLink = style({
  color: '#770c56',
  textDecoration: 'none',
  fontSize: '14px',
  padding: '10px 15px',
  display: 'block',
  borderTopRightRadius: '3px',
  borderTopLeftRadius: '3px',
  backgroundColor: '#efe8df',
})

export const optionLinkIsCurrent = style({
  color: 'white',
  backgroundColor: '#770c56',
})

export const options = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
})

export const warning = style({
  background: '#fff8b9',
  borderRadius: '0.2rem',
  padding: '1rem',
  color: '#4c2f01',
  margin: '1rem auto 0',
  maxWidth: '44rem',
})

export const codeWrapper = style({
  width: '700px',

  '@media': {
    'screen and (max-width: 767px)': {
      width: 'calc(100vw-60px)',
    },
  },
})
