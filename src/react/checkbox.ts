import React from 'react'
import { EventName, createComponent } from '@lit/react'
import { FdsCheckbox as _FdsCheckbox } from '../checkbox'
import '../define/fds-checkbox'

export const FdsCheckbox = createComponent({
  tagName: 'fds-checkbox',
  elementClass: _FdsCheckbox,
  react: React,
  events: {
    onselect: 'select' as EventName<CustomEvent<boolean>>,
  },
})
