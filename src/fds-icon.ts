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
  Plus,
  PlusCircle,
  Trash2,
  X,
  Settings,
  Edit,
} from 'lucide'

/**
 * Only the common icons needed in fds components are here to keep bundle size smaller
 */
export const FdsIcons = {
  'alert-circle': AlertCircle,
  'alert-triangle': AlertTriangle,
  'chevron-down': ChevronDown,
  'chevron-right': ChevronRight,
  'chevron-up': ChevronUp,
  edit: Edit,
  plus: Plus,
  'plus-circle': PlusCircle,
  'trash-2': Trash2,
  x: X,
  settings: Settings,
}

export type FdsIconType = keyof typeof FdsIcons

/**
 * Add interactible icon element. Icon library: https://lucide.dev/
 *
 * @property {string} icon - Options:
 * - alert-circle
 * - alert-triangle
 * - chevron-down
 * - chevron-right
 * - chevron-up
 * - edit
 * - plus-circle
 * - trash-2
 * - x
 * - settings
 * @property {string} size - FdsSizeToken
 */
@customElement('fds-icon')
export default class FdsIcon extends LitElement {
  @property() size: FdsSizeToken = FdsSize3
  @property() icon?: FdsIconType

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

  static override styles = css`
    :host {
      display: inline-flex;
    }
  `
}
