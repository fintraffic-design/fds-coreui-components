import { FdsInput } from '../input.js'

customElements.define('fds-input', FdsInput)

declare global {
  interface HTMLElementTagNameMap {
    'fds-input': FdsInput
  }
}
