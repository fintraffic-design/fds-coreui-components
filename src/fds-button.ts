import { css, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TemplateResult } from 'lit-html';

@customElement('fds-button')
export class FdsButton extends LitElement {
  static override styles = css`
    
    :host {
      display: inline-flex;
      justify-content: center;
    }
    
    
    .button {
      display: flex;
      border: 2px solid black;
      border-radius: 8px;
      height: 40px;
      padding: 0 16px;
      cursor: pointer;
      align-items: center;
      justify-content: center;
    }
    
    .button *, .button ::slotted(*) {
      line-height: 1;
    }

    :host-context(.actions__vertical) .button:not(.button__glyph) {
      width: 100%;
    }
    
    .button:hover {
      background: blue;
      border-color: blue;
      color: white;
      transition: all 200ms;
    }
    
    .button:disabled {
      border-color: darkgray;
      color: gray;
      background: lightgray;
    }

    .button__primary {
      background: black;
      color: white;
    }

    .button__secondary {
      background: white;
      color: black;
    }

    .button__tertiary {
      background: transparent;
      border-color: transparent;
      color: black;
    }
    
    .button__danger {
      background: red;
      border-color: red;
      color: white;
    }
    
    .button__danger:hover {
      background: darkred;
      border-color: darkred;
    }

    .button__glyph {
      background: transparent;
      border-color: transparent;
      color: black;
    }
    
    .button__icon ::slotted(*) {
      margin-right: 8px;
    }
  `;

  @property() variant: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'glyph' = 'primary';
  @property({ type: Boolean }) disabled: boolean = false;

  override render(): TemplateResult {
    return html`
      <button class="button button__${this.variant}" disabled="${this.disabled || nothing}">
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
