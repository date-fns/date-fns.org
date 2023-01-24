import { style } from '@vanilla-extract/css'
import iconURL from './img/icon.svg'

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
})

export const icon = style({
  backgroundImage: `url('${iconURL}')`,
  backgroundSize: '16px',
  width: '16px',
  height: '16px',
  flexShrink: '0',
  marginLeft: '10px',
})

export const selected = style({
  backgroundColor: '#fff0f3',

  ':hover': {
    backgroundColor: '#fff0f3',
  },
})

export const title = style({
  fontSize: '1rem',
  marginBottom: '0.4px',
  wordBreak: 'break-all',
  color: '#4c193c',
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
})
