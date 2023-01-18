import { CSSResult, unsafeCSS } from 'lit'
import { tokens } from '@fintraffic-design/coreui-css/dist/tokens'

export const token: (key: keyof typeof tokens) => CSSResult = key => {
  const value = tokens[key]
  if (value == null) {
    console.error('invalid token', key)
  }
  return unsafeCSS(value)
}
export type Color = keyof typeof tokens & `color-${string}`
