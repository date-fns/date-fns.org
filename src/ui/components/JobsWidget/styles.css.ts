import { style, globalStyle } from '@vanilla-extract/css'

export const container = style({
  background: '#fff5c8',
  borderTop: '1px solid #e6e0e6',

  '@media': {
    '(prefers-color-scheme: dark)': {
      background: '#1d0714',
      borderColor: '#2c1622',
    },
  },
})

export const block = style({
  background: '#fffbe8',
  textDecoration: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  color: 'black',
  transition: 'background 150ms ease-out',
  margin: '0.25rem',
  padding: '1rem',
  border: '1px solid #beb56a',

  '@media': {
    '(prefers-color-scheme: dark)': {
      background: '#2f031a',
      borderColor: '#472136',
    },
  },
})

export const blockClickable = style({
  ':hover': {
    background: '#ffefa5',
  },

  '@media': {
    '(prefers-color-scheme: dark)': {
      ':hover': {
        background: '#50112b',
      },
    },
  },
})

export const main = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  selectors: {},
})

globalStyle(`${main} > *:not(:last-child)`, {
  marginRight: '1rem',
})

export const companyInfo = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
})

export const companyAndLocation = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '0.25rem',
})

export const hiringLabel = style({
  color: '#302801',
  fontSize: '1rem',

  '@media': {
    '(prefers-color-scheme: dark)': {
      color: '#fff6fc',
    },
  },
})

export const companyName = style({
  fontWeight: '600',
})

export const location = style({
  color: '#8f8a72',
  fontSize: '0.9rem',

  '@media': {
    '(prefers-color-scheme: dark)': {
      color: '#9d8995',
    },
  },
})

export const apply = style({
  padding: '0.5rem 1rem',
  background: '#ffea37',
  color: '#302801',

  '@media': {
    '(prefers-color-scheme: dark)': {
      background: '#83264d',
      color: '#ffd3ee',
    },
  },
})

export const footer = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.5rem 0.5rem',
  fontSize: '0.8rem',
})

export const footerLink = style({
  color: '#837430',
  display: 'block',
  padding: '0.3rem 0',
  fontSize: '0.8rem',
})

export const nextButton = style({
  display: 'flex',
  background: '#6f6d62',
  color: 'white',
  border: '0',
  padding: '0.125rem 0.5rem',
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'space-between',

  ':hover': {
    background: 'black',
  },

  '@media': {
    '(prefers-color-scheme: dark)': {
      color: '#f6e3ea',
      background: '#2f031a',
      borderColor: '#472136',

      ':hover': {
        color: 'white',
        background: '#50112b',
      },
    },
  },
})

export const nextButtonLabel = style({
  marginRight: '0.3rem',
})

export const header = style({
  fontSize: '1.05rem',
  lineHeight: '1.4',
  fontWeight: '600',
})

export const link = style({
  color: '#837430',
  textDecoration: 'none',
  lineHeight: 1,

  ':hover': {
    color: 'black',
    transition: 'color 150ms ease-out',
  },

  '@media': {
    '(prefers-color-scheme: dark)': {
      color: '#cbc0c7',

      ':hover': {
        color: '#f6e3ea',
      },
    },
  },
})

export const logoWrapper = style({
  width: '54px',
  height: '54px',
  borderRadius: '50%',
  overflow: 'hidden',
  background: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const logo = style({
  width: '54px',
  flexShrink: '0',
})

export const nextIcon = style({
  width: '1rem',
})

export const tag = style({
  background: '#ede6c6',
  color: '#444237',
  padding: '0.25rem 0.4rem',
  borderRadius: '5px',
  fontSize: '0.8rem',

  '@media': {
    '(prefers-color-scheme: dark)': {
      background: '#412333',
      color: '#fff6fc',
    },
  },
})

export const tags = style({
  display: 'flex',
  justifyContent: 'center',
})

globalStyle(`${tags} > *:not(:last-child)`, {
  marginRight: '0.5rem',
})
