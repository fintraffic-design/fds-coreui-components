import React from 'react'
import { EventName, createComponent } from '@lit/react'
import { FdsCard as _FdsCard } from '../card'
import '../define/fds-card'

export const FdsCard = createComponent({
  tagName: 'fds-card',
  elementClass: _FdsCard,
  react: React,
  events: {
    'oncorner-click': 'corner-click' as EventName<CustomEvent<void>>,
  },
})
