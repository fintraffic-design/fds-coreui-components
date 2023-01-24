import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { TemplateResult } from 'lit-html'
import { tokenVar } from './token-utils'
import {
  FdsSize1,
  FdsColorDanger100,
  FdsColorDanger300,
  FdsColorWarning100,
  FdsColorWarning300,
  FdsColorInteractive100,
  FdsColorInteractive300,
  FdsColorSuccess100,
  FdsColorSuccess300,
} from '@fintraffic-design/coreui-css'
import './global-types'

const IconColorMap = {
  error: 'color-success-300',
  warning: 'color-warning-300',
  info: 'color-interactive-300',
  success: 'color-success-300',
}

/**
 * Alert component.
 *
 * @property {string} variant
 * Type of alert: error, warning, info or success
 */
@customElement('fds-alert')
class FdsAlert extends LitElement {
  static override styles = css`
    .alert {
      padding: ${tokenVar(FdsSize1)};
      border-bottom: 2px solid;
      display: flex;
      align-items: baseline;
    }
    .alert--error {
      background-color: ${tokenVar(FdsColorDanger100)};
      border-bottom-color: ${tokenVar(FdsColorDanger300)};
    }
    .alert--warning {
      background-color: ${tokenVar(FdsColorWarning100)};
      border-bottom-color: ${tokenVar(FdsColorWarning300)};
    }
    .alert--info {
      background-color: ${tokenVar(FdsColorInteractive100)};
      border-bottom-color: ${tokenVar(FdsColorInteractive300)};
    }
    .alert--success {
      background-color: ${tokenVar(FdsColorSuccess100)};
      border-bottom-color: ${tokenVar(FdsColorSuccess300)};
    }
    .alert__icon {
      margin-right: ${tokenVar(FdsSize1)};
      top: 3px;
      position: relative;
    }
  `

  @property() variant: 'error' | 'warning' | 'info' | 'success' = 'error'

  override render(): TemplateResult {
    return html`
      <div class="alert alert--${this.variant}">
        <div class="alert__icon">
          <fds-icon icon="alert-triangle" size="18" color="${IconColorMap[this.variant]}"></fds-icon>
        </div>
        <slot name="content"></slot>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'fds-alert': FdsAlert
  }
}
