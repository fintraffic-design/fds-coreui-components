import { html, TemplateResult } from 'lit'
import '../fds-navigation'
import { FdsNavigationVariant } from '../fds-navigation'

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
const sections = [
  { label: 'Areatool', value: 'home' },
  { label: 'History', value: 'history' },
]
export const Navigation: Template = ({ variant }) => {
  const onSelect = (value: string) => console.log('Selected', value)
  return html`<div style="height: 300px;">
    <fds-navigation .variant=${variant} .sections=${sections} .onSelect=${onSelect}></fds-navigation>
  </div>`
}
