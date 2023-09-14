import {
  FdsColorBrandBlack,
  FdsColorBrandWhite,
  FdsColorNeutral100, FdsColorNeutral50,
  FdsColorText300
} from '@fintraffic-design/coreui-css'
import {css, html, LitElement, unsafeCSS, adoptStyles} from 'lit'
import { nothing, TemplateResult } from 'lit-html'
import {customElement, property, state} from 'lit/decorators.js'
import { FdsIconType } from './fds-icon'
import './global-types'
import { uiLabelTextClass } from './utils/css-utils'
import { tokenVar } from './utils/token-utils'

export enum FdsNavigationVariant {
  primary = 'primary',
  secondary = 'secondary',
}

export interface FdsNavigationItem<T = string> {
  label: string
  value: T
  position?: FdsNavigationItemPosition
  mobileOrder?: number
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
 * @event select - Triggered when destination is clicked. The selected item is in event details field.
 */

@customElement('fds-navigation')
export default class FdsNavigation extends LitElement {
  @property() variant: FdsNavigationVariant = FdsNavigationVariant.primary
  @property() items: FdsNavigationItem[] = []
  @property() selected?: FdsNavigationItem
  @property({type: Number}) mobileWidth = 768

  @state() open = false

  override render(): TemplateResult {
    const itemsOnRight = this.items.filter(item => item.position === FdsNavigationItemPosition.right)
    const itemsOnLeft = this.items.filter(item => item.position !== FdsNavigationItemPosition.right)
    return html`<div class="navigation navigation--${this.variant} ui-label-text">
      ${this.variant === FdsNavigationVariant.primary
        ? html`<div class="navigation__header">
            <slot></slot>
          </div>`
        : nothing}
      <ul class="navigation__body ${this.open ? 'navigation__open' : ''}">
        ${itemsOnLeft
          .map(item => this.renderItem(item))
          .concat(itemsOnRight.map((item, index) => this.renderItem(item, index === 0 ? 'item__first-right' : '')))}
      </ul>
      <div class="navigation__button-wrapper">
        ${this.renderNavigationButton()}
      </div>
    </div>`
  }

  renderNavigationButton() {
    return html`
      <button class="navigation__button navigation__button--${this.variant}" type="button" @click=${this.handleNavigationClick}>
        <span class="navigation__label">Valikko</span>
        <fds-icon icon="menu" />
      </button>
      `
  }

  handleNavigationClick() {
    this.open = !this.open;
  }

  renderItem(item: FdsNavigationItem, clazz: string = ''): TemplateResult {
    return html` <li
      @click=${(): void => this.handleSelect(item)}
      class="item ${this.selected === item ? 'item--active' : ''} ${clazz}"
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

  override connectedCallback() {
    super.connectedCallback();
    adoptStyles(this.shadowRoot as ShadowRoot, [
      uiLabelTextClass,
      css`
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
          padding: 9px 20px;
        }
        
        .navigation__header ::slotted(*) {
          padding: 9px 24px 9px 32px;
          height: 40px;
        }
        .navigation__body {
          order: 2;
          align-items: stretch;
          flex-direction: column;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .navigation__body {
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
          background-color: ${tokenVar(FdsColorBrandBlack)};
          color: ${tokenVar(FdsColorBrandWhite)};
        }

        .navigation--primary .item:hover {
          color: ${tokenVar(FdsColorText300)};
        }
        
        .navigation__open {
          height: auto;
          width: 100%;
          visibility: visible;
          opacity: 1;
          overflow-y: visible;
          margin-left: 0;
          margin-top: 0;

          border-top: 1px solid ${tokenVar(FdsColorNeutral100)};
        }
        .navigation__button-wrapper {
          flex-grow: 1;
          display: flex;
          justify-content: flex-end;
        }
        .navigation__button {
          background-color: ${tokenVar(FdsColorBrandWhite)};
          border: none;
          border-radius: 4px;
          color: ${tokenVar(FdsColorBrandBlack)};
          cursor: pointer;
          font-weight: 600;
          text-align: center;
          user-select: none;
          white-space: nowrap;
        }
        .navigation__button:hover {
          background-color: ${tokenVar(FdsColorNeutral50)};
        }
        .navigation__button--primary {
          background-color: ${tokenVar(FdsColorBrandBlack)};
          color: ${tokenVar(FdsColorBrandWhite)};
        }

        .navigation__label {
          margin-right: 10px;
        }
        /*
        Apply styles to the list items that do not have a nested list i.e. the last level of the navigation
        */
        li:not(:has(ul)) {
          /*padding: 1rem;*/
          border-bottom: 1px solid var(--fds-color-neutral-100);
          width: 100%;
        }
      @media (min-width: ${unsafeCSS(this.mobileWidth)}px) {
        .navigation {
          flex-wrap: nowrap;
        }

        .navigation__body {
          width: 100%;
          height: 100%;
          order: 0;
          align-items: end;
          flex-direction: row;
        }
        
        .navigation__body {
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
        }

        .item__label {
          align-items: end;
        }

        .item__icon {
          margin-right: 6px;
        }

        .navigation--primary .item--active:after {
          content: '';
          position: relative;
          top: 1px;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-bottom: 8px solid ${tokenVar(FdsColorBrandWhite)};
        }

        .navigation--secondary {
          background-color: ${tokenVar(FdsColorBrandWhite)};
          border-bottom: 1px solid ${tokenVar(FdsColorBrandBlack)};
          height: 55px;
        }

        .navigation--secondary .navigation__body {
          padding: 0px 16px;
        }

        .navigation--secondary .item {
          border-bottom: 3px solid white;
          padding: 16px 16px 13px 16px;
        }

        .navigation--secondary .item--active {
          border-bottom: 3px solid black;
        }

        .navigation--secondary .item:hover {
          color: ${tokenVar(FdsColorText300)};
        }

        .navigation__button {
          display: none;
        }

        li:not(:has(ul)) {
          padding: 0;
          border-bottom: none;
          width: auto;
        }
      }`,
    ])
  }
}
