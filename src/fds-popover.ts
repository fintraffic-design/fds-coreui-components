import { css, html, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { TemplateResult } from 'lit-html'
import './fds-card'
import { tokenVar } from './utils/token-utils'
import { FdsColorBrandWhite, FdsRadiusLarge, FdsStyleElevation200 } from '@fintraffic-design/coreui-css'

export enum PopoverPosition {
  ABOVE = 'above',
  BELOW = 'below',
  LEFT = 'left',
  RIGHT = 'right',
}
/**
 * Popover component.
 *
 * @property {PopoverPosition} position - Direction the popover opens
 * @property {boolean} openOnClick - Open popover by clicking
 */
@customElement('fds-popover')
export default class FdsPopover extends LitElement {
  @property() position: PopoverPosition = PopoverPosition.ABOVE
  @property() openOnClick: boolean = false

  @state() private _popoverOpen: boolean = false

  override render(): TemplateResult {
    return html`
      <div>
        <slot
          name="content"
          class="content ${this.openOnClick ? 'clickable' : ''}"
          @click=${this.handleClick}
          @mouseenter=${this.onMouseEnter}
          @mouseleave=${this.onMouseLeave}
        ></slot>
        <div
          class="popover-container popover-container--${this.position} ${this._popoverOpen
            ? 'popover--open'
            : ''}"
        >
          <div class="popover popover--${this.position}">
            <slot></slot>
          </div>
        </div>
      </div>
    `
  }

  onMouseEnter(): void {
    if (!this.openOnClick) {
      this._popoverOpen = true
    }
  }

  onMouseLeave(): void {
    if (!this.openOnClick) {
      this._popoverOpen = false
    }
  }

  handleClick(): void {
    if (this.openOnClick) {
      this._popoverOpen = !this._popoverOpen
    }
  }

  static override styles = css`
    .content {
      cursor: default;
    }

    .clickable {
      cursor: pointer;
    }

    .popover-container {
      visibility: hidden;
      position: relative;
    }

    .popover--open {
      visibility: visible;
    }

    .popover {
      position: absolute;
      border-radius: ${tokenVar(FdsRadiusLarge)};
      box-shadow: ${tokenVar(FdsStyleElevation200)};
      padding: 8px;
      background-color: ${tokenVar(FdsColorBrandWhite)};
      z-index: 1;
    }

    .popover-container--above,
    .popover-container--below {
      display: flex;
      justify-content: center;
    }

    .popover-container--above .popover {
      bottom: 30px;
    }

    .popover-container--below .popover {
      top: 10px;
    }

    .popover::after {
      content: '';
      position: absolute;
      border-width: 5px;
      border-style: solid;
    }

    .popover--above::after {
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-color: ${tokenVar(FdsColorBrandWhite)} transparent transparent transparent;
    }

    .popover--below::after {
      bottom: 100%;
      left: 50%;
      margin-left: -5px;
      border-color: transparent transparent ${tokenVar(FdsColorBrandWhite)} transparent;
    }

    .popover--right::after {
      left: 100%;
      top: 50%;
      margin-top: -5px;
      border-color: transparent transparent transparent ${tokenVar(FdsColorBrandWhite)};
    }

    .popover--left::after {
      right: 100%;
      top: 50%;
      margin-top: -5px;
      border-color: transparent ${tokenVar(FdsColorBrandWhite)} transparent transparent;
    }
  `
}
