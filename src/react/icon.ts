import React from 'react'
import { EventName, createComponent } from '@lit/react'
import { FdsIcon as _FdsIcon } from '../icon'
import '../define/fds-icon'

export const FdsIcon = createComponent({
  tagName: 'fds-icon',
  elementClass: _FdsIcon,
  react: React,
  events: {
    onclick: 'click' as EventName<MouseEvent>,
  },
})
