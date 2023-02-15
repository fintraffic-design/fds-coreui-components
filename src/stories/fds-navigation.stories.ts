import { html, TemplateResult } from 'lit'
import '../fds-navigation'
import { FdsNavigationVariant, ItemPosition, FdsNavigationItem } from '../fds-navigation'

export default {
  title: 'Navigation',
  args: {
    variant: FdsNavigationVariant.primary,
  },
  argTypes: {
    variant: {
      options: Object.keys(FdsNavigationVariant),
      control: { type: 'select' },
    },
  },
}

type Template = (args: { variant: FdsNavigationVariant }) => TemplateResult

const items: FdsNavigationItem[] = [
  { label: 'Areatool', value: 'home' },
  { label: 'History', value: 'history' },
  { label: 'Settings', value: 'settings', position: ItemPosition.right, icon: 'chevron-down' },
]

export const Navigation: Template = ({ variant }) => {
  const onSelect = (item: string): void => console.log('Selected', item)

  return html`<div style="height: 300px;">
    <fds-navigation .variant=${variant} .items=${items} .onSelect=${onSelect} .selected=${items[0]}>
      <div style="display: flex; align-items: center;">
        <fds-icon icon="plus-circle" style="padding-right: 5px;"></fds-icon>
        Header
      </div>
    </fds-navigation>
  </div>`
}
