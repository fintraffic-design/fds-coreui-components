import { css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import * as lucide from 'lucide'
import { Color, token } from './token-utils'

type SvgSize = '18' | '24' | '36'

/**
 * Add interactible icon element. Icon library: https://lucide.dev/
 *
 * @property {string} icon
 * Any lucide icon name in PascalCase eg: AlertCircle
 * @property {string} size - Options:
 * - 18
 * - 24 (default)
 * - 36
 * @property {string} color - Options:
 * Any fds design token color value.
 * Default: color-text-1000
 */
@customElement('fds-icon')
export default class FdsIcon extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
    }
  `

  @property() size: SvgSize = '24'
  @property() color: Color = 'color-text-1000'
  @property() icon: keyof typeof lucide.icons = 'AlertCircle'

  override render(): SVGElement | null {
    const lucideIcon = lucide[this.icon]
    if (lucideIcon == null) {
      console.error('invalid icon', this.icon)
      return null
    }
    const svgElement = lucide.createElement(lucideIcon)
    svgElement.setAttribute('color', token(this.color).cssText)
    svgElement.setAttribute('width', this.size)
    svgElement.setAttribute('height', this.size)
    return svgElement
  }
}
