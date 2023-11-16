import { style } from '@vanilla-extract/css'
import cancelURL from './img/cancel.svg'

export const search = style({
  position: 'relative',
  flex: 'none',
  color: '#770c56',
  fontWeight: '600',
  fontSize: '20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #e6e0e6',
  wordBreak: 'break-all',

  '@media': {
    '(prefers-color-scheme: dark)': {
      borderColor: '#2c1622',
    },
  },
})

export const bordered = style({
  border: '1px solid #e6e0e6',
})

export const cancel = style({
  height: '16px',
  width: '16px',
  top: '50%',
  marginTop: '-9px',
  cursor: 'pointer',
  backgroundImage: `url('${cancelURL}')`,
  backgroundSize: '16px',
  position: 'absolute',
  right: '1rem',
})

export const input = style({
  padding: '0.75rem 1rem',
  border: '0',
  width: '100%',
  fontSize: '1rem',
  backgroundColor: 'white',

  '@media': {
    '(prefers-color-scheme: dark)': {
      backgroundColor: '#120009',
      color: 'white',
    },
  },
})
