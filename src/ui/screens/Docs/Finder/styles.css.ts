import { style } from '@vanilla-extract/css'
import cancelURL from './img/cancel.svg'

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

export const search = style({
  position: 'relative',
  flex: 'none',
  color: '#770c56',
  fontWeight: '600',
  fontSize: '20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#faf6f0',
  borderBottom: '1px solid #e6e0e6',
  wordBreak: 'break-all',
})

export const searchCancel = style({
  height: '16px',
  width: '16px',
  top: '50%',
  marginTop: '-9px',
  cursor: 'pointer',
  backgroundImage: `url('${cancelURL}')`,
  backgroundSize: '16px',
  position: 'absolute',
  right: '1.5rem',
})

export const searchField = style({
  padding: '0.75rem 1rem',
  border: '0',
  width: '100%',
  fontSize: '1rem',
})

export const widgetContainer = style({
  flex: 'none',
})

export const item = style({
  textDecoration: 'none',
})
