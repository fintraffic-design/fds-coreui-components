import { css, html, LitElement, PropertyValues } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { TemplateResult } from 'lit-html'
import './fds-card'
import { tokenVar } from './utils/token-utils'
import { FdsRadiusLarge, FdsStyleElevation400 } from '@fintraffic-design/coreui-css'

/**
 * Dialog component.
 *
 * @event outside-modal-click - Dispatches a custom event when the dialog is a modal dialog and user clicks outside of it.
 *
 * @property {boolean} modal
 * Dialog is a modal dialog: Does not allow interaction with background elements.
 */
@customElement('fds-dialog')
export default class FdsDialog extends LitElement {
  @property() modal: boolean = false

  @query('dialog')
  private readonly dialog: HTMLDialogElement | undefined

  constructor() {
    super()

    this.addEventListener('click', ({ target }) => {
      if (this.modal && target === this) {
        this.dispatchEvent(new CustomEvent('outside-modal-click'))
      }
    })
  }

  override updated(changes: PropertyValues<FdsDialog>): void {
    super.updated(changes)
    if (this.modal !== changes.get('modal')) {
      this.dialog?.close()
      if (this.modal) {
        this.dialog?.showModal()
      } else {
        this.dialog?.show()
      }
    }
  }

  override render(): TemplateResult {
    return html`
      <dialog style="${this.style.cssText}" @cancel=${(e: Event): void => e.preventDefault()}>
        <slot></slot>
      </dialog>
    `
  }

  static override styles = css`
    dialog {
      border-radius: ${tokenVar(FdsRadiusLarge)};
      border: none;
      box-shadow: ${tokenVar(FdsStyleElevation400)};
      padding: calc(${tokenVar(FdsRadiusLarge)} / 2);
      overflow: visible;
      outline: none;
    }
  `
}
