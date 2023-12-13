import React from 'react'
import { EventName, createComponent } from '@lit/react'
import { FdsDropdown as _FdsDropdown, FdsDropdownEvent } from '../dropdown'
import '../define/fds-dropdown'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const FdsDropdown = <T>() =>
  createComponent({
    tagName: 'fds-dropdown',
    elementClass: _FdsDropdown<T>,
    react: React,
    events: {
      onselect: 'select' as EventName<FdsDropdownEvent<T>>,
    },
  })
