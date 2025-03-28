import { FdsTokenSize3, FdsSizeToken } from '@fintraffic/fds-coreui-css'
import { css, LitElement } from 'lit'
import { property } from 'lit/decorators.js'
import {
  AlertCircle,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  createElement,
  Menu,
  Plus,
  PlusCircle,
  Trash2,
  X,
  Settings,
  Pencil,
  CheckCircle,
  ChevronsLeftRightEllipsis,
  MessageCircle,
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
  menu: Menu,
  pencil: Pencil,
  plus: Plus,
  'plus-circle': PlusCircle,
  'trash-2': Trash2,
  x: X,
  settings: Settings,
  'check-circle': CheckCircle,
  'chevrons-left-right-ellipsis': ChevronsLeftRightEllipsis,
  'message-circle': MessageCircle,
}

export type FdsIconType = keyof typeof FdsIcons

/**
 * Add interactible icon element. Icon library: https://lucide.dev/
 *
 * @event click - Dispatches a MouseEvent on click.
 *
 * @property {string} icon - Options:
 * - alert-circle
 * - alert-triangle
 * - chevron-down
 * - chevron-right
 * - chevron-up
 * - menu
 * - edit
 * - plus-circle
 * - trash-2
 * - x
 * - settings
 * - check-circle
 * - chevrons-left-right-ellipsis
 * - message-circle
 * @property {string} size - FdsSizeToken
 */
export class FdsIcon extends LitElement {
  @property() size: FdsSizeToken = FdsTokenSize3
  @property() icon?: FdsIconType

  override render(): SVGElement | null {
    if (!this.icon || !FdsIcons[this.icon]) {
      console.error(`invalid icon: '${this.icon}'`)
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
