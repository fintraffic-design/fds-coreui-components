import { css, html, LitElement, PropertyValues } from 'lit'
import { customElement, property, query, queryAssignedElements, queryAsync } from 'lit/decorators.js'
import { TemplateResult } from 'lit-html'
import './fds-card'
import { FdsProperty } from '@fintraffic-design/coreui-css'

/**
 * Dialog component.
 *
 * @event outside-modal-click - Dispatches a custom event when the dialog is a modal dialog and user clicks outside of it.
 *
 * @property {boolean} modal
 * Dialog is a modal dialog: Does not allow interaction with background elements.
 *
 * @property {boolean} overlay
 * Dialog shows an overlay: Does not allow interaction with the dialog.
 */
@customElement('fds-dialog')
export default class FdsDialog extends LitElement {
  @property() modal: boolean = false
  @property() overlay: boolean = false

  @query('dialog')
  private readonly dialog: HTMLDialogElement | undefined

  @queryAssignedElements()
  private readonly slots: HTMLElement[] | undefined

  @queryAsync('.overlay')
  private readonly overlayElement: Promise<HTMLDivElement | undefined> | undefined

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
    if (changes.has('modal') && this.modal !== changes.get('modal')) {
      this.dialog?.close()
      if (this.modal) {
        this.dialog?.showModal()
      } else {
        this.dialog?.show()
      }
    }

    this.overlayElement?.then(overlay => {
      const [slot] = this.slots ?? []

      if (overlay && slot) {
        const { width, height } = slot.getBoundingClientRect()
        overlay.style.width = this.overlaySizeStyle(width)
        overlay.style.height = this.overlaySizeStyle(height)
        overlay.style.pointerEvents = this.overlay ? 'auto' : 'none'
        overlay.style.opacity = this.overlay ? '0.5' : '0'
        slot.inert = this.overlay
      }
    })
  }

  override render(): TemplateResult {
    return html`
      <dialog style="${this.style.cssText}" @cancel=${(e: Event): void => e.preventDefault()}>
        <div class="overlay" inert></div>
        <slot></slot>
      </dialog>
    `
  }

  private overlaySizeStyle(size: number): string {
    return `calc(${size}px + ${FdsProperty.RadiusLarge}`
  }

  static override styles = css`
    dialog {
      border-radius: ${FdsProperty.RadiusLarge};
      border: none;
      box-shadow: ${FdsProperty.StyleElevation400};
      padding: calc(${FdsProperty.RadiusLarge} / 2);
      overflow: visible;
      outline: none;
    }

    .overlay {
      position: fixed;
      margin: calc(${FdsProperty.RadiusLarge} / -2);
      border-radius: ${FdsProperty.RadiusLarge};
      background-color: ${FdsProperty.ColorBrandBlack};
      pointer-events: none;
      transition: opacity 0.2s ease;
      opacity: 0;
      z-index: 2;
    }
  `
}
