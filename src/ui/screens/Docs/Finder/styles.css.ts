import { style } from '@vanilla-extract/css'

export const categoriesList = style({
  flexGrow: '1',
})

export const category = style({
  ':first-child': {
    marginTop: '0',
  },
})

export const categoryHeader = style({
  fontWeight: '600',
  fontSize: '1rem',
  lineHeight: '1',
  color: '#4a3142',
  padding: '0.5rem 1rem',
  borderBottom: '1px solid #e6e0e6',
  position: 'sticky',
  top: '0',
  backgroundColor: '#fffbf5',
})

export const container = style({
  height: '100%',
  width: '100%',
  background: '#fffbf5',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  borderRight: '1px solid #e6e0e6',
})

export const content = style({
  flex: 'auto',
  overflowY: 'auto',
  overflowX: 'hidden',
})

export const loading = style({
  padding: '30px',
})

export const logoImage = style({
  cursor: 'pointer',
  height: '30px',
  marginRight: '10px',
})

export const noResultsContainer = style({
  display: 'flex',
  flexGrow: '1',
  alignItems: 'center',
  justifyContent: 'center',
})

export const noResultsText = style({
  fontWeight: '400',
  fontSize: '15px',
  lineHeight: '18px',
  color: '#7b6d77',
})

export const widgetContainer = style({
  flex: 'none',
})

export const item = style({
  textDecoration: 'none',
})
