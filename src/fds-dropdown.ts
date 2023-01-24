import {
  FdsColorBrandWhite,
  FdsColorNeutral100,
  FdsColorNeutral200,
  FdsColorText1000,
  FdsStyleElevation200,
  FdsTypographyUiLabelFontFamily,
  FdsTypographyUiLabelFontSize,
  FdsTypographyUiLabelFontWeight,
  FdsTypographyUiLabelLetterSpacing,
  FdsTypographyUiLabelLineHeight,
} from '@fintraffic-design/coreui-css/dist/tokens'
import { css, html, LitElement } from 'lit'
import { TemplateResult } from 'lit-html'
import { customElement, property, state } from 'lit/decorators.js'
import { tokenVar } from './token-utils'

import './global-types'

type Value = string
type Label = string | { label: string; icon: SVGElement }

export interface DropdownOption {
  label: Label
  value: Value
}

/**
 * Single choice dropdown component. For multiselection use MultiselectDropdown component.
 *
 */
@customElement('fds-dropdown')
export default class FdsDropdown extends LitElement {
  @property() options: DropdownOption[] = []
  @property() isDisabled: boolean = false
  @property() isError: boolean = false
  @property() placeholder?: string
  @property() defaultOption?: DropdownOption
  @property() onSelect?: (selectedValue: Value) => void

  @state() private _isOpen: boolean = false
  @state() private _selectedOption?: DropdownOption = this.defaultOption

  override render(): TemplateResult {
    const contents = html`
      <div class="contents">
        ${this.options.map(
          option =>
            html`<div @click=${() => this.handleSelect(option)} class="ui-label-text option">
              ${option.label}
            </div>`
        )}
      </div>
    `

    return html`
      <div @blur=${() => (this._isOpen = false)}>
        <button
          @click=${() => (this._isOpen = !this._isOpen)}
          ?disabled=${this.isDisabled}
          class=${`ui-label-text ${!this._selectedOption && this.placeholder ? 'placeholder' : ''}`}
        >
          ${this._selectedOption?.label || this.placeholder}
          <fds-icon .icon=${this._isOpen ? 'chevron-up' : 'chevron-down'}></fds-icon>
        </button>
        ${this._isOpen ? contents : null}
      </div>
    `
  }

  private handleSelect(selectedOption: DropdownOption): void {
    this._selectedOption = selectedOption

    if (this.onSelect) {
      this.onSelect(selectedOption.value)
    }
  }

  static override styles = css`
    .ui-label-text {
      font-family: ${tokenVar(FdsTypographyUiLabelFontFamily)};
      font-style: 'medium';
      font-weight: ${tokenVar(FdsTypographyUiLabelFontWeight)};
      font-size: ${tokenVar(FdsTypographyUiLabelFontSize)};
      line-height: ${tokenVar(FdsTypographyUiLabelLineHeight)};
      letter-spacing: ${tokenVar(FdsTypographyUiLabelLetterSpacing)};

      color: ${tokenVar(FdsColorText1000)};
    }

    button {
      cursor: pointer;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      /* TODO: what values? */
      width: 284px;
      height: 48px;
      padding-left: 16px;
      padding-right: 8px;
      gap: 10px;

      background-color: ${tokenVar(FdsColorBrandWhite)};
      border: 1px solid ${tokenVar(FdsColorNeutral200)};
    }

    .contents {
      cursor: pointer;
      display: block;
      position: absolute;
      overflow: scroll;

      /* TODO: change to same value as button width */
      min-width: 284px;
      max-height: 20vw;

      box-shadow: ${tokenVar(FdsStyleElevation200)};
    }

    .option {
      display: flex;
      align-items: center;

      /* TODO: what values? */
      height: 56px;
      padding-left: 16px;
      padding-right: 8px;

      background-color: ${tokenVar(FdsColorBrandWhite)};
      border-bottom: 1px solid ${tokenVar(FdsColorNeutral200)};
    }

    .option:hover {
      /* TODO: what color? */
      background-color: ${tokenVar(FdsColorNeutral100)};
    }

    .placeholder {
    }
  `
}
