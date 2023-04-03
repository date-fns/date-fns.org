import { style } from '@vanilla-extract/css'

export const option = style({
  listStyle: 'none',
  marginRight: '10px',
})

export const optionLink = style({
  color: '#4a3142',
  textDecoration: 'none',
  fontSize: '13px',
  padding: '4px 8px',
  display: 'block',
  borderTopRightRadius: '3px',
  borderTopLeftRadius: '3px',
  backgroundColor: '#faf6f0',

  '@media': {
    '(prefers-color-scheme: dark)': {
      backgroundColor: '#4a2f3e',
      color: '#c9bec5',
    },
  },
})

export const optionLinkIsCurrent = style({
  color: '#000',
  backgroundColor: '#e8d6e3',

  '@media': {
    '(prefers-color-scheme: dark)': {
      backgroundColor: '#8c1b54',
      color: '#fff',
    },
  },
})

export const options = style({
  listStyle: 'none',
  display: 'flex',
  justifyContent: 'left',
  margin: '0 !important',
})

export const optionSelect = style({
  borderColor: '#5844521a',
  backgroundColor: 'transparent',
  marginLeft: '0.25rem',
  color: '#5d3861',

  '@media': {
    '(prefers-color-scheme: dark)': {
      borderColor: '#2c1622',
    },
  },
})
