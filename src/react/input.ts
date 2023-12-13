import React from 'react'
import { EventName, createComponent } from '@lit/react'
import { FdsInput as _FdsInput } from '../input'
import '../define/fds-input'

export const FdsInput = createComponent({
  tagName: 'fds-input',
  elementClass: _FdsInput,
  react: React,
  events: {
    onchange: 'change' as EventName<CustomEvent<string>>,
  },
})
