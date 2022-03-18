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
    // eslint-disable-next-line react-hooks/exhaustive-deps -- if only you, ESLint, could understand the next effect hook is making sure props don't go stale :facepalm:
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
