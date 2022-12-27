import { MyComponent } from './my-component';
import { fixture, assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

suite('my-component', () => {
  test('is defined', () => {
    const el = document.createElement('my-component');
    assert.instanceOf(el, MyComponent);
  });

  test('renders with default values', async () => {
    const el = await fixture(html`<my-component></my-component>`);
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, World!</h1>
      <button>Click Count: 0</button>
      <slot></slot>
    `
    );
  });

  test('renders with a set name', async () => {
    const el = await fixture(html`<my-component name="Test"></my-component>`);
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, Test!</h1>
      <button>Click Count: 0</button>
      <slot></slot>
    `
    );
  });

  test('handles a click', async () => {
    const el = (await fixture(html`<my-component></my-component>`)) as MyComponent;
    const button = el.shadowRoot!.querySelector('button')!;
    button.click();
    await el.updateComplete;
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, World!</h1>
      <button>Click Count: 1</button>
      <slot></slot>
    `
    );
  });

  test('styling applied', async () => {
    const el = (await fixture(html`<my-component></my-component>`)) as MyComponent;
    await el.updateComplete;
    assert.equal(getComputedStyle(el).paddingTop, '16px');
  });
});
