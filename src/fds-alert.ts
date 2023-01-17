import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js';
import { TemplateResult } from 'lit-html'

@customElement('fds-alert')
class FdsAlert extends LitElement {
  static override styles = css`
    .alert {
      padding: 8px;
      border-bottom: 2px solid #b40000;
      display: flex;
      align-items: baseline;
    }
    .alert--error {
      background-color: #ff9b87; // $color-danger-100
      border-bottom-color: #b40000; // $color-danger-300
    }
    .alert--warning {
      background-color: #ffe37f; // $color-warning-100;
      border-bottom-color: #b47324; // $color-warning-300;
    }
    .alert--info {
      background-color: #90cefe; // $color-interactive-100;
      border-bottom-color: #0034ac; // $color-interactive-300;
    }
    .alert--success {
      background-color: #82e8c3; // $color-success-100;
      border-bottom-color: #005f61; // $color-success-300;
    }
    .alert__icon {
      margin-right: 8px;
    }
  `

  @property() variant: 'error' | 'warning' | 'info' | 'success' = 'error';    
  
  override render(): TemplateResult {
      return html`
        <div class="alert alert--${this.variant}">
          <div class="alert__icon">&#9888;</div>
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