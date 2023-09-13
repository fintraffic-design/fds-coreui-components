import { css, html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import { TemplateResult } from 'lit-html'
import { FdsProperty } from '@fintraffic-design/coreui-css'

/**
 * Fintraffic Design System Action Sheet Component
 */
@customElement('fds-action-sheet')
export default class FdsActionSheet extends LitElement {
  override render(): TemplateResult {
    return html`
      <div class="actions__separated">
        <slot name="separated"></slot>
      </div>
      <div class="actions__content">
        <slot></slot>
      </div>
    `
  }

  static override styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .actions__content {
      display: flex;
      align-items: center;
    }

    @media (min-width: 600px) {
      :host {
        flex-direction: row;
      }

      .actions-separated {
        margin-right: ${FdsProperty.Size6};
      }

      .actions-content {
        flex-direction: row;
      }

      ::slotted(:not(:last-child)) {
        margin-right: ${FdsProperty.Size1};
      }
    }

    @media (max-width: 600px) {
      :host {
        flex-direction: column-reverse;
      }

      .actions__content {
        width: 100%;
        flex-direction: column-reverse;
      }

      .actions__separated {
        width: 100%;
        margin-top: ${FdsProperty.Size6};
      }

      ::slotted(*) {
        width: 100%;
      }

      ::slotted(:not(:last-child)) {
        margin-top: ${FdsProperty.Size1};
      }
    }
  `
}
