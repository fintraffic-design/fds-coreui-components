import React from 'react'
import { EventName, createComponent } from '@lit/react'
import { FdsNavigation as _FdsNavigation, FdsNavigationItem } from '../navigation'
import '../define/fds-navigation'

export const FdsNavigation = createComponent({
  tagName: 'fds-navigation',
  elementClass: _FdsNavigation,
  react: React,
  events: {
    onselect: 'select' as EventName<CustomEvent<FdsNavigationItem>>,
  },
})
