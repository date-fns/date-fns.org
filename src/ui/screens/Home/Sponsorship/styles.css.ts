import { style, styleVariants } from '@vanilla-extract/css'

export const item = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '0 20px 20px 0',
})

export const itemImage = style({
  width: '100%',
})

export const itemImageContainer = style({
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
})

export const tier = styleVariants({
  bronze: {
    height: '80px',
    width: '80px',
  },

  silver: {
    height: '120px',
    width: '120px',
  },

  gold: {
    height: '150px',
    width: '150px',
  },
})

export const itemImagePlaceholder = style({
  backgroundColor: 'grey',
  height: '7rem',
  width: '7rem',
})

export const itemName = style({
  fontSize: '14px',
  margin: '5px 0 5px 0',
})

export const list = style({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '1rem',
  flexWrap: 'wrap',
  marginRight: '-20px',
})

export const subheader = style({
  fontSize: '18px',
  lineHeight: '22px',
  textAlign: 'center',
  color: '#4c193c',
  marginBottom: '25px',
})
