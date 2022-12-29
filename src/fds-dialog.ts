import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TemplateResult } from 'lit-html';

@customElement('fds-dialog')
export class FdsDialog extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }
    
    .dialog__header h3 {
      margin: 0 0 0.5rem 0;
    }

    .dialog__footer ::slotted(*) {
      margin-top: 0.5rem;
    }
  `

  override render(): TemplateResult {
    return html`
      <dialog open>
        <div class="dialog__header">
          <h3><slot name="header"></slot></h3>
        </div>
        <div class="dialog__body">
          <slot></slot>
        </div>
        <div class="dialog__footer">
          <slot name="footer"></slot>
        </div>
      </dialog>
    `;
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'fds-dialog': FdsDialog
  }
}
