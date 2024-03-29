import {
  FdsColorBrandBlack,
  FdsColorBrandWhite,
  FdsColorNeutral100,
  FdsColorText300,
  uiLabelTextClass,
} from '@fintraffic/fds-coreui-css'
import { css, html, LitElement, unsafeCSS, adoptStyles, CSSResult } from 'lit'
import { nothing, TemplateResult } from 'lit-html'
import { property, state } from 'lit/decorators.js'
import { FdsIcon, FdsIconType } from './icon.js'
import { styleMap } from 'lit/directives/style-map.js'

// Declare used elements to avoid lit-plugin(no-unknown-tag-name) warning
// These components still need to be registered separately (by the importing app).
declare global {
  interface HTMLElementTagNameMap {
    'fds-icon': FdsIcon
  }
}

export enum FdsNavigationVariant {
  primary = 'primary',
  secondary = 'secondary',
}

export interface FdsNavigationItem<T = string> {
  label: string
  value: T
  position?: FdsNavigationItemPosition
  verticalMenuOrder?: number
  icon?: FdsIconType
}

export enum FdsNavigationItemPosition {
  left = 'left',
  right = 'right',
}
/**
 * Navigation component.
 *
 * @property {FdsNavigationVariant} variant - Primary or secondary style
 * @property {FdsNavigationItem[]} items - List of navigation items
 * @property {FdsNavigationItem} selected - Currently selected value
 * @property {string} verticalMenuNavText - Text for vertical menu navigation button
 * @property {number} verticalMenuThreshold - Width in pixels when navigation is collapsed
 * @event select - Triggered when destination is clicked. The selected item is in event details field.
 */
export class FdsNavigation extends LitElement {
  @property() variant: FdsNavigationVariant = FdsNavigationVariant.primary
  @property() items: FdsNavigationItem[] = []
  @property() selected?: FdsNavigationItem
  @property({ attribute: 'vertical-menu-nav-text' }) verticalMenuNavText: string = ''
  @property({ type: Number, attribute: 'vertical-menu-threshold' }) verticalMenuThreshold = 768

  @state() private _open = false

  override connectedCallback(): void {
    super.connectedCallback()
    adoptStyles(this.shadowRoot as ShadowRoot, [
      FdsNavigation.cssVariables,
      uiLabelTextClass,
      FdsNavigation.collapsedNavigationStyles,
      this.desktopStyles(),
    ])
  }

  override render(): TemplateResult {
    const itemsOnRight = this.items.filter(item => item.position === FdsNavigationItemPosition.right)
    const itemsOnLeft = this.items.filter(item => item.position !== FdsNavigationItemPosition.right)
    return html` <div class="navigation-wrapper">
      <div class="navigation navigation--${this.variant} ui-label-text">
        ${this.variant === FdsNavigationVariant.primary
          ? html` <div class="navigation__header">
              <slot></slot>
            </div>`
          : nothing}
        <ul class="navigation__body ${this._open ? 'navigation__open' : ''}">
          ${itemsOnLeft
            .map(item => this.renderItem(item))
            .concat(
              itemsOnRight.map((item, index) => this.renderItem(item, index === 0 ? 'item__first-right' : ''))
            )}
        </ul>
        <div class="navigation__button-wrapper">${this.renderNavigationButton()}</div>
      </div>
    </div>`
  }

  renderNavigationButton(): TemplateResult {
    let icon
    switch (this.variant) {
      case FdsNavigationVariant.primary:
        icon = this._open
          ? html`<fds-icon icon="chevron-up"></fds-icon>`
          : html`<fds-icon icon="chevron-down"></fds-icon>`
        break
      case FdsNavigationVariant.secondary:
        icon = html`<fds-icon icon="menu"></fds-icon>`
        break
    }
    return html`
      <button
        class="navigation__button navigation__button--${this.variant}"
        type="button"
        @click=${this.handleNavigationClick}
      >
        <span class="navigation__label ui-label-text">${this.verticalMenuNavText}</span>
        ${icon}
      </button>
    `
  }

  handleNavigationClick(): void {
    this._open = !this._open
  }

  renderItem(item: FdsNavigationItem, clazz: string = ''): TemplateResult {
    const verticalMenuOrder = item.verticalMenuOrder ?? 0
    return html` <li
      @click=${(): void => this.handleSelect(item)}
      class="item ${this.selected === item ? 'item--active' : ''} ${clazz}"
      style=${styleMap({ order: verticalMenuOrder })}
    >
      <div class="item__label">
        ${item.icon && html`<fds-icon class="item__icon" .icon="${item.icon}"></fds-icon>`}
        <span>${item.label}</span>
      </div>
    </li>`
  }

  handleSelect(item: FdsNavigationItem): void {
    this.selected = item
    this.dispatchEvent(
      new CustomEvent<FdsNavigationItem>('select', {
        detail: item,
      })
    )
  }

  static cssVariables = css`
    :host {
      --element-vertical-padding--primary: 9px;
      --element-vertical-padding--secondary: 16px;
      --element-horizontal-padding--primary: 20px;
      --item-border-bottom-width--secondary: 3px;
    }
  `

