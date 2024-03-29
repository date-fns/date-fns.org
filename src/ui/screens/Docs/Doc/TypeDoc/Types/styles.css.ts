import { globalStyle, style, styleVariants } from '@vanilla-extract/css'

export const wrapper = style({
  height: 'min(calc(100vh - 8rem), 50rem)',
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
})

export const title = style({
  background: '#ebe1d8',
  borderBottom: '1px solid #e6e0e6',
  padding: '.5rem 1rem',
  fontSize: '1rem',
  fontWeight: 600,
  color: '#7b6d77',

  '@media': {
    '(prefers-color-scheme: dark)': {
      background: '#280215',
      borderColor: '#2c1622',
      color: '#cbc0c7',
    },
  },
})

export const titleIcon = style({
  width: '1.2rem',
  color: '#8d6831',
  position: 'relative',
  top: '2px',
  marginRight: '.25rem',

  '@media': {
    '(prefers-color-scheme: dark)': {
      color: '#c99952',
    },
  },
})

export const titleParent = style({
  fontFamily: 'monospace',
})

export const main = style({
  display: 'grid',
  gridTemplateColumns: '23rem auto',
  gridTemplateRows: '1fr',
  overflow: 'hidden',
})

export const item = style({
  textDecoration: 'none',
})

export const nav = style({
  borderRight: '1px solid #e6e0e6',
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
  overflow: 'hidden',

  '@media': {
    '(prefers-color-scheme: dark)': {
      borderColor: '#2c1622',
    },
  },
})

export const list = style({
  overflowY: 'auto',
})

export const noResults = style({
  textAlign: 'center',
  padding: '1rem',
})

export const content = style({
  padding: '2rem',
  overflowY: 'auto',
})

globalStyle(`${content} h3`, {
  marginBottom: '1rem',
  paddingBottom: '0.5rem',
  borderBottom: '1px solid #5844521a',

  '@media': {
    '(prefers-color-scheme: dark)': {
      borderColor: '#2c1622',
    },
  },
})

export const header = style({
  color: '#770c56',
  marginBottom: '1rem',
  paddingBottom: '1rem',
  borderBottom: '1px solid #5844521a',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  '@media': {
    '(prefers-color-scheme: dark)': {
      borderColor: '#2c1622',
      color: '#fff6fc',
    },
  },
})

export const headerText = style({
  fontSize: '1.5rem',
  fontFamily: 'monospace',
})

export const badgeBase = style({
  fontSize: '1.1rem',
  padding: '.1rem .3rem',
  borderRadius: '5px',
  border: '1px solid black',
  marginLeft: '.5rem',
  position: 'relative',
  top: '-1px',
})

export const badge = styleVariants({
  alias: [
    badgeBase,
    {
      color: '#146066',
      borderColor: '#5ae6f1',
      backgroundColor: '#d5fcff',

      '@media': {
        '(prefers-color-scheme: dark)': {
          color: '#00b3b3',
          borderColor: '#4d6a6a',
          backgroundColor: '#0f1a1a',
        },
      },
    },
  ],

  interface: [
    badgeBase,
    {
      color: '#004813',
      borderColor: '#9dbfa6',
      backgroundColor: '#e2f7e8',

      '@media': {
        '(prefers-color-scheme: dark)': {
          color: '#00b300',
          borderColor: '#4d6a4d',
          backgroundColor: '#0f1a0f',
        },
      },
    },
  ],

  generic: [
    badgeBase,
    {
      color: '#786c07',
      borderColor: '#ddd491',
      backgroundColor: '#fffad7',

      '@media': {
        '(prefers-color-scheme: dark)': {
          color: '#b3a900',
          borderColor: '#4d4d33',
          backgroundColor: '#1a1a00',
        },
      },
    },
  ],
})

export const summary = style({
  fontSize: '1rem',
})
