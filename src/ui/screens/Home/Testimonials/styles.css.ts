import { style } from '@vanilla-extract/css'

export const avatar = style({
  flexBasis: '60px',
  flexShrink: '0',
  marginRight: '20px',
})

export const avatarImage = style({
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  border: '1px solid #e4e4dd',

  '@media': {
    '(prefers-color-scheme: dark)': {
      borderColor: '#2c1622',
    },
  },
})

export const list = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  marginBottom: '-30px',
})

export const name = style({
  fontWeight: '600',
  fontSize: '17px',
  marginBottom: '5px',

  '@media': {
    '(prefers-color-scheme: dark)': {
      color: '#ddd2d9',
    },
  },
})

export const quote = style({
  border: '1px solid #e4e4dd',
  borderRadius: '4px',
  backgroundColor: 'white',
  padding: '16px 15px 15px',
  flexGrow: '1',
  position: 'relative',

  '@media': {
    '(prefers-color-scheme: dark)': {
      borderColor: '#2c1622',
      backgroundColor: '#14070e',
    },
  },
})

export const quoteTriangle = style({
  width: '0',
  height: '0',
  borderTop: '12px solid rgba(0,0,0,0)',
  borderBottom: '12px solid rgba(0,0,0,0)',
  borderRight: '12px solid #e4e4dd',
  position: 'absolute',
  top: '16px',
  left: '-12px',

  '@media': {
    '(prefers-color-scheme: dark)': {
      borderRightColor: '#31292d',
    },
  },
})

export const quoteTriangleInner = style({
  position: 'relative',
  top: '-11px',
  left: '1px',
  width: '0',
  height: '0',
  borderTop: '11px solid rgba(0,0,0,0)',
  borderBottom: '11px solid rgba(0,0,0,0)',
  borderRight: '11px solid #fff',

  '@media': {
    '(prefers-color-scheme: dark)': {
      borderRightColor: '#14070e',
    },
  },
})

export const text = style({
  color: '#4c193c',
  fontWeight: '400',
  fontSize: '16px',
  lineHeight: '22px',

  '@media': {
    '(prefers-color-scheme: dark)': {
      color: '#cbc0c7',
    },
  },
})

export const item = style({
  display: 'flex',
  flexBasis: 'calc(50% - 50px)',
  margin: '0 50px 30px 0',

  '@media': {
    'screen and (max-width: 767px)': {
      display: 'flex',
      flexBasis: '100%',
      margin: '0 0 30px',
    },
  },
})
