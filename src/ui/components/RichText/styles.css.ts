import { style, globalStyle } from '@vanilla-extract/css'

export const content = style({
  fontSize: '1rem',
  lineHeight: '1.6em',
})

globalStyle(`${content} a`, {
  color: '#5d3861',
})

globalStyle(`${content} h1`, {
  color: '#770c56',
  fontSize: '2.3rem',
  marginBottom: '30px',
  paddingBottom: '23px',
  borderBottom: '1px solid rgba(88,68,82,0.1)',
})

globalStyle(`${content} h2`, {
  color: '#4a3142',
  fontSize: '1.3rem',
  marginBottom: '15px',
  paddingBottom: '10px',
  marginTop: '30px',
  borderBottom: '1px solid rgba(88,68,82,0.1)',
})

globalStyle(`${content} h3`, {
  color: '#4a3142',
  fontWeight: '500',
  fontSize: '1.2rem',
  marginBottom: '20px',
  marginTop: '20px',
})

globalStyle(`${content} ol`, {
  listStyle: 'decimal',
  maxWidth: '700px',
  marginLeft: '25px',
  marginBottom: '10px',
})

globalStyle(`${content} ol ol`, {
  marginBottom: '0',
})

globalStyle(`${content} ol p + ul`, {
  marginTop: '-10px',
})

globalStyle(`${content} ol pre:last-child`, {
  marginBottom: '10px',
})

globalStyle(`${content} ol ul`, {
  marginBottom: '0',
})

globalStyle(`${content} ol:last-child`, {
  marginBottom: '0',
})

globalStyle(`${content} p`, {
  marginBottom: '10px',
  maxWidth: '700px',
})

globalStyle(`${content} p:empty`, {
  display: 'none',
})

globalStyle(`${content} p:last-child`, {
  marginBottom: '0',
})

globalStyle(`${content} pre`, {
  marginBottom: '10px',
})

globalStyle(`${content} pre:last-child`, {
  marginBottom: '0',
})

globalStyle(`${content} table`, {
  backgroundColor: '#fffffe',
  borderRadius: '2px',
  marginBottom: '10px',
})

globalStyle(`${content} table table`, {
  fontSize: '14px',
})

globalStyle(`${content} table table td`, {
  border: '1px solid #d6cdd3',
  padding: '3px 6px',
})

globalStyle(`${content} table table th`, {
  backgroundColor: '#fdfdfd',
  border: '1px solid #d6cdd3',
  padding: '3px 6px',
})

globalStyle(`${content} table td`, {
  border: '1px solid #b9a2b2',
  padding: '5px 10px',
})

globalStyle(`${content} table th`, {
  border: '1px solid #b9a2b2',
  padding: '5px 10px',
  fontWeight: '600',
  textAlign: 'left',
  backgroundColor: '#faf6f0',
})

globalStyle(`${content} table:last-child`, {
  marginBottom: '0',
})

globalStyle(`${content} ul`, {
  listStyle: 'disc',
  maxWidth: '700px',
  marginLeft: '25px',
  marginBottom: '10px',
})

globalStyle(`${content} ul ol`, {
  marginBottom: '0',
})

globalStyle(`${content} ul p + ul`, {
  marginTop: '-10px',
})

globalStyle(`${content} ul pre:last-child`, {
  marginBottom: '10px',
})

globalStyle(`${content} ul ul`, {
  marginBottom: '0',
})

globalStyle(`${content} ul:last-child`, {
  marginBottom: '0',
})
