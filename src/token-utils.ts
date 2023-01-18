import { CSSResult, unsafeCSS } from 'lit'
import { tokens } from './tokens'

export const token: (key: keyof typeof tokens) => CSSResult = key => unsafeCSS(tokens[key])
