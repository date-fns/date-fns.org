import { style } from '@vanilla-extract/css'

export const text = style({
  backgroundColor: '#fffe2500',
})

export const highlightIn = style({
  backgroundColor: '#fffe25',
  transition: 'background-color 0.25s ease-out',
})

export const highlightOut = style({
  backgroundColor: '#fffe2500',
  transition: 'background-color 2.5s ease-out',
})
