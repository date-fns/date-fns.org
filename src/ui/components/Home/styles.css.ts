import { style, globalStyle, styleVariants } from '@vanilla-extract/css'

export const action = style({
  color: '#8c1b54',
  marginTop: '20px',

  '@media': {
    '(prefers-color-scheme: dark)': {
      color: '#d397b6',
    },
  },
})

export const buttonBase = style({
  marginTop: '30px',
  display: 'block',
  textAlign: 'center',
  textDecoration: 'none',
  borderRadius: '3px',
  fontSize: '16px',
  padding: '15px 30px',
})

export const button = styleVariants({
  primary: [
    buttonBase,
    {
      background: '#8c1b54',
      color: '#fff',
      border: '1px solid #8c1b54',
    },
  ],

  secondary: [
    buttonBase,
    {
      background: 'transparent',
      color: '#8c1b54',
      border: '1px solid #8c1b54',

      '@media': {
        '(prefers-color-scheme: dark)': {
          color: '#bb8aa2',
          borderColor: '#bb8aa2',
        },
      },
    },
  ],
})

export const header = style({
  color: '#770c56',
  fontWeight: '600',
  fontSize: '20px',

  '@media': {
    '(prefers-color-scheme: dark)': {
      color: '#ddd2d9',
    },
  },
})

export const subHeader = style({
  color: '#770c56',
  marginTop: '0.8rem',
  fontSize: '1rem',

  '@media': {
    '(prefers-color-scheme: dark)': {
      color: '#fbd7a1',
    },
  },
})

export const innerContainer = style({
  maxWidth: '1200px',
  padding: '75px 30px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

export const link = style({
  color: '#862d5b',
  textDecoration: 'none',

  '@media': {
    '(prefers-color-scheme: dark)': {
      color: '#e1a8c5',

      ':hover': {
        color: '#d397b6',
      },
    },
  },
})

export const linkDecorated = style({
  textDecoration: 'underline',
})

export const actions = style({
  display: 'flex',
  alignItems: 'center',
})

globalStyle(`${actions} :not(:last-child)`, {
  marginRight: '1rem',
})

export const block = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderBottom: '1px solid #e4e4dd',

  ':last-child': {
    borderBottom: 'none',
  },

  selectors: {
    '&:nth-child(even)': {
      backgroundColor: '#fffbf5',
    },

    '&:nth-child(odd)': {
      backgroundColor: '#fffdfa',
    },
  },

  '@media': {
    '(prefers-color-scheme: dark)': {
      borderColor: '#2c1622',

      selectors: {
        '&:nth-child(even)': {
          backgroundColor: '#1a030f',
        },

        '&:nth-child(odd)': {
          backgroundColor: '#12020a',
        },
      },
    },
  },
})

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  selectors: {
    '&:not(:first-child)': {
      marginTop: '30px',
    },
  },
})

export const text = style({
  fontSize: '16px',
  lineHeight: '22px',
  textAlign: 'center',
  color: '#4c193c',
  maxWidth: '500px',

  '@media': {
    '(prefers-color-scheme: dark)': {
      color: '#cbc0c7',
    },
  },
})

globalStyle(`${text} img`, {
  marginBottom: '1rem',
})

globalStyle(`${text} p`, {
  marginBottom: '1rem',
})

globalStyle(`${text} p:last-child`, {
  marginBottom: '0',
})
