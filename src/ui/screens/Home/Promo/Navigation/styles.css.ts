import { style } from '@vanilla-extract/css'

export const icon = style({
  width: '16px',
  marginRight: '5px',
  position: 'relative',
  top: '2px',
})

export const link = style({
  color: 'white',
  margin: '5px 10px',
  textDecoration: 'none',
  opacity: '0.5',
  ':hover': {
    opacity: '1',
  },
})

export const navigation = style({
  margin: '0 -10px',
  fontSize: '15px',
  '@media': {
    'screen and (max-width: 767px)': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
})
