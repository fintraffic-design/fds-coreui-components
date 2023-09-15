import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { TemplateResult } from 'lit-html'
import {
  FdsCssColorDanger300,
  FdsCssColorDanger50,
  FdsCssColorInteractive300,
  FdsCssColorInteractive50,
  FdsCssColorSuccess300,
  FdsCssColorSuccess50,
  FdsCssColorWarning400,
  FdsCssColorWarning50,
  FdsCssSize1,
  FdsCssSize2,
  FdsSize3,
  uiHelperTextClass,
} from '@fintraffic-design/coreui-css'
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
        border-radius: ${FdsCssSize1};
        display: flex;
      }
      .alert--error {
        background-color: ${FdsCssColorDanger50};
        border-color: ${FdsCssColorDanger300};
        color: ${FdsCssColorDanger300};
      }
      .alert--warning {
        background-color: ${FdsCssColorWarning50};
        color: ${FdsCssColorWarning400};
        border-color: ${FdsCssColorWarning400};
      }
      .alert--info {
        background-color: ${FdsCssColorInteractive50};
        border-color: ${FdsCssColorInteractive300};
        color: ${FdsCssColorInteractive300};
      }
      .alert--success {
        background-color: ${FdsCssColorSuccess50};
        border-bottom-color: ${FdsCssColorSuccess300};
        color: ${FdsCssColorSuccess300};
      }
      .alert-icon {
        margin: 0 ${FdsCssSize2} 0 ${FdsCssSize1};
      }

      .alert-content {
        flex: 1;
        display: inline-flex;
        align-items: center;
        padding: ${FdsCssSize1};
        justify-content: center;
      }

      .alert-close {
        cursor: pointer;
        border-left: 1px solid;
        border-radius: 0 ${FdsCssSize1} ${FdsCssSize1} 0;
        padding: ${FdsCssSize1};
        margin-left: ${FdsCssSize1};
      }
    `,
  ]
}
