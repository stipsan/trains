import React, { useEffect, useRef } from 'react'
import S from '@sanity/desk-tool/structure-builder'
import EyeIcon from 'part:@sanity/base/eye-icon'

import { bootCodyHack } from '../compiled/codyhack'

import styles from './deskStructure.css'

const TestPreview = (props) => {
  const nodeRef = useRef()
  const bridgeRef = useRef()

  useEffect(() => {
    if (nodeRef.current) {
      const bridge = bootCodyHack(nodeRef.current)
      bridgeRef.current = bridge
      bridgeRef.current.sendProps(props)

      return () => {
        bridge.unmount()
      }
    }
  }, [])

  useEffect(() => {
    if (bridgeRef.current) {
      bridgeRef.current.sendProps(props)
    }
  }, [props])

  return <div className={styles.canvas} ref={nodeRef} />
}

export function getDefaultDocumentNode({ schemaType }) {
  // Add `Preview` tab to the `article` document form
  if (schemaType === 'train') {
    return S.document().views([
      S.view.form(),
      S.view.component(TestPreview).icon(EyeIcon).title('Preview'),
    ])
  }

  return undefined
}

export default () =>
  S.list()
    .title('Structures')
    .items([
      S.listItem()
        .title('Trains')
        .schemaType('train')
        .child(S.documentTypeList('train').title('Trains')),
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
