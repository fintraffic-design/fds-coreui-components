import { StoryObj, Meta, StoryFn } from '@storybook/web-components'
import { html } from 'lit'
import '../define/fds-combobox.js'
import { FdsComboboxEvent } from '../combobox.js'

export default {
  title: 'Combobox',
  parameters: {
    componentSubtitle: 'List of options with input filtering',
    docs: {
      description: {
        component:
          "`import '@fintraffic/fds-coreui-components/dist/define/fds-combobox'` <br><br>\
          Selector: `<fds-combobox>`",
      },
    },
    actions: {
      handles: ['select'],
    },
  },
  args: {
    placeholder: 'Options',
    options: ['foo', 'foo2', 'foo 3', 'bar', 'bar2', 'bar 3'],
    value: '',
    disabled: false,
    error: false,
    addNewIndicator: false,
    select: undefined,
    slot: undefined,
  },
  argTypes: {
    placeholder: {
      description:
        'Placeholder for the combobox. <br><br>\
        `string`',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'undefined' },
      },
    },
    options: {
      description:
        'Options listed in the combobox. <br><br>\
        `string[]`',
      table: {
        category: 'Properties',
        defaultValue: { summary: '[]' },
      },
    },
    value: {
      description:
        'Selected option. <br><br>\
        `string`',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'undefined' },
      },
    },
    disabled: {
      description:
        'Whether the combobox is disabled. <br><br>\
        `boolean`',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      description:
        'Whether the combobox is in error state. <br><br>\
        `boolean`',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
      },
    },
    addNewIndicator: {
      description:
        'Whether the user can add a new value not displayed in the list. Option of adding a new value appears after the user has given some input. <br><br>\
        `boolean`',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
      },
    },
    select: {
      description:
        "Event that is dispatched when an option is selected. The value is in the event's details field. <br><br> \
      `CustomEvent<string>`",
      table: { category: 'Events' },
      name: '@select',
      control: false,
    },
    slot: {
      description: 'No slots',
      table: { category: 'Slots' },
      name: '',
      control: false,
    },
  },
} as Meta

const Template: StoryFn = ({ options, value, disabled, error, placeholder, addNewIndicator }) => {
  return html`
    <div style="width:284px; height: 260px;">
      <fds-combobox
        .options=${options}
        .value=${value}
        .disabled=${disabled}
        .error=${error}
        .placeholder=${placeholder}
        .addNewIndicator=${addNewIndicator}
        @select="${(event: FdsComboboxEvent): void => console.log('@select', event.detail)}"
      ></fds-combobox>
    </div>
  `
}

export const Combobox: StoryObj = {
  render: Template,
}

export const LongText: StoryObj = {
  render: Template,

  parameters: {
    docs: {
      description: {
        story: 'An example of a combobox with long values in options.',
      },
    },
  },

  args: {
    options: [
      'Foooooooooooooooooooooooooooooooooooooooooooooo',
      'Foo-Bar-Foo-Bar-Foo-Bar-Foo-Bar-Foo-Bar-Foo-Bar-Foo-Bar-Foo-Bar',
      'Foo Bar Foo Bar Foo Bar Foo Bar Foo Bar Foo Bar Foo Bar Foo Bar',
    ],
  },
}

export const BigList: StoryObj = {
  render: Template,

  parameters: {
    docs: {
      description: {
        story: 'An example of a combobox with a long list of options.',
      },
    },
  },

  args: {
    options: getNames(),
  },
}

function getNames(): string[] {
  const firstNames = [
    'Tuula',
    'Anne',
    'Päivi',
    'Anna',
    'Ritva',
    'Leena',
    'Pirjo',
    'Sari',
    'Minna',
    'Marja',
    'Tiina',
    'Riitta',
    'Tarja',
    'Pirkko',
    'Laura',
    'Seija',
    'Aino',
    'Liisa',
    'Eeva',
    'Raija',
    'Juha',
    'Timo',
    'Matti',
    'Kari',
    'Mikko',
    'Jari',
    'Antti',
    'Jukka',
    'Mika',
    'Markku',
    'Pekka',
    'Hannu',
    'Heikki',
    'Seppo',
    'Janne',
    'Ari',
    'Sami',
    'Ville',
    'Marko',
    'Petri',
  ]
  const lastNames = [
    'Korhonen',
    'Virtanen',
    'Mäkinen',
    'Nieminen',
    'Mäkelä',
    'Hämäläinen',
    'Laine',
    'Heikkinen',
    'Koskinen',
    'Järvinen',
  ]
  const listOfNames = []
  for (const firstName of firstNames) {
    for (const lastName of lastNames) {
      listOfNames.push(firstName + ' ' + lastName)
    }
  }
  return listOfNames
}
