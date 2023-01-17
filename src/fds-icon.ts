import { LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { AlertCircle, AlertTriangle, ChevronRight, createElement, PlusCircle, Trash2 } from 'lucide'

const IconTypeMap = {
  'chevron-right': ChevronRight,
  'alert-triangle': AlertTriangle,
  'alert-circle': AlertCircle,
  'plus-circle': PlusCircle,
  'trash-2': Trash2,
}

const ColorMap = {
  black: '#000000',
  gray: '#9696AA',
  interactive: '#1777F8',
  danger: '#B40000',
}

type SvgSize = '18' | '24' | '36'

/**
 * Add interactible icon element. Icon library:
 * https://lucide.dev/
 *
 * @property onClick - On click handler for icon
 * @property color of the icon - options:
 * @property {string} size - Options:
 * - 18
 * - 24
 * - 36
 * - black (default)
 * - gray
 * - interactive
 * - danger
 * @property icon - options:
 * - chevron-right
 * - alert-triangle
 * - alert-circle
 * - plus-circle
 * - trash-2
 */
@customElement('fds-icon')
export class FdsIcon extends LitElement {
  @property() color: keyof typeof ColorMap = 'black'
  @property() size: SvgSize = '24'
  @property() icon?: keyof typeof IconTypeMap
  @property() onClick?: (e: MouseEvent) => void

  override render(): SVGElement | null {
    if (this.icon === undefined) {
      return null
    }

    const svgElement = createElement(IconTypeMap[this.icon])
    svgElement.setAttribute('color', ColorMap[this.color])
    svgElement.setAttribute('width', this.size)
    svgElement.setAttribute('height', this.size)

    return svgElement
  }
}
