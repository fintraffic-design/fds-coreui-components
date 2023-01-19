import { css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { AlertCircle, AlertTriangle, ChevronRight, createElement, PlusCircle, Trash2 } from 'lucide'
import { FdsColorToken, FdsColorText1000 } from '@fintraffic-design/coreui-css/dist/tokens'
import { tokenVar } from './token-utils'

/**
 * Only the common icons needed in fds components are here to keep bundle size smaller
 */
const IconTypeMap = {
  'chevron-right': ChevronRight,
  'alert-triangle': AlertTriangle,
  'alert-circle': AlertCircle,
  'plus-circle': PlusCircle,
  'trash-2': Trash2,
}

type SvgSize = '18' | '24' | '36'

/**
 * Add interactible icon element. Icon library: https://lucide.dev/
 *
 * @property {string} icon - Options:
 * - alert-circle
 * - alert-triangle
 * - chevron-right
 * - plus-circle
 * - trash-2
 * @property {string} size - Options:
 * - 18
 * - 24 (default)
 * - 36
 * @property {string} color - Options:
 * - black (default)
 * - danger
 * - gray
 * - interactive
 */
@customElement('fds-icon')
export default class FdsIcon extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
    }
  `

  @property() size: SvgSize = '24'
  @property() color: FdsColorToken = FdsColorText1000
  @property() icon?: keyof typeof IconTypeMap

  override render(): SVGElement | null {
    if (!this.icon) {
      console.error('icon not defined')
      return null
    }

    const svgElement = createElement(IconTypeMap[this.icon])
    svgElement.setAttribute('color', tokenVar(this.color).cssText)
    svgElement.setAttribute('width', this.size)
    svgElement.setAttribute('height', this.size)
    return svgElement
  }
}
