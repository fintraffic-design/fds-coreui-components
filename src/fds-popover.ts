import { css, html, LitElement } from 'lit'
import { customElement, property, state, queryAssignedElements } from 'lit/decorators.js'
import { TemplateResult } from 'lit-html'
import './fds-card'
import { tokenVar } from './utils/token-utils'
import {
  FdsColorBrandWhite,
  FdsColorToken,
  FdsRadiusLarge,
  FdsStyleElevation200,
} from '@fintraffic-design/coreui-css'
import { uiHelperTextClass } from './utils/css-utils'

export enum FdsPopoverPosition {
  ABOVE = 'above',
  BELOW = 'below',
  LEFT = 'left',
  RIGHT = 'right',
}
/**
 * Popover component.
 *
 * @property {FdsPopoverPosition} position - Direction the popover opens
 * @property {boolean} openOnClick - Open popover by clicking
 * @property {FdsColorToken} backgroundColor - Popover background color
 */
@customElement('fds-popover')
export default class FdsPopover extends LitElement {
  @property() position: FdsPopoverPosition = FdsPopoverPosition.ABOVE
  @property() openOnClick: boolean = false
  @property() backgroundColor: FdsColorToken = FdsColorBrandWhite

  @state() private _popoverOpen: boolean = false

  @state() private _elementHeight: number = 0
  @state() private _elementWidth: number = 0

  @queryAssignedElements({ slot: 'popover' })
  _assignedElements!: Array<HTMLElement>

  protected override willUpdate(): void {
    const wrapper = this.shadowRoot?.querySelector('.wrapper')
    if (wrapper) {
      this._elementHeight = wrapper.clientHeight
      this._elementWidth = wrapper.clientWidth
    }
  }

  override render(): TemplateResult {
    return html`
      <div class="wrapper">
        <slot
          class="content ${this.openOnClick ? 'clickable' : ''}"
          @click=${this.handleClick}
          @mouseenter=${this.onMouseEnter}
          @mouseleave=${this.onMouseLeave}
        ></slot>
        <div class="container ui-helper-text" style=${this.getContainerPositionStyle()}>
          <div
            class="popover popover--${this.position} ${this._popoverOpen ? 'popover--open' : ''}"
            style="${this.getPopoverPositionStyle()} background-color: ${tokenVar(this.backgroundColor)};"
          >
            <slot name="popover"></slot>
            <div class="arrow" style="border-color: ${tokenVar(this.backgroundColor)};"></div>
          </div>
        </div>
      </div>
    `
  }

  private getContainerPositionStyle(): string {
    if (this.position === FdsPopoverPosition.ABOVE) {
      return `bottom: ${this._elementHeight}px;`
    }
    if (this.position === FdsPopoverPosition.LEFT || this.position === FdsPopoverPosition.RIGHT) {
      return `bottom: ${this._elementHeight / 2}px;`
    }
    return ''
  }

  private getPopoverPositionStyle(): string {
    return this.position === FdsPopoverPosition.LEFT
      ? `right: ${this._elementWidth}px;`
      : this.position === FdsPopoverPosition.RIGHT
      ? `left: ${this._elementWidth}px;`
      : ''
  }

  private onMouseEnter(): void {
    if (!this.openOnClick) {
      this._popoverOpen = this._assignedElements.length > 0
    }
  }

  private onMouseLeave(): void {
    if (!this.openOnClick) {
      this._popoverOpen = false
    }
  }

  private handleClick(): void {
    if (this.openOnClick) {
      this._popoverOpen = !this._popoverOpen && this._assignedElements.length > 0
    }
  }

  static override styles = [
    uiHelperTextClass,
    css`
      .container {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .wrapper {
        height: 100%;
        width: 100%;
      }

      .popover {
        visibility: hidden;
        position: absolute;
        border-radius: ${tokenVar(FdsRadiusLarge)};
        box-shadow: ${tokenVar(FdsStyleElevation200)};
        background-color: ${tokenVar(FdsColorBrandWhite)};
        z-index: 1;
      }

      .popover--open {
        visibility: visible;
      }

      .popover--above {
        bottom: 10px;
      }

      .popover--below {
        top: 10px;
      }

      .popover--left {
        margin-right: 10px;
      }

      .popover--right {
        margin-left: 10px;
      }

      /* Popover arrow styles */
      .arrow {
        position: absolute;
        border-width: 5px;
        border-style: solid;
        border-color: ${tokenVar(FdsColorBrandWhite)};
      }

      .popover--above .arrow {
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-bottom-color: transparent !important;
        border-left-color: transparent !important;
        border-right-color: transparent !important;
      }

      .popover--below .arrow {
        bottom: 100%;
        left: 50%;
        margin-left: -5px;
        border-top-color: transparent !important;
        border-left-color: transparent !important;
        border-right-color: transparent !important;
      }

      .popover--left .arrow {
        left: 100%;
        top: 50%;
        margin-top: -5px;
        border-top-color: transparent !important;
        border-bottom-color: transparent !important;
        border-right-color: transparent !important;
      }

      .popover--right .arrow {
        right: 100%;
        top: 50%;
        margin-top: -5px;
        border-top-color: transparent !important;
        border-bottom-color: transparent !important;
        border-left-color: transparent !important;
      }
    `,
  ]
}
