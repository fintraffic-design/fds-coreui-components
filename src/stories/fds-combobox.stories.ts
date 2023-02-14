import { Meta, Story } from '@storybook/web-components'
import { html } from 'lit'
import '../fds-combobox'

export default {
  title: 'Combobox',
  args: {
    placeholder: 'Options',
    options: ['foo', 'foo2', 'foo 3', 'bar', 'bar2', 'bar 3'],
    initialValue: undefined,
    disabled: false,
    error: false,
    addNewIndicator: false,
  },
} as Meta

const Template: Story = ({
  options,
  initialValue,
  disabled,
  error,
  placeholder,
  onSelect,
  addNewIndicator,
}) => {
  return html`
    <div style="width:284px">
      <fds-combobox
        .options=${options}
        .initialValue=${initialValue}
        .disabled=${disabled}
        .error=${error}
        .placeholder=${placeholder}
        .onSelect=${onSelect}
        .addNewIndicator=${addNewIndicator}
      ></fds-combobox>
    </div>
  `
}

export const Combobox: Story = Template.bind({})

export const LongText: Story = Template.bind({})

LongText.args = {
  options: [
    'Foooooooooooooooooooooooooooooooooooooooooooooo',
    'Foo-Bar-Foo-Bar-Foo-Bar-Foo-Bar-Foo-Bar-Foo-Bar-Foo-Bar-Foo-Bar',
    'Foo Bar Foo Bar Foo Bar Foo Bar Foo Bar Foo Bar Foo Bar Foo Bar',
  ],
}

export const BigList: Story = Template.bind({})

BigList.args = {
  options: getNames(),
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
