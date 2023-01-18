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
 * @property {string} class - CSS style class.
 * @property {(e: MouseEvent) => void} onClick - On click handler for the icon.
 */
@customElement('fds-icon')
export default class FdsIcon extends LitElement {
  @property() size: SvgSize = '24'
  @property() color: keyof typeof ColorMap = 'black'
  @property() icon?: keyof typeof IconTypeMap
  @property() class?: string
  @property() onClick?: (e: MouseEvent) => void

  override render(): SVGElement | null {
    if (this.icon === undefined) {
      return null
    }

    const svgElement = createElement(IconTypeMap[this.icon])
    svgElement.setAttribute('color', ColorMap[this.color])
    svgElement.setAttribute('width', this.size)
    svgElement.setAttribute('height', this.size)

    if (this.class !== undefined) {
      svgElement.classList.add(this.class)
    }
    return svgElement
  }
}
