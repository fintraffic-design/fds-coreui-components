import { css, html, LitElement, PropertyValues } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { TemplateResult } from 'lit-html'
import './fds-card'
import { token } from './token-utils'

@customElement('fds-dialog')
export class FdsDialog extends LitElement {
  static override styles = css`
    :host {
    }

    dialog {
      padding: ${token('radius-large')};
      border-radius: ${token('radius-large')};
      border: none;
      box-shadow: ${token('style-elevation-400')};
    }
  `

  @property({ type: Boolean }) open: boolean = false
  @property({ type: Boolean }) modal: boolean = false

  @query('dialog')
  private readonly dialog: HTMLDialogElement | undefined

  override update(changes: PropertyValues<FdsDialog>): void {
    super.update(changes)
    if (changes.get('open') !== this.open) {
      if (this.open) {
        if (this.modal) {
          this.dialog?.showModal()
        } else {
          this.dialog?.show()
        }
      } else {
        this.dialog?.close()
      }
    }
  }

  override render(): TemplateResult {
    return html`
      <dialog style="${this.style.cssText}">
        <slot></slot>
      </dialog>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'fds-dialog': FdsDialog
  }
}
