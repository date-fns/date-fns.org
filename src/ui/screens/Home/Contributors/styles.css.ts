import { style } from '@vanilla-extract/css'

export const list = style({
  color: '#4a3142',
  marginTop: '15px',
  fontSize: '17px',
  display: 'flex',
  flexWrap: 'wrap',
  marginBottom: '-20px',
  justifyContent: 'center',
})

export const item = style({
  marginTop: '20px',
  margin: '0 20px 20px 0',
  flexShrink: 0,

  ':last-child': {
    marginBottom: '0',
  },
})

export const linkContent = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

export const avatar = style({
  width: '60px',
  height: '60px',
  borderRadius: '50%',
})

export const name = style({
  fontSize: '14px',
  margin: '5px 0 5px 0',
})
