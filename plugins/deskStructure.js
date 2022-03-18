import React, { useEffect, useRef } from 'react'
import S from '@sanity/desk-tool/structure-builder'
import EyeIcon from 'part:@sanity/base/eye-icon'
import EditIcon from 'part:@sanity/base/edit-icon'

import { bootCodyHack } from '../compiled/codyhack'

const TestPreview = (props) => {
  console.log('bootCodyHack', bootCodyHack)
  const nodeRef = useRef()

  useEffect(() => {
    if (nodeRef.current) {
      const root = bootCodyHack(nodeRef.current)

      console.log('TestPreview', { root })
    }
  }, [])

  return <div ref={nodeRef} />
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
