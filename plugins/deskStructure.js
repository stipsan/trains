import React, { useEffect } from 'react'
import S from '@sanity/desk-tool/structure-builder'
import EyeIcon from 'part:@sanity/base/eye-icon'
import EditIcon from 'part:@sanity/base/edit-icon'
import ReactDOM from 'react-dom'

import TrainsPreview from '../components/TrainsPreview'

const TestPreview = (props) => {
  console.log('TestPreview', props)

  useEffect(() => {
    const root = ReactDOM.createRoot(document.getElementById('root')).render(
      <TrainsPreview />
    )

    console.log('TestPreview', { root })
  }, [])

  return <div id="three" />
}

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Trains')
        .schemaType('train')
        .child(
          S.documentTypeList('train')
            .title('Train')
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('train')
                .views([
                  S.view.form().icon(EditIcon),
                  S.view.component(TestPreview).icon(EyeIcon).title('Preview'),
                ])
            )
        ),
    ])
/*
export default () => S.list()
.title('Content')
.items([ S.listItem()
  .title('Trains')
  .schemaType('train')
  .child(S.documentTypeList('train').title('Trains').child(
      S.documentTypeListItems('train')
        .title('Trains')
        .views([
          S.view.form().icon(EditIcon),
          S.view
            .component(TestPreview)
            .icon(EyeIcon)
            .title('Preview'),
        ])
        
    ))
  
  /*
  export default S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Trains')
        .icon(EyeIcon)
        .child(S.list().title('Trains').items([S.listItem.]))
    ])
    /*
    .id('train')
    .schemaType('train')
    .child(
      S.documentTypeListItems('train')
        .title('Trains')
        .views([
          S.view.form().icon(EditIcon),
          S.view
            .component(TestPreview)
            .icon(EyeIcon)
            .title('Preview'),
        ])
        
    )
    // */
