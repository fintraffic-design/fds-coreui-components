import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TemplateResult } from 'lit-html';

@customElement('fds-card')
export class FdsCard extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }

    .fds-card-title h3 {
      display: flex;
      justify-content: space-between;
      margin: 0 0 0.5rem;
    }
  `

  @property({ attribute: 'title-text' }) titleText: string = '';

  override render(): TemplateResult {
    return html`
      <div class="card__header">
        <h3>
          <slot name="title"></slot>
          <span>${this.titleText}</span>
          <div class="fds-card-action-corner">
            <slot name="action-corner"></slot>
          </div>
        </h3>
      </div>
      <div class="fds-card-content">
        <slot></slot>
      </div>
      <div class="fds-card-footer">
        <slot name="action-footer"></slot>
      </div>
    `;
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'fds-card': FdsCard
  }
}
