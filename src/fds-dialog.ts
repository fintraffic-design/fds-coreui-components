import { css, html, LitElement, PropertyValues } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { TemplateResult } from 'lit-html'
import './fds-card'

@customElement('fds-dialog')
export class FdsDialog extends LitElement {
  static override styles = css`
    :host {
    }

    dialog {
      padding: 8px;
      border-radius: 8px;
      border: none;
      box-shadow: grey 0 8px 16px;
    }
  `

  @property({ type: Boolean }) open: boolean = false
  @property({ type: Boolean }) modal: boolean = false

  @query('dialog')
  private readonly dialog: HTMLDialogElement | undefined

  override update(changes: PropertyValues): void {
    super.update(changes)
    console.log('changes', changes, this.open, this.modal)
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
    console.log(this.open)
    return html`
      <dialog style="${this.style.cssText}">
        <slot></slot>
      </dialog>
    `
  }
}