  static collapsedNavigationStyles = css`
    .navigation-wrapper {
      container-type: inline-size;
      container-name: navigation-wrapper;
    }
    .navigation {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      width: 100%;
      user-select: none;
    }

    .navigation__header,
    .navigation__body,
    .item__label {
      display: flex;
    }

    .item {
      cursor: pointer;
      display: grid;
      grid-template-rows: auto 0;
      padding: var(--element-vertical-padding--primary) var(--element-horizontal-padding--primary);
    }

    .item--active {
      padding-right: 0;
    }

    .navigation--secondary .item {
      padding: var(--element-vertical-padding--secondary) 16px;
    }

    .item__label {
      align-items: end;
    }

    .item__icon {
      margin-right: 6px;
    }

    .navigation__header ::slotted(*) {
      padding: var(--element-vertical-padding--primary) 24px var(--element-vertical-padding--primary) 32px;
    }

    .navigation__body {
      order: 2;
      align-items: stretch;
      flex-direction: column;
      list-style: none;
      margin: 0;
      padding: 0;

      height: 1px;
      width: 1px;
      visibility: hidden;
      opacity: 0;
      overflow-y: hidden;
      margin-left: -1px;
      margin-top: -1px;
      white-space: nowrap;
    }

    .navigation--primary {
      background-color: ${FdsColorBrandBlack};
      color: ${FdsColorBrandWhite};
    }

    .navigation--primary .item:hover {
      color: ${FdsColorText300};
    }

    .navigation--primary .navigation__open .item--active .item__label:after {
      content: '';
      position: relative;
      align-self: center;
      height: 0;
      margin-left: auto;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-right: var(--element-vertical-padding--primary) solid ${FdsColorBrandWhite};
    }

    .navigation--secondary {
      background-color: ${FdsColorBrandWhite};
      border-bottom: 1px solid ${FdsColorBrandBlack};
    }

    .navigation--secondary .item {
      border-bottom: 1px solid ${FdsColorNeutral100};
    }

    .navigation--secondary .item:hover {
      color: ${FdsColorText300};
    }

    .navigation__open {
      height: auto;
      width: 100%;
      visibility: visible;
      opacity: 1;
      overflow-y: visible;
      margin-left: 0;
      margin-top: 0;

      border-top: 1px solid ${FdsColorNeutral100};
    }

    .navigation__button-wrapper {
      flex-grow: 1;
      display: flex;
      justify-content: flex-end;
    }

    .navigation__button {
      display: flex;
      align-items: center;

      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      text-align: center;
      user-select: none;
      white-space: nowrap;
    }

    .navigation__button--primary {
      background-color: ${FdsColorBrandBlack};
      color: ${FdsColorBrandWhite};
      padding: var(--element-vertical-padding--primary);
    }

    .navigation__button--primary:hover {
      color: ${FdsColorText300};
    }

    .navigation__button--secondary {
      background-color: ${FdsColorBrandWhite};
      color: ${FdsColorBrandBlack};
      padding: var(--element-vertical-padding--secondary);
    }

    .navigation__button--secondary:hover {
      color: ${FdsColorText300};
    }

    .navigation__label {
      margin-right: 10px;
    }
  `

  /**
   * These styles are inside a function instead of being static because they depend on the verticalMenuThreshold property
   * that the end user can change
   */
  desktopStyles(): CSSResult {
    return css`
      @container navigation-wrapper (min-width: ${unsafeCSS(this.verticalMenuThreshold)}px) {
        .navigation {
          flex-wrap: nowrap;
        }

        .navigation__body {
          width: 100%;
          order: 0;
          align-items: end;
          flex-direction: row;

          height: auto;
          visibility: visible;
          opacity: 1;
          overflow-y: visible;
          margin-left: 0;
          margin-top: 0;
        }

        .item__first-right {
          margin-left: auto;
        }

        .item {
          justify-items: center;
          order: 0 !important;
        }

        .item--active {
          padding-right: var(--element-horizontal-padding--primary);
        }

        .navigation--primary {
          height: 40px;
        }

        .navigation--primary .item--active:after {
          content: '';
          position: relative;
          top: 1px;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-bottom: var(--element-vertical-padding--primary) solid ${FdsColorBrandWhite};
        }

        /* Disable the arrow shown on collapsed view */
        .navigation--primary .navigation__open .item--active .item__label:after {
          content: '';
          display: none;
        }

        .navigation--secondary .item {
          padding-bottom: calc(
            var(--element-vertical-padding--secondary) - var(--item-border-bottom-width--secondary)
          );
          border-bottom: var(--item-border-bottom-width--secondary) solid white;
        }

        .navigation--secondary .item--active {
          border-bottom: var(--item-border-bottom-width--secondary) solid black;
        }

        .navigation__button {
          display: none;
        }

        li:not(:has(ul)) {
          padding: 0;
          border-bottom: none;
          width: auto;
        }
      }
    `
  }

  static override styles = [
    FdsNavigation.cssVariables,
    uiLabelTextClass,
    FdsNavigation.collapsedNavigationStyles,
  ]
}
