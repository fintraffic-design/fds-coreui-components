import { FdsCard } from './fds-card';
import { assert } from '@open-wc/testing';

suite('fds-card', () => {
  test('is defined', () => {
    const el = document.createElement('fds-card');
    assert.instanceOf(el, FdsCard);
  });
});
