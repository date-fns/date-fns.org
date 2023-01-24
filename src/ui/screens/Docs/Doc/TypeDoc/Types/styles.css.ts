import { globalStyle, style, styleVariants } from '@vanilla-extract/css'

export const badgeBase = style({
  fontSize: '1.1rem',
  padding: '.1rem .3rem',
  borderRadius: '5px',
  border: '1px solid black',
  verticalAlign: 'top',
})

export const badge = styleVariants({
  alias: [
    badgeBase,
    {
      color: '#146066',
      borderColor: '#5ae6f1',
      backgroundColor: '#d5fcff',
    },
  ],

  interface: [
    badgeBase,
    {
      color: '#004813',
      borderColor: '#9dbfa6',
      backgroundColor: '#e2f7e8',
    },
  ],

  generic: [
    badgeBase,
    {
      color: '#786c07',
      borderColor: '#ddd491',
      backgroundColor: '#fffad7',
    },
  ],
})

export const wrapper = style({
  display: 'grid',
  gridTemplateColumns: '23rem auto',
  maxHeight: '50rem',
  gridTemplateRows: '1fr',
})

export const item = style({
  textDecoration: 'none',
})

export const nav = style({
  borderRight: '1px solid #e6e0e6',
  overflowY: 'auto',
})

export const content = style({
  padding: '2rem',
  overflowY: 'auto',
})

globalStyle(`${content} h3`, {
  marginBottom: '1rem',
  paddingBottom: '0.5rem',
  borderBottom: '1px solid #5844521a',
})

export const header = style({
  color: '#770c56',
  fontSize: '1.5rem',
  marginBottom: '1rem',
  fontFamily: 'monospace',
  paddingBottom: '1rem',
  borderBottom: '1px solid #5844521a',
})

export const summary = style({
  fontSize: '1rem',
})

export const code = style({
  overflowX: 'auto',
  border: '1px solid #b9a2b2',
  backgroundColor: '#fffffe',
  padding: '.25rem .5rem',
  fontFamily: 'monospace',
})
