// This is only necessary as the Studio V2 struggle so bad with modern packages, react 18 included
import ReactDOM from 'react-dom/client'

export const bootCodyHack = () => {
  // eslint-disable-next-line react/react-in-jsx-scope
  const root = ReactDOM.createRoot(document.getElementById('root')).render(
    <TrainsPreview />
  )

  console.log('bootCodyHack', root)

  return () => {
    console.log('@TODO implement unmount')
  }
}
