import type { FileMetadata } from '@/hooks/use-file-upload'

import { toAbsoluteUrl } from '@/lib/helpers'

export const defaultFiles: FileMetadata[] = [
  {
    id: 'default-doc-1',
    name: 'document.pdf',
    size: 529254,
    type: 'application/pdf',
    url: toAbsoluteUrl('/media/files/document.pdf'),
  },
  {
    id: 'default-doc-2',
    name: 'intro.zip',
    size: 252846,
    type: 'application/zip',
    url: toAbsoluteUrl('/media/files/intro.zip'),
  },
  {
    id: 'default-doc-3',
    name: 'conclusion.xlsx',
    size: 353126,
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    url: toAbsoluteUrl('/media/files/conclusion.xlsx'),
  },
  {
    id: 'default-doc-4',
    name: 'package.json',
    size: 697,
    type: 'application/json',
    url: toAbsoluteUrl('/media/files/package.json'),
  },
]
