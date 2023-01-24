import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { TemplateResult } from 'lit-html'

export enum FdsActionSheetDirection {
  horizontal = 'horizontal',
  vertical = 'vertical',
}

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

    .actions--horizontal {
      flex-direction: row;
    }

    .actions--vertical {
      flex-direction: column;
    }

    .actions--horizontal ::slotted(:not(:last-child)) {
      margin-right: 8px;
    }

    .actions--vertical ::slotted(:not(:last-child)) {
      margin-bottom: 8px;
    }

    .actions--vertical ::slotted(*) {
      width: 100%;
    }
  `

  @property() direction: FdsActionSheetDirection = FdsActionSheetDirection.horizontal

  override render(): TemplateResult {
    return html`
      <div class="actions actions--${this.direction}">
        <slot></slot>
      </div>
    `
  }
}
