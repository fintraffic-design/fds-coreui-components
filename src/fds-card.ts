import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TemplateResult } from 'lit-html';

@customElement('fds-card')
export class FdsCard extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      padding: 16px;
      background: white;
    }

    .card__header h3 {
      display: flex;
      justify-content: space-between;
      margin: 0 0 16px;
    }
    
    .card__header-corner {
      margin-left: 1rem;
    }
    
    .card__body {
      margin-bottom: 16px;
    }
  `;

  override render(): TemplateResult {
    return html`
      <div class="card__header">
        <h3>
          <div class="card__header-title">
            <slot name="header-title"></slot>
          </div>
          <div class="card__header-corner">
            <slot name="header-corner"></slot>
          </div>
        </h3>
      </div>
      <div class="card__body">
        <slot></slot>
      </div>
      <div class="card__footer">
        <slot name="footer"></slot>
      </div>
    `;
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'fds-card': FdsCard
  }
}
