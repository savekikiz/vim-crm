import {
  Download,
  FileArchiveIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  HeadphonesIcon,
  ImageIcon,
  Plus,
  Trash2,
  VideoIcon,
  View,
} from 'lucide-react'

import type { FileWithPreview } from '@/hooks/use-file-upload'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Link } from '@/components/ui/link'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { type FileMetadata, formatBytes } from '@/hooks/use-file-upload'
import { cn } from '@/lib/utils'

type FileTableProps = {
  onGoToDetail: (id: string) => void
  onOpenDialogFile: () => void
  onRemoveFile: (id: string) => void
  uploadedFiles: FileUploadItem[]
}

type FileUploadItem = {
  error?: string
  progress: number
  status: 'completed' | 'error' | 'uploading'
} & FileWithPreview

export const FileTableList = ({
  onGoToDetail,
  onOpenDialogFile,
  onRemoveFile,
  uploadedFiles,
}: FileTableProps) => {
  const getFileIcon = (file: File | FileMetadata) => {
    const type = file instanceof File ? file.type : file.type
    if (type.startsWith('image/')) return <ImageIcon className="size-4" />
    if (type.startsWith('video/')) return <VideoIcon className="size-4" />
    if (type.startsWith('audio/')) return <HeadphonesIcon className="size-4" />
    if (type.includes('pdf')) return <FileTextIcon className="size-4" />
    if (type.includes('word') || type.includes('doc'))
      return <FileTextIcon className="size-4" />
    if (type.includes('excel') || type.includes('sheet'))
      return <FileSpreadsheetIcon className="size-4" />
    if (type.includes('zip') || type.includes('rar'))
      return <FileArchiveIcon className="size-4" />
    return <FileTextIcon className="size-4" />
  }

  const getFileTypeLabel = (file: File | FileMetadata) => {
    const type = file instanceof File ? file.type : file.type
    if (type.startsWith('image/')) return 'Image'
    if (type.startsWith('video/')) return 'Video'
    if (type.startsWith('audio/')) return 'Audio'
    if (type.includes('pdf')) return 'PDF'
    if (type.includes('word') || type.includes('doc')) return 'Word'
    if (type.includes('excel') || type.includes('sheet')) return 'Excel'
    if (type.includes('zip') || type.includes('rar')) return 'Archive'
    if (type.includes('json')) return 'JSON'
    if (type.includes('text')) return 'Text'
    return 'File'
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">ไฟล์เอกสาร</h3>
        <div className="flex gap-2">
          <Button onClick={onOpenDialogFile}>
            <Plus />
            เพิ่มไฟล์
          </Button>
        </div>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="text-xs">
              <TableHead className="h-9">Name</TableHead>
              <TableHead className="h-9">Type</TableHead>
              <TableHead className="h-9">Size</TableHead>
              <TableHead className="h-9 w-[100px] text-end">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {uploadedFiles.map((fileItem) => (
              <TableRow key={fileItem.id}>
                <TableCell className="py-2 ps-1.5">
                  <div className="flex items-center gap-1">
                    <div
                      className={cn(
                        'relative flex size-8 shrink-0 items-center justify-center text-muted-foreground/80'
                      )}
                    >
                      {fileItem.status === 'uploading' ? (
                        <div className="relative">
                          {/* Circular progress background */}
                          <svg
                            className="size-8 -rotate-90"
                            viewBox="0 0 32 32"
                          >
                            <circle
                              className="text-muted-foreground/20"
                              cx="16"
                              cy="16"
                              fill="none"
                              r="14"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            {/* Progress circle */}
                            <circle
                              className="text-primary transition-all duration-300"
                              cx="16"
                              cy="16"
                              fill="none"
                              r="14"
                              stroke="currentColor"
                              strokeDasharray={`${2 * Math.PI * 14}`}
                              strokeDashoffset={`${2 * Math.PI * 14 * (1 - fileItem.progress / 100)}`}
                              strokeLinecap="round"
                              strokeWidth="2"
                            />
                          </svg>
                          {/* File icon in center */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            {getFileIcon(fileItem.file)}
                          </div>
                        </div>
                      ) : (
                        <div className="not-[]:size-8 flex items-center justify-center">
                          {getFileIcon(fileItem.file)}
                        </div>
                      )}
                    </div>
                    <p className="flex items-center gap-1 truncate text-sm font-medium">
                      {fileItem.file.name}
                      {fileItem.status === 'error' && (
                        <Badge variant="destructive">Error</Badge>
                      )}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="py-2">
                  <Badge className="text-xs" variant="secondary">
                    {getFileTypeLabel(fileItem.file)}
                  </Badge>
                </TableCell>
                <TableCell className="py-2 text-sm text-muted-foreground">
                  {formatBytes(fileItem.file.size)}
                </TableCell>
                <TableCell className="py-2 pe-1">
                  <div className="flex items-center gap-1">
                    {fileItem.preview && (
                      <Button
                        asChild
                        className="size-8"
                        size="icon"
                        variant="link"
                      >
                        <Link href={fileItem.preview} target="_blank">
                          <Download className="size-3.5" />
                        </Link>
                      </Button>
                    )}
                    <Button
                      className="size-8"
                      onClick={() => onGoToDetail(fileItem.id)}
                      size="icon"
                      variant="link"
                    >
                      <View className="size-3.5" />
                    </Button>
                    <Button
                      className="size-8"
                      onClick={() => onRemoveFile(fileItem.id)}
                      size="icon"
                      variant="link"
                    >
                      <Trash2 className="size-3.5 text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
