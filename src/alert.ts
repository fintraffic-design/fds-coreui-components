import { css, html, LitElement } from 'lit'
import { property } from 'lit/decorators.js'
import { TemplateResult } from 'lit-html'
import {
  FdsColorDanger300,
  FdsColorDanger50,
  FdsColorInteractive300,
  FdsColorInteractive50,
  FdsColorSuccess300,
  FdsColorSuccess50,
  FdsColorWarning400,
  FdsColorWarning50,
  FdsSize1,
  FdsSize2,
  FdsTokenSize3,
  uiHelperTextClass,
} from '@fintraffic/fds-coreui-css'
import { FdsIcon, FdsIconType } from './icon.js'

// Declare used elements to avoid lit-plugin(no-unknown-tag-name) warning
// These components still need to be registered separately (by the importing app).
declare global {
  interface HTMLElementTagNameMap {
    'fds-icon': FdsIcon
  }
}

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
export class FdsAlert extends LitElement {
  @property() variant: FdsAlertVariant = FdsAlertVariant.error
  @property() icon?: FdsIconType
  @property({ type: Boolean }) dismissible: boolean = false

  override render(): TemplateResult {
    return html`
      <div class="alert alert--${this.variant}">
        <div class="alert-content">
          ${this.icon &&
          html`<fds-icon class="alert-icon" .icon=${this.icon} .size=${FdsTokenSize3}></fds-icon>`}
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
        .size=${FdsTokenSize3}
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
        border-radius: ${FdsSize1};
        display: flex;
      }
      .alert--error {
        background-color: ${FdsColorDanger50};
        border-color: ${FdsColorDanger300};
        color: ${FdsColorDanger300};
      }
      .alert--warning {
        background-color: ${FdsColorWarning50};
        color: ${FdsColorWarning400};
        border-color: ${FdsColorWarning400};
      }
      .alert--info {
        background-color: ${FdsColorInteractive50};
        border-color: ${FdsColorInteractive300};
        color: ${FdsColorInteractive300};
      }
      .alert--success {
        background-color: ${FdsColorSuccess50};
        border-bottom-color: ${FdsColorSuccess300};
        color: ${FdsColorSuccess300};
      }
      .alert-icon {
        margin: 0 ${FdsSize2} 0 ${FdsSize1};
      }

      .alert-content {
        flex: 1;
        display: inline-flex;
        align-items: center;
        padding: ${FdsSize1};
        justify-content: center;
      }

      .alert-close {
        cursor: pointer;
        border-left: 1px solid;
        border-radius: 0 ${FdsSize1} ${FdsSize1} 0;
        padding: ${FdsSize1};
        margin-left: ${FdsSize1};
      }
    `,
  ]
}
