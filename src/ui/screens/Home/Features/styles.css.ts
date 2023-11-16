import { style, globalStyle, styleVariants } from '@vanilla-extract/css'

export const content = style({
  marginLeft: '15px',
})

export const icon = style({
  width: '38px',
  height: '38px',
  backgroundSize: '40px',
  border: '1px solid var(--icon-color)',
  borderRadius: '50%',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  flexShrink: '0',
  marginTop: '2px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '@media': {
    '(prefers-color-scheme: dark)': {},
  },
})

globalStyle(`${icon} > svg`, {
  height: '60%',
  display: 'inline-block',
})

export const iconType = styleVariants({
  coming: {
    // backgroundImage: `url(${comingURL})`,
    backgroundSize: '20px',
    backgroundPosition: 'center 8px',
  },

  consistent: {
    // backgroundImage: `url('${consistentURL}')`,
    backgroundSize: '21px',
    backgroundPosition: 'center 7px',
  },

  docs: {
    // backgroundImage: `url('${docsURL}')`,
    backgroundSize: '19px',
    backgroundPosition: 'center 7px',
  },

  fast: {
    // backgroundImage: `url('${fastURL}')`,
    backgroundSize: '15px',
    backgroundPosition: 'center 8px',
  },

  fp: {
    // backgroundImage: `url('${fpURL}')`,
    backgroundSize: '16px',
    backgroundPosition: 'center 8px',
  },

  i18n: {
    // backgroundImage: `url('${i18nURL}')`,
    backgroundSize: '16px',
    backgroundPosition: 'center 9px',
  },

  immutable: {
    // backgroundImage: `url('${immutableURL}')`,
    backgroundSize: '17px',
    backgroundPosition: 'center 6px',
  },

  modular: {
    // backgroundImage: `url('${modularURL}')`,
    backgroundSize: '17px',
    backgroundPosition: 'center 6px',
  },

  native: {
    // backgroundImage: `url('${nativeURL}')`,
    backgroundSize: '24px',
    backgroundPosition: 'center 6px',
  },

  reliable: {
    // backgroundImage: `url('${reliableURL}')`,
    backgroundSize: '21px',
    backgroundPosition: 'center 6px',
  },

  safe: {
    // backgroundImage: `url('${safeURL}')`,
    backgroundSize: '18px',
  },

  simple: {
    // backgroundImage: `url('${simpleURL}')`,
    backgroundSize: '20px',
    backgroundPosition: 'center 8px',
  },

  types: {
    // backgroundImage: `url('${typesURL}')`,
    backgroundSize: '20px',
    backgroundPosition: 'center 8px',
  },
})

export const list = style({
  color: '#4a3142',
  marginTop: '15px',
  fontSize: '17px',
  display: 'flex',
  flexWrap: 'wrap',

  '@media': {
    '(prefers-color-scheme: dark)': {
      color: '#ddd2d9',
    },
  },
})

export const title = style({
  fontWeight: '600',
  fontSize: '17px',
  marginBottom: '5px',
})

export const description = style({
  color: '#4c193c',
  fontWeight: '400',
  fontSize: '16px',
  lineHeight: '22px',

  '@media': {
    '(prefers-color-scheme: dark)': {
      color: '#cbc0c7',
    },
  },
})

globalStyle(`${description} p`, {
  paddingBottom: '0.5rem',
})

globalStyle(`${description} p:last-child`, {
  paddingBottom: '0.5rem',
})

export const item = style({
  display: 'flex',
  flexBasis: 'calc(33.3% - 2rem)',
  margin: '0 1rem 3rem',

  ':last-child': {
    marginBottom: '0',
  },

  '@media': {
    'screen and (max-width: 767px)': {
      flexBasis: 'calc(50% - 2rem)',
    },

    'screen and (max-width: 450px)': {
      flexBasis: '100%',
      margin: '0 0 3rem',
    },
  },
})
