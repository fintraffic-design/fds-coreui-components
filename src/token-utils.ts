import { CSSResult, unsafeCSS } from 'lit'
import { tokens } from '@fintraffic-design/coreui-css/dist/tokens'

export const token: (key: keyof typeof tokens) => CSSResult = key => unsafeCSS(tokens[key])
