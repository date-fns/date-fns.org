import { style, globalStyle } from '@vanilla-extract/css'

export const container = style({
  padding: '30px',
  color: '#4a3142',
  backgroundColor: '#fffdf9',
  fontSize: '16px',
  lineHeight: '1.6em',
  width: '100%',
  minHeight: '100%',
})

globalStyle(`${container} a`, {
  color: '#5d3861',
})

globalStyle(`${container} h1`, {
  color: '#770c56',
  fontSize: '2.3rem',
  marginBottom: '30px',
  paddingBottom: '23px',
  borderBottom: '1px solid rgba(88,68,82,0.1)',
})

globalStyle(`${container} h2`, {
  color: '#4a3142',
  fontSize: '1.3rem',
  marginBottom: '15px',
  paddingBottom: '10px',
  marginTop: '30px',
  borderBottom: '1px solid rgba(88,68,82,0.1)',
})

globalStyle(`${container} h3`, {
  color: '#4a3142',
  fontWeight: '500',
  fontSize: '1.2rem',
  marginBottom: '20px',
  marginTop: '20px',
})

globalStyle(`${container} ol`, {
  listStyle: 'decimal',
  maxWidth: '700px',
  marginLeft: '25px',
  marginBottom: '10px',
})

globalStyle(`${container} ol ol`, {
  marginBottom: '0',
})

globalStyle(`${container} ol p + ul`, {
  marginTop: '-10px',
})

globalStyle(`${container} ol pre:last-child`, {
  marginBottom: '10px',
})

globalStyle(`${container} ol ul`, {
  marginBottom: '0',
})

globalStyle(`${container} ol:last-child`, {
  marginBottom: '0',
})

globalStyle(`${container} p`, {
  marginBottom: '10px',
  maxWidth: '700px',
})

globalStyle(`${container} p:empty`, {
  display: 'none',
})

globalStyle(`${container} p:last-child`, {
  marginBottom: '0',
})

globalStyle(`${container} pre`, {
  marginBottom: '10px',
})

globalStyle(`${container} pre:last-child`, {
  marginBottom: '0',
})

globalStyle(`${container} table`, {
  backgroundColor: '#fffffe',
  borderRadius: '2px',
  marginBottom: '10px',
})

globalStyle(`${container} table table`, {
  fontSize: '14px',
})

globalStyle(`${container} table table td`, {
  border: '1px solid #d6cdd3',
  padding: '3px 6px',
})

globalStyle(`${container} table table th`, {
  backgroundColor: '#fdfdfd',
  border: '1px solid #d6cdd3',
  padding: '3px 6px',
})

globalStyle(`${container} table td`, {
  border: '1px solid #b9a2b2',
  padding: '5px 10px',
})

globalStyle(`${container} table th`, {
  border: '1px solid #b9a2b2',
  padding: '5px 10px',
  fontWeight: '600',
  textAlign: 'left',
  backgroundColor: '#faf6f0',
})

globalStyle(`${container} table:last-child`, {
  marginBottom: '0',
})

globalStyle(`${container} ul`, {
  listStyle: 'disc',
  maxWidth: '700px',
  marginLeft: '25px',
  marginBottom: '10px',
})

globalStyle(`${container} ul ol`, {
  marginBottom: '0',
})

globalStyle(`${container} ul p + ul`, {
  marginTop: '-10px',
})

globalStyle(`${container} ul pre:last-child`, {
  marginBottom: '10px',
})

globalStyle(`${container} ul ul`, {
  marginBottom: '0',
})

globalStyle(`${container} ul:last-child`, {
  marginBottom: '0',
})
