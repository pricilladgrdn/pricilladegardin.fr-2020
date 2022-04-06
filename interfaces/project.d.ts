import { Document } from '@contentful/rich-text-types'
import { Asset } from 'contentful'

export interface IProject {
  id: string
  title: string
  description: Document
  startYear: number
  endYear?: number
  sponsor: string
  type: string[]
  backgroundColor: string
  textColor: string
  images: Asset[]
}
