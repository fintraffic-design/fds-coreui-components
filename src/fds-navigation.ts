import {
  FdsColorBrandBlack,
  FdsColorBrandWhite,
  FdsColorText300,
  FdsSize1,
  FdsSize3,
  FdsSize4,
} from '@fintraffic-design/coreui-css'
import { css, html, LitElement } from 'lit'
import { TemplateResult } from 'lit-html'
import { customElement, property } from 'lit/decorators.js'
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
  position?: ItemPosition
  icon?: FdsIconType
}

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
  @property() selected?: FdsNavigationItem

  override render(): TemplateResult {
    console.log('render', this.selected)
    const itemsOnRight = this.items.filter(item => item.position === ItemPosition.right)
    const itemsOnLeft = this.items.filter(item => item.position !== ItemPosition.right)
    return html`<div class="navigation navigation--${this.variant}">
      ${this.variant === FdsNavigationVariant.primary
        ? html`<div class="navigation__header">
            <slot></slot>
          </div>`
        : null}
      <div class="navigation__body">
        <div class="navigation__items">${itemsOnLeft.map(item => this.renderItem(item))}</div>
        <div class="navigation__items">${itemsOnRight.map(item => this.renderItem(item))}</div>
      </div>
    </div>`
  }

  renderItem(item: FdsNavigationItem): TemplateResult {
    return html` <div
      @click=${(): void => this.handleSelect(item)}
      class="item ${this.selected === item ? 'item--active' : ''}"
    >
      <div class="item__label">
        <span class="ui-label-text">${item.label}</span>
        ${item.icon && html`<fds-icon .icon="${item.icon}"></fds-icon>`}
      </div>
    </div>`
  }

  handleSelect(item: FdsNavigationItem): void {
    this.selected = item
    this.dispatchEvent(
      new CustomEvent<FdsNavigationItem>('select', {
        detail: item,
      })
    )
  }

  static override styles = css`
    .navigation {
      display: flex;
      align-items: center;
      width: 100%;
      user-select: none;
    }

    .navigation--primary {
      background-color: ${tokenVar(FdsColorBrandBlack)};
      color: ${tokenVar(FdsColorBrandWhite)};
    }

    .navigation--secondary {
      background-color: ${tokenVar(FdsColorBrandWhite)};
      border-bottom: 1px solid ${tokenVar(FdsColorBrandBlack)};
    }

    .navigation__header ::slotted(*) {
      padding: 8px ${tokenVar(FdsSize3)} 8px ${tokenVar(FdsSize4)};
    }

    .navigation__body {
      justify-content: space-between;
      align-items: center;
      width: 100%;
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
      padding: ${tokenVar(FdsSize1)} ${tokenVar(FdsSize3)};
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

    ${uiLabelTextClass}
  `
}
