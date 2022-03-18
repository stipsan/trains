import React from 'react'

export default {
  name: 'train',
  type: 'document',
  title: 'Train',
  icon: () => <span style={{ fontSize: '1.6em' }}>🚂</span>,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'tagline',
      type: 'text',
      title: 'Tagline',
    },
  ],
}
