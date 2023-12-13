import React from 'react'
import { createComponent } from '@lit/react'
import { FdsPopover as _FdsPopover } from '../popover'
import '../define/fds-popover'

export const FdsPopover = createComponent({
  tagName: 'fds-popover',
  elementClass: _FdsPopover,
  react: React,
})
