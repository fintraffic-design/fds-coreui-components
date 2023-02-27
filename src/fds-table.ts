import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { nothing, TemplateResult } from 'lit-html'
import { tokenVar } from './utils/token-utils'
import { FdsColorNeutral400, FdsColorBrandWhite, FdsColorNeutral50 } from '@fintraffic-design/coreui-css'
import './global-types'
import { uiHelperTextClass } from './utils/css-utils'

export type FdsTableItem = object

/**
 * Table component.
 *
 * @property {boolean} striped - Zebra-striping style for the table rows.
 * @property {FdsTableItem[]} items - Data for the table.
 * @property {function} renderHeader - Render function for the table header. Use tr and th tags in the function.
 * @property {function} renderItem - Render function for a table row. Item is given as a parameter. Use tr and td tags in the function.
 *
 */
@customElement('fds-table')
export default class FdsTable extends LitElement {
  @property() striped: boolean = true
  @property() items: FdsTableItem[] = []
  @property() renderHeader: () => TemplateResult | typeof nothing = () => nothing
  @property() renderItem: (item: FdsTableItem) => TemplateResult | typeof nothing = () => nothing

  override render(): TemplateResult {
    return html`
      <table class="ui-helper-text">
        <thead>
          ${this.renderHeader()}
        </thead>
        <tbody class="${this.striped ? 'table-rows--striped' : ''}">
          ${this.items.map(item => this.renderItem(item))}
        </tbody>
      </table>
    `
  }

  static override styles = [
    css`
      table {
        width: 100%;
        border-collapse: collapse;
      }

      thead {
        background: ${tokenVar(FdsColorNeutral400)};
        color: ${tokenVar(FdsColorBrandWhite)};
        position: sticky;
        top: 0;
      }

      tbody {
        background: ${tokenVar(FdsColorBrandWhite)};
      }

      thead tr {
        height: 40px;
      }

      tbody tr {
        height: 39px;
        border-bottom: 1px solid transparent;
      }

      th,
      td {
        text-align: left;
        padding: 0 8px;
        font-size: 16px;
      }

      .table-rows--striped tr:nth-child(even) {
        background: ${tokenVar(FdsColorNeutral50)};
      }

      ${uiHelperTextClass}
    `,
  ]
}
