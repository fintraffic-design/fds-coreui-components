import { FdsSize3, FdsSizeToken } from '@fintraffic-design/coreui-css'
import { css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import {
  AlertCircle,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  createElement,
  PlusCircle,
  Trash2,
  X
} from 'lucide'
import { FdsColorToken, FdsColorBrandBlack } from '@fintraffic-design/coreui-css/dist/tokens'
import { tokenVar } from './token-utils'

/**
 * Only the common icons needed in fds components are here to keep bundle size smaller
 */
export const FdsIcons = {
  'chevron-right': ChevronRight,
  'chevron-up': ChevronUp,
  'chevron-down': ChevronDown,
  'alert-triangle': AlertTriangle,
  'alert-circle': AlertCircle,
  'plus-circle': PlusCircle,
  'trash-2': Trash2,
  x: X,
}

/**
 * Add interactible icon element. Icon library: https://lucide.dev/
 *
 * @property {string} icon - Options:
 * - alert-circle
 * - alert-triangle
 * - chevron-down
 * - chevron-right
 * - chevron-up
 * - plus-circle
 * - trash-2
 * - x
 * @property {string} size - FdsSizeToken
 */
@customElement('fds-icon')
export default class FdsIcon extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
    }
  `

  @property() size: FdsSizeToken = FdsSize3
  @property() icon?: keyof typeof FdsIcons

  override render(): SVGElement | null {
    if (!this.icon) {
      console.error('icon not defined')
      return null
    }

    const svgElement = createElement(FdsIcons[this.icon])
    svgElement.setAttribute('width', this.size.value)
    svgElement.setAttribute('height', this.size.value)
    return svgElement
  }
}
