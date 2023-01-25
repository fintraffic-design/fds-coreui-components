import { CSSResult, unsafeCSS } from 'lit'
import { FdsToken } from '@fintraffic-design/coreui-css'

export const tokenVar: (token: FdsToken) => CSSResult = token => {
  if (token == null || token.name == null || token.value == null) {
    console.error('invalid FdsToken', token)
    return unsafeCSS('')
  }
  return unsafeCSS(['var(--', token.name, ', ', token.value, ')'].join(''))
}
