import { style, globalStyle } from '@vanilla-extract/css'

export const block = style({
  background: '#fcf4ca',
  textDecoration: 'none',
  display: 'flex',
  flexDirection: 'column',
  color: 'black',
  transition: 'background 150ms ease-out',

  '@media': {
    '(prefers-color-scheme: dark)': {
      background: '#411302',
    },
  },
})

export const blockClickable = style({
  ':hover': {
    background: '#ffefa5',
  },
})

export const buttons = style({
  display: 'flex',
  justifyContent: 'space-between',
  borderTop: '1px solid #e3dbb6',
  padding: '0.5rem 1rem',
})

export const companyName = style({
  color: '#2c5bf7',
  fontWeight: '600',
})

export const container = style({
  background: '#f5d958',
  padding: '0.25rem',

  '@media': {
    '(prefers-color-scheme: dark)': {
      background: '#641d03',
    },
  },
})

export const footer = style({
  color: '#837430',
  fontWeight: '600',
  textAlign: 'center',
  display: 'block',
  padding: '0.5rem 0',
  fontSize: '0.8rem',
})

export const header = style({
  fontSize: '1.05rem',
  lineHeight: '1.4',
  fontWeight: '600',
})

export const link = style({
  color: '#837430',
  textDecoration: 'none',

  ':hover': {
    color: 'black',
    transition: 'color 150ms ease-out',
  },
})

export const location = style({
  color: '#8f8a72',
})

export const logo = style({
  width: '48px',
  flexShrink: '0',
})

export const nextIcon = style({
  width: '1rem',
})

export const tag = style({
  background: '#e3dbb6',
  color: '#444237',
  padding: '0.25rem 0.4rem',
  borderRadius: '5px',
  fontSize: '0.8rem',
})

export const company = style({
  display: 'flex',
  alignItems: 'center',
  padding: '1rem',
  selectors: {},
})

globalStyle(`${company} > *:not(:last-child)`, {
  marginRight: '1rem',
})

export const nextButton = style({
  display: 'flex',
  background: 'black',
  color: 'white',
  border: '0',
  padding: '0.125rem 0.5rem',
  cursor: 'pointer',
  alignItems: 'center',

  ':hover': {
    color: 'red',
  },
})

globalStyle(`${nextButton} > *:not(:last-child)`, {
  marginRight: '0.25rem',
})

export const tags = style({
  display: 'flex',
})

globalStyle(`${tags} > *:not(:last-child)`, {
  marginRight: '0.5rem',
})
