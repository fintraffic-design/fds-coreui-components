import React from 'react'
import { createComponent } from '@lit/react'
import { FdsDivider as _FdsDivider } from '../divider'
import '../define/fds-divider'

export const FdsDivider = createComponent({
  tagName: 'fds-divider',
  elementClass: _FdsDivider,
  react: React,
})
