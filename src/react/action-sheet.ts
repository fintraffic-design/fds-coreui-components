import React from 'react'
import { createComponent } from '@lit/react'
import { FdsActionSheet as _FdsActionSheet } from '../action-sheet'
import '../define/fds-action-sheet'

export const FdsActionSheet = createComponent({
  tagName: 'fds-action-sheet',
  elementClass: _FdsActionSheet,
  react: React,
})
