import { style } from '@vanilla-extract/css'

export const item = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'rgba(255,255,255,0.65)',
  padding: '0.5rem 1rem',
  borderBottom: '1px solid #e6e0e6',
  textDecoration: 'none',

  ':hover': {
    background: '#fdf6f9',
  },

  '@media': {
    '(prefers-color-scheme: dark)': {
      backgroundColor: '#120009',
      borderColor: '#2c1622',

      ':hover': {
        background: '#3c001e',
      },
    },
  },
})

export const icon = style({
  width: '16px',
  height: '16px',
  flexShrink: '0',
  marginLeft: '10px',
})

export const active = style({
  backgroundColor: '#fff0f3',

  ':hover': {
    backgroundColor: '#fff0f3',
  },

  '@media': {
    '(prefers-color-scheme: dark)': {
      backgroundColor: '#35021b',

      ':hover': {
        backgroundColor: '#35021b',
      },
    },
  },
})

export const title = style({
  fontSize: '1rem',
  marginBottom: '0.4px',
  wordBreak: 'break-all',
  color: '#4c193c',

  '@media': {
    '(prefers-color-scheme: dark)': {
      color: '#ddd2d9',
    },
  },
})

export const codeTitle = style({
  fontFamily: 'monospace',
})

export const summary = style({
  fontWeight: '400',
  fontSize: '0.9rem',
  color: '#7b6d77',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  wordBreak: 'break-all',

  '@media': {
    '(prefers-color-scheme: dark)': {
      color: '#9d8995',
    },
  },
})
