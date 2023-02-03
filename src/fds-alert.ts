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
  static override styles = css`
    .alert {
      padding: ${tokenVar(FdsSize1)} ${tokenVar(FdsSize1)} calc(${tokenVar(FdsSize1)} / 2);
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
  `

  @property() variant: FdsAlertVariant = FdsAlertVariant.error

  override render(): TemplateResult {
    return html`
      <div class="alert alert--${this.variant}">
        <div class="alert-icon">
          <fds-icon icon="alert-triangle" .size="${FdsSize3}"></fds-icon>
        </div>
        <slot></slot>
      </div>
    `
  }
}
