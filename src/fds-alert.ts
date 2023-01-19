import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js';
import { TemplateResult } from 'lit-html'
import { token } from './token-utils'
import "./global-types";

const IconColorMap = {
  error: 'color-success-300',
  warning: 'color-warning-300',
  info: 'color-interactive-300',
  success: 'color-success-300',
}
@customElement('fds-alert')
class FdsAlert extends LitElement {
  static override styles = css`
    .alert {
      padding: ${token('size-1')};
      border-bottom: 2px solid;
      display: flex;
      align-items: baseline;
    }
    .alert--error {
      background-color: ${token('color-danger-100')};
      border-bottom-color: ${token('color-danger-300')};
    }
    .alert--warning {
      background-color:${token('color-warning-100')};
      border-bottom-color: ${token('color-warning-300')};
    }
    .alert--info {
      background-color: ${token('color-interactive-100')};
      border-bottom-color: ${token('color-interactive-300')};
    }
    .alert--success {
      background-color: ${token('color-success-100')};
      border-bottom-color: ${token('color-success-300')};
    }
    .alert__icon {
      margin-right: ${token('size-1')};
      top: 3px;
      position: relative;
    }
  `

  @property() variant: 'error' | 'warning' | 'info' | 'success' = 'error';    
  
  override render(): TemplateResult {
      return html`
        <div class="alert alert--${this.variant}">
          <div class="alert__icon">
            <fds-icon icon='alert-triangle' size='18' color="${IconColorMap[this.variant]}"></fds-icon>
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