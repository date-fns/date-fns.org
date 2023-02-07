import { globalStyle, style } from '@vanilla-extract/css'

export const wrapper = style({
  display: 'inline-block',
})

export const inlineWrapper = style({
  display: 'inline',
})

export const blockWrapper = style({})

globalStyle(`${wrapper} > *`, {
  width: '100%',
})
