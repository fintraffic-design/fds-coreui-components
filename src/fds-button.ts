import { css, html, LitElement } from 'lit'
import { TemplateResult } from 'lit-html'
import { customElement, property } from 'lit/decorators.js'

@customElement('fds-button')
export default class FdsButton extends LitElement {
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

    .button *,
    .button ::slotted(*) {
      line-height: 1;
    }

    :host-context(.actions--vertical) .button:not(.button--glyph) {
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

    .button--primary {
      background: black;
      color: white;
    }

    .button--secondary {
      background: white;
      color: black;
    }

    .button--tertiary {
      background: transparent;
      border-color: transparent;
      color: black;
    }

    .button--danger {
      background: red;
      border-color: red;
      color: white;
    }

    .button--danger:hover {
      background: darkred;
      border-color: darkred;
    }

    .button--glyph {
      background: transparent;
      border-color: transparent;
      color: black;
    }

    .button__icon ::slotted(*) {
      margin-right: 8px;
    }
  `

  @property() variant: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'glyph' = 'primary'
  @property() disabled: boolean = false

  override render(): TemplateResult {
    return html`
      <button class="button button--${this.variant}" ?disabled="${this.disabled}">
        <div class="button__icon"><slot name="icon"></slot></div>
        <slot></slot>
      </button>
    `
  }
}
