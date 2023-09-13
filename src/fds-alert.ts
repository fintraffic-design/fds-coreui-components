import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { TemplateResult } from 'lit-html'
import { FdsProperty, FdsSize3, uiHelperTextClass } from '@fintraffic-design/coreui-css'
import './global-types'
import { FdsIconType } from './fds-icon'

export enum FdsAlertVariant {
  error = 'error',
  warning = 'warning',
  info = 'info',
  success = 'success',
}

/**
 * Alert component.
 * @event dismissed - Dispatches a CustomEvent when alert is dismissed.
 *
 * @property {FdsAlertVariant} variant - Variant of the alert.
 * @property {FdsIconType} icon - Icon to be displayed in the alert.
 * @property {boolean} dismissible - If true, alert can be dismissed by clicking the close button.
 */
@customElement('fds-alert')
export default class FdsAlert extends LitElement {
  @property() variant: FdsAlertVariant = FdsAlertVariant.error
  @property() icon?: FdsIconType
  @property({ type: Boolean }) dismissible: boolean = false

  override render(): TemplateResult {
    return html`
      <div class="alert alert--${this.variant}">
        <div class="alert-content">
          ${this.icon && html`<fds-icon class="alert-icon" .icon=${this.icon} .size=${FdsSize3}></fds-icon>`}
          <slot class="ui-helper-text"></slot>
        </div>
        ${this.renderDismissButton()}
      </div>
    `
  }

  private renderDismissButton(): TemplateResult | null {
    if (this.dismissible) {
      return html`<fds-icon
        class="alert-close"
        .icon=${'x'}
        .size=${FdsSize3}
        @click=${(): void => this.handleDismiss()}
      ></fds-icon>`
    }
    return null
  }

  private handleDismiss(): void {
    this.dispatchEvent(new CustomEvent('dismissed'))
  }

  static override styles = [
    uiHelperTextClass,
    css`
      :host {
        display: block;
      }

      .alert {
        border: 1px solid;
        border-radius: ${FdsProperty.Size1};
        display: flex;
      }
      .alert--error {
        background-color: ${FdsProperty.ColorDanger50};
        border-color: ${FdsProperty.ColorDanger300};
        color: ${FdsProperty.ColorDanger300};
      }
      .alert--warning {
        background-color: ${FdsProperty.ColorWarning50};
        color: ${FdsProperty.ColorWarning400};
        border-color: ${FdsProperty.ColorWarning400};
      }
      .alert--info {
        background-color: ${FdsProperty.ColorInteractive50};
        border-color: ${FdsProperty.ColorInteractive300};
        color: ${FdsProperty.ColorInteractive300};
      }
      .alert--success {
        background-color: ${FdsProperty.ColorSuccess50};
        border-bottom-color: ${FdsProperty.ColorSuccess300};
        color: ${FdsProperty.ColorSuccess300};
      }
      .alert-icon {
        margin: 0;
        margin-left: ${FdsProperty.Size1};
        margin-right: ${FdsProperty.Size2};
      }

      .alert-content {
        flex: 1;
        display: inline-flex;
        align-items: center;
        padding: ${FdsProperty.Size1};
        justify-content: center;
      }

      .alert-close {
        cursor: pointer;
        border-left: 1px solid;
        border-radius: 0 ${FdsProperty.Size1} ${FdsProperty.Size1} 0;
        padding: ${FdsProperty.Size1};
        margin-left: ${FdsProperty.Size1};
      }
    `,
  ]
}
