// This is only necessary as the Studio V2 struggle so bad with modern packages, react 18 included
import React from 'react'
import ReactDOM from 'react-dom/client'

import TrainsPreview from '../components/TrainsPreview'

export const bootCodyHack = (node, props) => {
  const root = ReactDOM.createRoot(node)
  
  function render(props) {
    root.render(React.createElement(TrainsPreview, props))
  }
  render(props)

  return {unmount: () => root.unmount(), sendProps: props => render(props)}
}
