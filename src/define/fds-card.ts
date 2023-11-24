import { FdsCard } from '../card.js'

customElements.define('fds-card', FdsCard)

declare global {
  interface HTMLElementTagNameMap {
    'fds-card': FdsCard
  }
}
