import React from 'react'
import { EventName, createComponent } from '@lit/react'
import { FdsDialog as _FdsDialog } from '../dialog'
import '../define/fds-dialog'

export const FdsDialog = createComponent({
  tagName: 'fds-dialog',
  elementClass: _FdsDialog,
  react: React,
  events: {
    'onoutside-modal-click': 'outside-modal-click' as EventName<CustomEvent>,
  },
})
