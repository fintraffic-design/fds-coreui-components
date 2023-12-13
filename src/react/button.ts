import React from 'react'
import { EventName, createComponent } from '@lit/react'
import { FdsButton as _FdsButton } from '../button'
import '../define/fds-button'

export const FdsButton = createComponent({
  tagName: 'fds-button',
  elementClass: _FdsButton,
  react: React,
  events: {
    onclick: 'click' as EventName<MouseEvent>,
  },
})
