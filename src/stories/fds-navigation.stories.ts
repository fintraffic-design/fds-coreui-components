import { html, TemplateResult } from 'lit'
import '../fds-navigation'
import { FdsNavigationItem, FdsNavigationVariant, ItemPosition } from '../fds-navigation'

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
  return html`<div style="height: 300px;">
    <fds-navigation
      .variant=${variant}
      .items=${items}
      .selected=${items[0]}
      @select="${(event: CustomEvent<FdsNavigationItem>): void => console.log('@select', event.detail)}"
    >
      <div style="display: flex; align-items: center;">
        <fds-icon icon="plus-circle" style="padding-right: 5px;"></fds-icon>
        Header
      </div>
    </fds-navigation>
  </div>`
}
