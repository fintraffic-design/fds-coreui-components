import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { TemplateResult } from 'lit-html'
import { tokenVar } from './token-utils'
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
      justify-content: space-between;
    }

    .actions-content {
      display: flex;
      align-items: center;
    }

    .actions--horizontal {
      flex-direction: row;
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

    .actions--vertical .actions-content ::slotted(:not(:last-child)) {
      margin-top: ${tokenVar(FdsSize1)};
    }

    .actions--vertical ::slotted(:first-child) {
      margin-top: ${tokenVar(FdsSize6)};
    }

    .actions--vertical ::slotted(*) {
      width: 100%;
    }

    .actions--vertical .actions-content {
      width: 100%;
    }

    .actions--vertical .actions-content ::slotted(*) {
      width: 100%;
    }
  `

  @property() direction: FdsActionSheetDirection = FdsActionSheetDirection.horizontal

  override render(): TemplateResult {
    return html`
      <div class="actions actions--${this.direction}">
        <slot name="destructive"></slot>
        <div class="actions-content"><slot></slot></div>
      </div>
    `
  }
}
