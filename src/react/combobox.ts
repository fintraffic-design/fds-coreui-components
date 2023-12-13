import React from 'react'
import { EventName, createComponent } from '@lit/react'
import { FdsCombobox as _FdsCombobox, FdsComboboxEvent } from '../combobox'
import '../define/fds-combobox'

export const FdsCombobox = createComponent({
  tagName: 'fds-combobox',
  elementClass: _FdsCombobox,
  react: React,
  events: {
    onselect: 'select' as EventName<FdsComboboxEvent>,
  },
})
