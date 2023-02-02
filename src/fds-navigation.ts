import { css, html, LitElement } from 'lit'
import {
  FdsColorBrandBlack,
  FdsColorBrandWhite,
  FdsColorText300,
  FdsSize1,
  FdsSize3,
  FdsSize4,
  FdsTypographyEmphasisDefaultFontSize,
  FdsTypographyEmphasisDefaultFontWeight,
  FdsTypographyEmphasisDefaultLineHeight,
} from '@fintraffic-design/coreui-css'
import { TemplateResult } from 'lit-html'
import { customElement, property, state } from 'lit/decorators.js'
import { tokenVar } from './token-utils'
import { FdsIcons } from './fds-icon'

export enum FdsNavigationVariant {
  primary = 'primary',
  secondary = 'secondary',
}

export interface NavigationItem {
  label: string
  value: string
  position?: ItemPosition
  icon?: keyof typeof FdsIcons
}

export enum ItemPosition {
  left = 'left',
  right = 'right',
}
/**
 * Navigation component.
 *
 * @property {FdsNavigationVariant} variant - Primary or secondary style
 * @property {NavigationItem[]} items - List of destinations
 * @property {NavigationItem} defaultItem - Default or initial destination
 * @property {function} onSelect - Triggered when destination is clicked. The value of the selected destination is returned as parameter.
 */

@customElement('fds-navigation')
export default class FdsNavigation extends LitElement {
  @property() variant: FdsNavigationVariant = FdsNavigationVariant.primary
  @property() items: NavigationItem[] = []
  @property() defaultItem?: NavigationItem
  @property() onSelect?: (value: string) => void

  @state() private _activeItem?: NavigationItem = this.defaultItem
  @state() private _itemsOnLeft: NavigationItem[] = []
  @state() private _itemsOnRight: NavigationItem[] = []

  override connectedCallback(): void {
    super.connectedCallback()
    this._itemsOnRight = this.items.filter(item => item.position === ItemPosition.right)
    this._itemsOnLeft = this.items.filter(item => item.position !== ItemPosition.right)
    if (this.defaultItem) {
      this.handleSelect(this.defaultItem)
    }
  }

  override render(): TemplateResult {
    return html`<div class="navigation navigation--${this.variant}">
      ${this.variant === FdsNavigationVariant.primary
        ? html`<div class="navigation__header">
            <slot></slot>
          </div>`
        : null}
      <div class="navigation__body">
        <div class="navigation__items">${this._itemsOnLeft.map(item => this.renderItem(item))}</div>
        <div class="navigation__items">${this._itemsOnRight.map(item => this.renderItem(item))}</div>
      </div>
    </div>`
  }

  renderItem(item: NavigationItem): TemplateResult {
    return html` <div
      @click=${(): void => this.handleSelect(item)}
      class="item ${this._activeItem?.value === item.value ? 'item--active' : ''}"
    >
      <div class="item__label">
        ${item.icon ? html`<fds-icon .icon="${item.icon}"></fds-icon>` : null}
        <span>${item.label}</span>
      </div>
    </div>`
  }

  handleSelect(item: NavigationItem): void {
    this._activeItem = item
    if (this.onSelect) {
      this.onSelect(item.value)
    }
  }

  static override styles = css`
    .navigation {
      display: flex;
      align-items: center;
      width: 100%;
      font-size: ${tokenVar(FdsTypographyEmphasisDefaultFontSize)};
      line-height: ${tokenVar(FdsTypographyEmphasisDefaultLineHeight)};
      font-weight: ${tokenVar(FdsTypographyEmphasisDefaultFontWeight)};
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
      grid-template-rows: auto 0px;
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
  `
}
