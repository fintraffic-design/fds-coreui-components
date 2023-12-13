import React from 'react'
import { EventName, createComponent } from '@lit/react'
import { FdsAlert as _FdsAlert } from '../alert'
import '../define/fds-alert'

export const FdsAlert = createComponent({
  tagName: 'fds-alert',
  elementClass: _FdsAlert,
  react: React,
  events: {
    ondismissed: 'dismissed' as EventName<CustomEvent>,
  },
})
