import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { TemplateResult } from 'lit-html'
import { tokenVar } from './utils/token-utils'
import {
  FdsColorDanger100,
  FdsColorDanger300,
  FdsColorInteractive100,
  FdsColorInteractive300,
  FdsColorSuccess100,
  FdsColorSuccess300,
  FdsColorWarning100,
  FdsColorWarning300,
  FdsSize1,
  FdsSize3,
} from '@fintraffic-design/coreui-css'
import './global-types'
import { uiHelperTextClass } from './utils/css-utils'
import { FdsIconType } from './fds-icon'

export enum FdsAlertVariant {
  error = 'error',
  warning = 'warning',
  info = 'info',
  success = 'success',
}

/**
 * Alert component.
 *
 * @property {FdsAlertVariant} variant
 */
@customElement('fds-alert')
export default class FdsAlert extends LitElement {
  @property() variant: FdsAlertVariant = FdsAlertVariant.error
  @property() icon?: FdsIconType

  override render(): TemplateResult {
    return html`
      <div class="alert alert--${this.variant}">
        ${this.icon && html`<fds-icon class="alert-icon" .icon=${this.icon} .size=${FdsSize3}></fds-icon>`}
        <slot class="ui-helper-text content"></slot>
      </div>
    `
  }

  static override styles = [
    uiHelperTextClass,
    css`
      .alert {
        padding: 8px;
        border-bottom: 2px solid;
        display: flex;
        align-items: center;
      }
      .alert--error {
        background-color: ${tokenVar(FdsColorDanger100)};
        border-bottom-color: ${tokenVar(FdsColorDanger300)};
      }
      .alert--error .alert-icon {
        color: ${tokenVar(FdsColorDanger300)};
      }
      .alert--warning {
        background-color: ${tokenVar(FdsColorWarning100)};
        border-bottom-color: ${tokenVar(FdsColorWarning300)};
      }
      .alert--warning .alert-icon {
        color: ${tokenVar(FdsColorWarning300)};
      }
      .alert--info {
        background-color: ${tokenVar(FdsColorInteractive100)};
        border-bottom-color: ${tokenVar(FdsColorInteractive300)};
      }
      .alert--info .alert-icon {
        color: ${tokenVar(FdsColorInteractive300)};
      }
      .alert--success {
        background-color: ${tokenVar(FdsColorSuccess100)};
        border-bottom-color: ${tokenVar(FdsColorSuccess300)};
      }
      .alert--success .alert-icon {
        color: ${tokenVar(FdsColorSuccess300)};
      }
      .alert-icon {
        margin-right: ${tokenVar(FdsSize1)};
        position: relative;
      }
      .content {
        display: block;
        line-height: 150%;
      }
    `,
  ]
}
