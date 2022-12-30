import { css, html, LitElement, PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { TemplateResult } from 'lit-html';

@customElement('fds-dialog')
export class FdsDialog extends LitElement {
  static override styles = css`
    :host {
    }
    
    .dialog__header h3 {
      margin: 0 0 16px 0;
    }
    
    .dialog__body {
      margin-bottom: 16px;
    }
  `;

  @property({ type: Boolean }) open: boolean = false;
  @property({ type: Boolean }) modal: boolean = false;

  @query('dialog')
  private readonly dialog: HTMLDialogElement | undefined;

  override update(changes: PropertyValues): void {
    super.update(changes);
    console.log('changes', changes, this.open, this.modal);
    if ( changes.get('open') !== this.open ) {
      if (this.open) {
        if (this.modal) {
          this.dialog?.showModal();
        } else {
          this.dialog?.show();
        }
      } else {
        this.dialog?.close();
      }
    }
  }

  override render(): TemplateResult {
    console.log(this.open);
    return html`
      <dialog style="${this.style.cssText}">
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
