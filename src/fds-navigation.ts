import { css, html, LitElement } from 'lit'
import {
  FdsColorBrandBlack,
  FdsColorBrandWhite,
  FdsColorText300,
  FdsSize3,
  FdsSize4,
  FdsTypographyEmphasisDefaultFontSize,
  FdsTypographyEmphasisDefaultFontWeight,
  FdsTypographyEmphasisDefaultLineHeight,
} from '@fintraffic-design/coreui-css'
import { TemplateResult } from 'lit-html'
import { customElement, property, state } from 'lit/decorators.js'
import { tokenVar } from './token-utils'

export enum FdsNavigationVariant {
  primary = 'primary',
  secondary = 'secondary',
}

export interface NavigationSection {
  label: string
  value: string
}

@customElement('fds-navigation')
export default class FdsNavigation extends LitElement {
  static override styles = css`
    .navigation {
      display: flex;
      align-items: center;
      width: 100%;
      font-size: ${tokenVar(FdsTypographyEmphasisDefaultFontSize)};
      line-height: ${tokenVar(FdsTypographyEmphasisDefaultLineHeight)};
      font-weight: ${tokenVar(FdsTypographyEmphasisDefaultFontWeight)};
    }

    .navigation--primary {
      background-color: ${tokenVar(FdsColorBrandBlack)};
      color: ${tokenVar(FdsColorBrandWhite)};
    }

    .navigation--secondary {
      background-color: ${tokenVar(FdsColorBrandWhite)};
      border-bottom: 1px solid ${tokenVar(FdsColorBrandBlack)};
    }

    .navigation__header {
      padding-left: ${tokenVar(FdsSize4)};
      padding-right: ${tokenVar(FdsSize3)};
      padding-bottom: 8px;
      cursor: pointer;
    }

    .navigation__header,
    .section {
      cursor: pointer;
      padding-top: 8px;
      padding-bottom: 8px;
    }

    .navigation__header,
    .navigation__sections {
      display: flex;
    }

    .section {
      padding-left: ${tokenVar(FdsSize3)};
      padding-right: ${tokenVar(FdsSize3)};
      display: grid;
      justify-items: center;
      grid-template-rows: auto 0px;
    }

    .navigation--primary .section:hover {
      color: ${tokenVar(FdsColorText300)};
    }

    .navigation--primary .section--selected:after {
      content: '';
      position: relative;
      top: 1px;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 8px solid ${tokenVar(FdsColorBrandWhite)};
    }
  `

  @property() variant: FdsNavigationVariant = FdsNavigationVariant.primary
  @property() sections: NavigationSection[] = []
  @property() defaultSection?: NavigationSection
  @property() onSelect?: (value: string) => void

  @state() private _selectedSection?: NavigationSection = this.defaultSection

  override connectedCallback(): void {
    super.connectedCallback()
    if (this.defaultSection) {
      this.handleSelect(this.defaultSection)
    } else {
      this.handleSelect(this.sections[0])
    }
  }
  override render(): TemplateResult {
    return html`<div class="navigation navigation--${this.variant}">
      ${this.variant === FdsNavigationVariant.primary
        ? html`<div class="navigation__header">
            <div class="navigation__logo">F</div>
            <div class="navigation__title">Fintraffic</div>
          </div>`
        : null}
      <div class="navigation__sections">
        ${this.sections.map(
          section =>
            html` <div
              @click=${() => this.handleSelect(section)}
              class="section ${this._selectedSection && this._selectedSection?.value === section.value
                ? 'section--selected'
                : ''}"
            >
              ${section.label}
            </div>`
        )}
      </div>
    </div>`
  }

  handleSelect(selectedSection: NavigationSection): void {
    this._selectedSection = selectedSection
    if (this.onSelect) {
      this.onSelect(selectedSection.value)
    }
  }
}
