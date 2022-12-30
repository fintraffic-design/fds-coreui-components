import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TemplateResult } from 'lit-html';

@customElement('fds-actions')
export class FdsActions extends LitElement {
  static override styles = css`
    
    .actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .actions__horizontal {
      flex-direction: row;
    }
    
    .actions__vertical {
      flex-direction: column;
    }
    
    .actions__horizontal ::slotted(:not(:last-child)) {
      margin-right: 8px;
    }

    .actions__vertical ::slotted(:not(:last-child)) {
      margin-bottom: 8px;
    }
  `;

  @property() direction: 'horizontal' | 'vertical' = 'horizontal';

  override render(): TemplateResult {
    return html`
      <div class="actions actions__${this.direction}">
        <slot></slot>
      </div>
    `;
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'fds-actions': FdsActions
  }
}
