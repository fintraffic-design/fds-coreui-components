import {
  FdsColorBrandBlack,
  FdsColorBrandWhite,
  FdsColorText300,
  FdsSize1,
  FdsSize3,
  FdsSize4,
} from '@fintraffic-design/coreui-css'
import { css, html, LitElement } from 'lit'
import { nothing, TemplateResult } from 'lit-html'
import { customElement, property } from 'lit/decorators.js'
import { FdsIconType } from './fds-icon'
import './global-types'
import { uiLabelTextClass } from './utils/css-utils'
import { tokenVar } from './utils/token-utils'

export enum FdsNavigationVariant {
  primary = 'primary',
  secondary = 'secondary',
}

export interface FdsNavigationItem {
  label: string
  value: ItemValue
  position?: ItemPosition
  icon?: FdsIconType
}

export type ItemValue = string
export enum ItemPosition {
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
  @property() selected?: ItemValue

  override render(): TemplateResult {
    const itemsOnRight = this.items.filter(item => item.position === ItemPosition.right)
    const itemsOnLeft = this.items.filter(item => item.position !== ItemPosition.right)
    return html`<div class="navigation navigation--${this.variant} ui-label-text">
      ${this.variant === FdsNavigationVariant.primary
        ? html`<div class="navigation__header">
            <slot></slot>
          </div>`
        : nothing}
      <div class="navigation__body">
        <div class="navigation__items">${itemsOnLeft.map(item => this.renderItem(item))}</div>
        <div class="navigation__items">${itemsOnRight.map(item => this.renderItem(item))}</div>
      </div>
    </div>`
  }

  renderItem(item: FdsNavigationItem): TemplateResult {
    return html` <div
      @click=${(): void => this.handleSelect(item)}
      class="item ${this.selected === item.value ? 'item--active' : ''}"
    >
      <div class="item__label">
        ${item.icon && html`<fds-icon class="item__icon" .icon="${item.icon}"></fds-icon>`}
        <span>${item.label}</span>
      </div>
    </div>`
  }

  handleSelect(item: FdsNavigationItem): void {
    this.selected = item.value
    this.dispatchEvent(
      new CustomEvent<FdsNavigationItem>('select', {
        detail: item,
      })
    )
  }

  static override styles = [
    uiLabelTextClass,
    css`
      .navigation {
        display: flex;
        align-items: center;
        width: 100%;
        user-select: none;
        height: 40px;
      }

      .navigation__header ::slotted(*) {
        padding: 9px 24px 9px 32px;
      }

      .navigation__body {
        justify-content: space-between;
        width: 100%;
      }

      .navigation__items {
        align-items: end;
      }

      .navigation__header,
      .navigation__body,
      .navigation__items,
      .item__label {
        display: flex;
      }

      .item {
        cursor: pointer;
        display: grid;
        justify-items: center;
        grid-template-rows: auto 0;
        padding: 9px 20px;
      }

      .item__label {
        align-items: center;
      }

      .item__icon {
        margin-right: 6px;
      }

      .navigation--primary {
        background-color: ${tokenVar(FdsColorBrandBlack)};
        color: ${tokenVar(FdsColorBrandWhite)};
      }

      .navigation--primary .item:hover {
        color: ${tokenVar(FdsColorText300)};
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
        height: 56px;
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
    `,
  ]
}
