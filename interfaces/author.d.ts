import { Document } from '@contentful/rich-text-types'

export interface IAuthor {
  firstName: string
  lastName: string
  email: string
  instagram: string
  biography: Document
}
