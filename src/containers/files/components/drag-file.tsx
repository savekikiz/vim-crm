import { Upload } from 'lucide-react'

import { type FileUploadActions, formatBytes } from '@/hooks/use-file-upload'
import { cn } from '@/lib/utils'

type DragFileProps = {
  getInputProps: FileUploadActions['getInputProps']
  isDragging: boolean
  maxFiles: number
  maxSize: number
  onDragEnter: FileUploadActions['handleDragEnter']
  onDragLeave: FileUploadActions['handleDragLeave']
  onDragOver: FileUploadActions['handleDragOver']
  onDrop: FileUploadActions['handleDrop']
  onOpenFileDialog: () => void
}

export const DragFile = ({
  getInputProps,
  isDragging,
  maxFiles,
  maxSize,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  onOpenFileDialog,
}: DragFileProps) => {
  return (
    <div
      className={cn(
        'relative rounded-lg border border-dashed p-6 text-center transition-colors',
        isDragging
          ? 'border-primary bg-primary/5'
          : 'border-muted-foreground/25 hover:border-muted-foreground/50'
      )}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <input {...getInputProps()} className="sr-only" />
      <div className="flex flex-col items-center gap-4">
        <div
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-full bg-muted transition-colors',
            isDragging
              ? 'border-primary bg-primary/10'
              : 'border-muted-foreground/25'
          )}
        >
          <Upload className="size-5 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium">
            Drop files here or{' '}
            <button
              className="cursor-pointer text-primary underline-offset-4 hover:underline"
              onClick={onOpenFileDialog}
              type="button"
            >
              browse files
            </button>
          </p>
          <p className="text-xs text-muted-foreground">
            Maximum file size: {formatBytes(maxSize)} • Maximum files:{' '}
            {maxFiles}
          </p>
        </div>
      </div>
    </div>
  )
}
