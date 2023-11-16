import { style, globalStyle } from '@vanilla-extract/css'

export const badge = style({
  background: '#9a0f98',
  padding: '0.25rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const badgeLabel = style({
  color: 'white',
  fontWeight: '600',
})

export const badgeNext = style({
  background: 'transparent',
  color: 'white',
  border: '1px solid white',
  borderRadius: '0.25rem',
  cursor: 'pointer',

  ':hover': {
    color: '#9a0f98',
    background: 'white',
  },
})

export const cover = style({
  width: '6rem',
  flexShrink: '0',
})

export const description = style({
  lineHeight: '1.4',
  fontSize: '0.9rem',
  color: '#fdf4dc',
})

export const container = style({
  padding: '0.5rem',
  background: '#39065a',
  color: '#fff6f6',
  display: 'flex',
  alignItems: 'flex-start',
  textDecoration: 'none',
  transition: 'background 150ms ease-out',

  ':hover': {
    background: '#6a0572',
  },
})

globalStyle(`${container} > *:not(:last-child)`, {
  marginRight: '0.75rem',
})

export const header = style({})

globalStyle(`${header} > *:not(:last-child)`, {
  marginBottom: '0.125rem',
})

export const link = style({
  background: '#ea0599',
  padding: '0.25rem 0.5rem',
  display: 'inline-block',
  color: 'white',
  fontSize: '1rem',
  fontWeight: '500',
  borderRadius: '0.25rem',
  transition: 'background 150ms ease-out',
  border: 'none',
  cursor: 'pointer',
  selectors: {
    [`${container}:hover &`]: {
      background: '#ff00a5',
    },
  },
})

export const text = style({
  lineHeight: '1.2',
})

globalStyle(`${text} > *:not(:last-child)`, {
  marginBottom: '0.5rem',
})

export const title = style({
  fontWeight: '600',
  fontSize: '1.25rem',
  color: '#ead7af',
  selectors: {
    [`${container}:hover &`]: {
      textDecoration: 'underline',
    },
  },
})
