import { StoryObj, Meta, StoryFn } from '@storybook/web-components'
import { html, TemplateResult } from 'lit'
import { FdsButtonVariant } from '../button.js'
import '../define/fds-table.js'
import '../define/fds-checkbox.js'
import '../define/fds-button.js'
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

export default {
  title: 'Table',
  parameters: {
    componentSubtitle: 'Data table for displaying rows of data',
    docs: {
      description: {
        component:
          "`import '@fintraffic/fds-coreui-components/src/fds-table'` <br><br>\
          Element: `<fds-table>`",
      },
      source: {
        // Source code is written here because functions are not visible in "show code" feature in Storybook.
        code:
          '<fds-table .items=${items} .renderHeader=${renderHeader} .renderItem=${renderItem}>\n</fds-table>' +
          `\n${renderHeader}\n${renderItem}`,
        language: 'typescript',
      },
    },
  },
  args: {
    striped: true,
    items: items,
    renderHeader: undefined,
    renderItem: undefined,
    slot: undefined,
  },
  argTypes: {
    striped: {
      description:
        'Whether the table has a zebra-striped style for the table rows. <br><br>\
        `boolean`',
      table: {
        category: 'Properties',
        defaultValue: { summary: `true` },
      },
    },
    items: {
      description:
        'Data array for the table. <br><br>\
      `object[]`',
      table: {
        category: 'Properties',
        defaultValue: { summary: '[]' },
      },
    },
    renderHeader: {
      description:
        'Render function for the table header row. Use tr and th tags in the function to render headers for the table.<br><br>\
        `TemplateResult`',
      control: false,
      table: {
        category: 'Properties',
      },
    },
    renderItem: {
      description:
        'Render function for a table row. The function must have an item as a parameter. Use tr and td tags in the function. <br><br>\
      `TemplateResult`',
      control: false,
      table: {
        category: 'Properties',
      },
    },
    slot: {
      description: 'No slots',
      table: { category: 'Slots' },
      name: '',
      control: false,
    },
  },
} as Meta

const Template: StoryFn = ({ striped }) => {
  return html`<fds-table
    .striped=${striped}
    .items=${items}
    .renderHeader=${renderHeader}
    .renderItem=${renderItem}
  >
  </fds-table>`
}

const TemplateTableWithCustomStyles: StoryFn = ({ striped }) => {
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

export const Table: StoryObj = {
  render: Template,
}

export const TableWithCustomStyles: StoryObj = {
  render: TemplateTableWithCustomStyles,

  parameters: {
    docs: {
      description: {
        story: 'An example of a table that has checkboxes and buttons and custom styles for the columns.',
      },
      source: {
        // Source code is written here because functions are not visible in "show code" feature in Storybook.
        code:
          '<fds-table .items=${items} .renderHeader=${renderHeaderWithCheckboxAndButton} .renderItem=${renderItemWithCheckboxAndButton}>\n</fds-table>' +
          `\n${renderHeaderWithCheckboxAndButton}\n${renderItemWithCheckboxAndButton}`,
        language: 'typescript',
      },
    },
  },
}
