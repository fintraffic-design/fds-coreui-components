import { customElement, state } from 'lit/decorators.js'
import { html, LitElement, TemplateResult } from 'lit'
import './fds-action-sheet'
import './fds-button'
import './fds-card'
import './fds-dialog'
import './fds-icon'
import './fds-alert'
import { FdsColorDanger300 } from '@fintraffic-design/coreui-css/dist/tokens'

@customElement('fds-test-component')
export class FdsCard extends LitElement {
  @state() private modalOpen: boolean = false

  constructor() {
    super()
    new EventSource('/esbuild').addEventListener('change', () => location.reload())
  }

  override createRenderRoot(): HTMLElement {
    return this
  }

  override render(): TemplateResult {
    return html`
      <h1>Card</h1>
      <div style="display: flex">
        <fds-card style="margin-right: 2rem; width: 200px;">
          <div slot="header-title">Title</div>
          <div slot="header-corner">Corner</div>
          <div slot="content">Content</div>
          <div slot="footer" style="margin: 8px;">Footer</div>
        </fds-card>

        <fds-card style="margin-right: 2rem; width: 170px;" class="elevation-200">
          <div slot="header"></div>
          <div slot="content">Card with content only and elevation-200</div>
        </fds-card>

        <fds-card style="width: 200px; margin-right: 2rem;" class="elevation-100">
          <div slot="header" style="width: 100%; background-color: black; color: white; padding: 8px 8px;">
            Custom header
          </div>
          <div slot="content">Card with custom header and elevation-100</div>
        </fds-card>
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
      ${this.renderModal()}
      <fds-button @click="${this.toggleModal}">Open a modal dialog</fds-button>

      <h1>Icons</h1>
      <fds-icon icon="alert-circle" .color="${FdsColorDanger300}"></fds-icon>

      <h1>Actions and buttons</h1>
      <fds-action-sheet style="padding: 0.5rem">
        <fds-button><span slot="icon">😀</span><span>Horizontal primary with icon</span></fds-button>
        <fds-button variant="secondary">Horizontal secondary</fds-button>
        <fds-button variant="tertiary">Horizontal tertiary</fds-button>
        <fds-button variant="danger">Horizontal danger</fds-button>
        <fds-button variant="glyph">✕</fds-button>
      </fds-action-sheet>
      <fds-action-sheet direction="horizontal" style="padding: 0.5rem">
        <fds-button disabled>Primary disabled</fds-button>
        <fds-button variant="secondary" disabled>Secondary disabled</fds-button>
        <fds-button variant="tertiary" disabled>Tertiary disabled</fds-button>
        <fds-button variant="danger" disabled>Danger disabled</fds-button>
        <fds-button variant="glyph" disabled>✕</fds-button>
      </fds-action-sheet>
      <fds-action-sheet direction="vertical" style="width: 20rem; padding: 2rem">
        <fds-button><span slot="icon">😀</span><span>Vertical primary with Icon</span> </fds-button>
        <fds-button variant="secondary">Vertical secondary</fds-button>
        <fds-button variant="tertiary">Vertical tertiary</fds-button>
        <fds-button variant="danger">Vertical danger</fds-button>
        <fds-button variant="glyph">✕</fds-button>
      </fds-action-sheet>
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
