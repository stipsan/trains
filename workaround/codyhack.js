// This is only necessary as the Studio V2 struggle so bad with modern packages, react 18 included
import React from 'react'
import ReactDOM from 'react-dom/client'

import TrainsPreview from '../components/TrainsPreview'

export const bootCodyHack = (node) => {
  const root = ReactDOM.createRoot(node).render(
    React.createElement(TrainsPreview)
  )

  console.log('bootCodyHack', root)

  return () => {
    console.log('@TODO implement unmount')
  }
}
