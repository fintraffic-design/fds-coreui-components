import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TemplateResult } from 'lit-html';

@customElement('fds-button')
export class FdsButton extends LitElement {
  static override styles = css`
    
    .button {
      display: flex;
      border: 2px solid black;
      border-radius: 8px;
      height: 40px;
      padding: 0 16px;
      cursor: pointer;
      align-items: center;
    }
    
    .button *, .button ::slotted(*) {
      line-height: 1;
    }
    
    .button:hover {
      background: gray;
      transition: all 200ms;
    }

    .button__primary {
      background: black;
      color: white;
    }

    .button__secondary {
      background: white;
      color: black;
    }
    
    .button__icon ::slotted(*) {
      margin-right: 8px;
    }
  `;

  @property() variant: 'primary' | 'secondary' | 'tertiary' | 'danger' = 'primary';

  override render(): TemplateResult {
    return html`
      <button class="button button__${this.variant}">
        <div class="button__icon"><slot name="icon"></slot></div>
        <slot></slot>
      </button>
    `;
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'fds-button': FdsButton
  }
}
