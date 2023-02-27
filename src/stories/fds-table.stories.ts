import { Meta } from '@storybook/web-components'
import { html, TemplateResult } from 'lit'
import { FdsButtonVariant } from '../fds-button'
import '../fds-table'
interface Item {
  column1: string
  column2: string
  column3: string
}

const items: Item[] = [
  { column1: 'Table cell 1', column2: 'Table cell 2', column3: 'Table cell 3' },
  { column1: 'Table cell 4', column2: 'Table cell 5', column3: 'Table cell 6' },
]

const headers = ['Column 1', 'Column 2', 'Column 3']

export default {
  title: 'Table',
  args: {
    striped: true,
  },
} as Meta

type Template = (args: { striped: boolean }) => TemplateResult

export const Table: Template = ({ striped }) => {
  return html`<fds-table
    .striped=${striped}
    .items=${items}
    .renderHeader=${renderHeader}
    .renderItem=${renderItem}
  >
  </fds-table>`
}

function renderHeader(): TemplateResult {
  return html`<tr>
    ${headers.map(header => html`<th>${header}</th>`)}
  </tr>`
}

function renderItem(item: Item): TemplateResult {
  return html`<tr>
    <td>${item.column1}</td>
    <td>${item.column2}</td>
    <td>${item.column3}</td>
  </tr> `
}

export const TableWithCustomStyles: Template = ({ striped }) => {
  return html`<fds-table
    .striped=${striped}
    .items=${items}
    .renderHeader=${renderHeader}
    .renderItem=${renderItemCustom}
  >
  </fds-table>`
}

function renderItemCustom(item: Item): TemplateResult {
  return html`<tr style="border-bottom: 1px solid darkgray;">
    <td style="background: white;">${item.column1}</td>
    <td>${item.column2}</td>
    <td>${item.column3}</td>
  </tr>`
}

export const TableWithCheckboxAndButton: Template = ({ striped }) => {
  return html`<fds-table
    .striped=${striped}
    .items=${items}
    .renderHeader=${renderHeaderWithCheckboxAndButton}
    .renderItem=${renderItemWithCheckboxAndButton}
  >
  </fds-table>`
}

function renderHeaderWithCheckboxAndButton(): TemplateResult {
  return html`<tr>
    <th>${headers[0]}</th>
    <th style="text-align: center;">${headers[1]}</th>
    <th style="text-align: center;">${headers[2]}</th>
  </tr>`
}

function renderItemWithCheckboxAndButton(item: Item): TemplateResult {
  return html`<tr>
    <td>${item.column1}</td>
    <td style="width: 20%; text-align: center;">
      <fds-checkbox .checked=${true}></fds-checkbox>
    </td>
    <td style="width: 20%; text-align: center;">
      <fds-button .variant=${FdsButtonVariant.tertiary} .icon=${'trash-2'}></fds-button>
    </td>
  </tr>`
}
