import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { TemplateResult } from 'lit-html'
import { tokenVar } from './utils/token-utils'
import { FdsSize1, FdsSize6 } from '@fintraffic-design/coreui-css'

export enum FdsActionSheetDirection {
  horizontal = 'horizontal',
  vertical = 'vertical',
}

/**
 * Fintraffic Design System Action Sheet Component
 *
 * @property {FdsActionSheetDirection} direction
 */
@customElement('fds-action-sheet')
export class FdsActionSheet extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }

    .actions {
      display: flex;
      align-items: center;
    }

    .actions-content {
      display: flex;
      align-items: center;
    }

    .actions--horizontal {
      flex-direction: row;
    }

    .actions--horizontal .actions-separated {
      flex: 1;
      margin-right: ${tokenVar(FdsSize6)};
    }

    .actions--horizontal .actions-content {
      flex-direction: row;
    }

    .actions--vertical {
      flex-direction: column-reverse;
    }

    .actions--vertical .actions-content {
      flex-direction: column-reverse;
    }

    .actions--horizontal ::slotted(:not(:last-child)) {
      margin-right: ${tokenVar(FdsSize1)};
    }

    .actions--vertical ::slotted(:not(:last-child)) {
      margin-top: ${tokenVar(FdsSize1)};
    }

    .actions--vertical .actions-separated {
      margin-top: ${tokenVar(FdsSize6)};
    }

    .actions--vertical ::slotted(*) {
      width: 100%;
    }

    .actions--vertical .actions-content,
    .actions--vertical .actions-separated {
      width: 100%;
    }

    .actions--vertical ::slotted(*) {
      width: 100%;
    }
  `

  @property() direction: FdsActionSheetDirection = FdsActionSheetDirection.horizontal

  override render(): TemplateResult {
    return html`
      <div class="actions actions--${this.direction}">
        <div class="actions-separated"><slot name="separated"></div><slot>
        <div class="actions-content"><slot></slot></div>
      </div>
    `
  }
}
