import { customElement, state } from 'lit/decorators.js'
import { html, LitElement, TemplateResult } from 'lit'
import './fds-actions'
import './fds-button'
import './fds-card'
import './fds-dialog'
import './fds-icon'

@customElement('fds-test-component')
export class FdsCard extends LitElement {
  @state() private modalOpen: boolean = false

  override createRenderRoot(): HTMLElement {
    return this
  }

  override render(): TemplateResult {
    return html`
      <h1>Card</h1>
      <div style="display: flex">
        <fds-card style="margin-right: 2rem;">
          <div slot="header-title">Title</div>
          <div slot="header-corner">Corner</div>
          Body
          <div slot="footer">Footer</div>
        </fds-card>

        <fds-card> Card with body only </fds-card>
      </div>

      <h1 style="padding-bottom: 12rem">Dialog</h1>
      <fds-dialog style="top: 16rem" open>
        <fds-card>
          <div slot="header-title">Dialog header</div>
          Dialog with card inside
          <fds-actions slot="footer">
            <fds-button variant="secondary">
              <div>Secondary</div>
            </fds-button>
            <fds-button>
              <div>Primary</div>
            </fds-button>
          </fds-actions>
        </fds-card>
      </fds-dialog>
      <fds-button @click="${this.toggleModal}">Open a modal dialog</fds-button>
      ${this.renderModal()}

      <h1>Actions and buttons</h1>
      <fds-actions style="padding: 0.5rem">
        <fds-button><span slot="icon">😀</span><span>Horizontal primary with icon</span></fds-button>
        <fds-button variant="secondary">Horizontal secondary</fds-button>
        <fds-button variant="tertiary">Horizontal tertiary</fds-button>
        <fds-button variant="danger">Horizontal danger</fds-button>
        <fds-button variant="glyph">✕</fds-button>
      </fds-actions>
      <fds-actions direction="horizontal" style="padding: 0.5rem">
        <fds-button disabled>Primary disabled</fds-button>
        <fds-button variant="secondary" disabled>Secondary disabled</fds-button>
        <fds-button variant="tertiary" disabled>Tertiary disabled</fds-button>
        <fds-button variant="danger" disabled>Danger disabled</fds-button>
        <fds-button variant="glyph" disabled>✕</fds-button>
      </fds-actions>
      <fds-actions direction="vertical" style="width: 20rem; padding: 2rem">
        <fds-button><span slot="icon">😀</span><span>Vertical primary with Icon</span> </fds-button>
        <fds-button variant="secondary">Vertical secondary</fds-button>
        <fds-button variant="tertiary">Vertical tertiary</fds-button>
        <fds-button variant="danger">Vertical danger</fds-button>
        <fds-button variant="glyph">✕</fds-button>
      </fds-actions>
    `
  }

  private renderModal(): TemplateResult | null {
    if (this.modalOpen) {
      return html`
        <fds-dialog modal>
          Hello
          <fds-button @click="${this.toggleModal}">Close</fds-button>
        </fds-dialog>
      `
    }
    return null
  }

  private toggleModal(): void {
    this.modalOpen = !this.modalOpen
  }
}
