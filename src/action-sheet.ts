import { css, html, LitElement } from 'lit'
import { TemplateResult } from 'lit-html'
import { FdsSize1, FdsSize6 } from '@fintraffic/fds-coreui-css'

/**
 * Fintraffic Design System Action Sheet Component
 */
export class FdsActionSheet extends LitElement {
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
        margin-right: ${FdsSize6};
      }

      .actions-content {
        flex-direction: row;
      }

      ::slotted(:not(:last-child)) {
        margin-right: ${FdsSize1};
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
        margin-top: ${FdsSize6};
      }

      ::slotted(*) {
        width: 100%;
      }

      ::slotted(:not(:last-child)) {
        margin-top: ${FdsSize1};
      }
    }
  `
}
