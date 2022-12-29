import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TemplateResult } from 'lit-html';

@customElement('fintraffic-card')
export class FintrafficCard extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }

    .fintraffic-card-title h3 {
      display: flex;
      justify-content: space-between;
      margin: 0 0 0.5rem;
    }
  `

  @property({ attribute: 'title-text' }) titleText: string = '';

  override render(): TemplateResult {
    return html`
      <div class="fintraffic-card-title">
        <h3>
          <slot name="title"></slot>
          <span>${this.titleText}</span>
          <div class="fintraffic-card-action-corner">
            <slot name="action-corner"></slot>
          </div>
        </h3>
      </div>
      <div class="fintraffic-card-content">
        <slot></slot>
      </div>
      <div class="fintraffic-card-footer">
        <slot name="action-footer"></slot>
      </div>
    `;
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'fintraffic-card': FintrafficCard
  }
}
