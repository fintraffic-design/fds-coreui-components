import { css, html, LitElement, PropertyValues } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { TemplateResult } from 'lit-html'
import './fds-card'
import { tokenVar } from './utils/token-utils'
import { FdsRadiusLarge, FdsStyleElevation400 } from '@fintraffic-design/coreui-css'

/**
 * Dialog component.
 *
 * @property {boolean} modal
 * Dialog is a modal dialog: Does not allow interaction with background elements.
 */
@customElement('fds-dialog')
export default class FdsDialog extends LitElement {
  static override styles = css`
    :host {
    }

    dialog {
      padding: ${tokenVar(FdsRadiusLarge)};
      border-radius: ${tokenVar(FdsRadiusLarge)};
      border: none;
      box-shadow: ${tokenVar(FdsStyleElevation400)};
    }
  `

  @property() modal: boolean = false

  @query('dialog')
  private readonly dialog: HTMLDialogElement | undefined

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
      <dialog style="${this.style.cssText}">
        <slot></slot>
      </dialog>
    `
  }
}
