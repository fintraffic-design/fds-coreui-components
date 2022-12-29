import { FintrafficCard } from './fintraffic-card';
import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

suite('my-component', () => {
  test('is defined', () => {
    const el = document.createElement('fintraffic-card');
    assert.instanceOf(el, FintrafficCard);
  });

  test('renders with title attribute', async () => {
    const el = await fixture<FintrafficCard>(html`<fintraffic-card title-text="TitleText"></fintraffic-card>`);
    assert.equal(el.titleText, 'TitleText');
    assert.equal(el.shadowRoot?.querySelector('h3')?.textContent?.trim(), 'TitleText')
  });

  test('renders with title slot', async () => {
    const el = await fixture<FintrafficCard>(html`<fintraffic-card><span slot="title">TitleSlot</span></fintraffic-card>`);
    assert.equal(el.shadowRoot?.querySelector('h3')?.textContent?.trim(), 'TitleSlot')
  });
});
