import S from '@sanity/desk-tool/structure-builder'
import EyeIcon from 'part:@sanity/base/eye-icon'
import EditIcon from 'part:@sanity/base/edit-icon'

const TestPreview = props => {
  console.log('TestPreview', props)
  return null
}

export default S.listItem()
  .title('Trains')
  .schemaType('train')
  .child(
    S.documentTypeList('train')
      .title('Trains')
      .child(documentId =>
        S.document()
          .documentId(documentId)
          .schemaType('train')
          .views([
            S.view.form().icon(EditIcon),
            S.view
              .component(TestPreview)
              .icon(EyeIcon)
              .id('preview')
              .title('Preview'),
            
          ])
      )
  )