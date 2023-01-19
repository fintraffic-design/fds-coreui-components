import { CSSResult, unsafeCSS } from 'lit'
import { FdsToken } from '@fintraffic-design/coreui-css/dist/tokens'

export const tokenVar: (token: FdsToken) => CSSResult = token => {
  return unsafeCSS(['var(--', token.name, ', ', token.value, ')'].join(''))
}
