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
      name: 'environmentPreset',
      type: 'string',
      title: 'Environment preset',
      initialValue: 'dawn',
      options: {
        list: [
          'sunset',
          'dawn',
          'night',
          //'warehouse',
          'forest',
          // 'apartment',
          // 'studio',
          'city',
          'park',
          // 'lobby',
        ],
      },
    },
    {
      name: 'cabins',
      title: 'Cabins',
      type: 'array',
      of: [
        {
          name: 'cabin',
          title: 'Cabins',
          type: 'object',
          fields: [
            {
              name: 'name',
              type: 'string',
              title: 'Name',
            },
            {
              name: 'color',
              type: 'string',
              title: 'Color',
              initialValue: '#252525',
              options: {
                list: ['#252525', '#454545'],
              },
            },
            {
              name: 'seatColor',
              type: 'string',
              title: 'Seat color',
              initialValue: 'sandybrown',
              options: {
                list: ['sandybrown', 'gray', 'lightskyblue'],
              },
            },
          ],
        },
      ],
    },
  ],
}
