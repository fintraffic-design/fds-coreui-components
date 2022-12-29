import { FdsCard } from './fds-card';
import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

suite('my-component', () => {
  test('is defined', () => {
    const el = document.createElement('fds-card');
    assert.instanceOf(el, FdsCard);
  });

  // TODO en tiedä miksi ei toimi, pitää saada toimimaan?
  test('renders with title slot', async () => {
    const el = await fixture<FdsCard>(html`<fds-card><span slot="header-title">TitleSlot</span></fds-card>`);
    assert.equal(el.shadowRoot?.querySelector('h3')?.textContent?.trim(), 'TitleSlot')
  });
});
