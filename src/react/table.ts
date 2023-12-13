import React from 'react'
import { createComponent } from '@lit/react'
import { FdsTable as _FdsTable } from '../table'
import '../define/fds-table'

export const FdsTable = createComponent({
  tagName: 'fds-table',
  elementClass: _FdsTable,
  react: React,
})
