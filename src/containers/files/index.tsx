/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { TriangleAlert } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { type FileWithPreview, useFileUpload } from '@/hooks/use-file-upload'
import { cn } from '@/lib/utils'
import { defaultFiles } from '@/mock-data/file'

import { DialogUploadFile, FileTableList } from './components'
type FileUploadItem = {
  error?: string
  progress: number
  status: 'completed' | 'error' | 'uploading'
} & FileWithPreview

type TableUploadProps = {
  accept?: string
  className?: string
  maxFiles?: number
  maxSize?: number
  multiple?: boolean
  onFilesChange?: (files: FileWithPreview[]) => void
  simulateUpload?: boolean
}

export const FilesContainer = ({
  accept = '*',
  className,
  maxFiles = 10,
  maxSize = 10 * 1024 * 1024, // 10MB
  multiple = true,
  onFilesChange,
  simulateUpload = true,
}: TableUploadProps) => {
  const router = useRouter()
  const defaultUploadFiles: FileUploadItem[] = defaultFiles.map((file) => ({
    file: {
      name: file.name,
      size: file.size,
      type: file.type,
    } as File,
    id: file.id,
    preview: file.url,
    progress: 100,
    status: 'completed' as const,
  }))

  const [isOpen, setIsOpen] = useState(false)

  // TODO: Need moving the logic to dialog-upload-file.tsx
  const [uploadFiles, setUploadFiles] =
    useState<FileUploadItem[]>(defaultUploadFiles)
  const [
    { errors, isDragging },
    {
      clearFiles,
      getInputProps,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
    },
  ] = useFileUpload({
    accept,
    initialFiles: defaultFiles,
    maxFiles,
    maxSize,
    multiple,
    onFilesChange: (newFiles) => {
      // Convert to upload items when files change, preserving existing status
      const newUploadFiles = newFiles.map((file) => {
        const existingFile = uploadFiles.find(
          (existing) => existing.id === file.id
        )

        if (existingFile) {
          return {
            ...existingFile,
            ...file,
          }
        }

        return {
          ...file,
          progress: 0,
          status: 'uploading' as const,
        }
      })
      setUploadFiles(newUploadFiles)
      onFilesChange?.(newFiles)
    },
  })

  const goToDetail = (id: string) => {
    router.push(`/files/${id}`)
  }

  const handleOpenDialogFile = () => {
    setIsOpen(true)
  }

  const removeUploadFile = (fileId: string) => {
    setUploadFiles((prev) => prev.filter((file) => file.id !== fileId))
    removeFile(fileId)
  }

  const retryUpload = (fileId: string) => {
    setUploadFiles((prev) =>
      prev.map((file) =>
        file.id === fileId
          ? {
              ...file,
              error: undefined,
              progress: 0,
              status: 'uploading' as const,
            }
          : file
      )
    )
  }

  // Simulate upload progress
  useEffect(() => {
    if (!simulateUpload) return

    const interval = setInterval(() => {
      setUploadFiles((prev) =>
        prev.map((file) => {
          if (file.status !== 'uploading') return file

          const increment = Math.random() * 15 + 5 // 5-20% increment
          const newProgress = Math.min(file.progress + increment, 100)

          if (newProgress < 100) return { ...file, progress: newProgress }

          const shouldFail = Math.random() < 0.1 // 10% chance to fail
          return {
            ...file,
            error: shouldFail ? 'Upload failed. Please try again.' : undefined,
            progress: 100,
            status: shouldFail ? ('error' as const) : ('completed' as const),
          }
        })
      )
    }, 500)

    return () => clearInterval(interval)
  }, [simulateUpload])

  return (
    <div className={cn('w-full space-y-4', className)}>
      <FileTableList
        onGoToDetail={goToDetail}
        onOpenDialogFile={handleOpenDialogFile}
        onRemoveFile={removeUploadFile}
        uploadedFiles={uploadFiles}
      />

      {/* Error Messages */}
      {errors.length > 0 && (
        <Alert className="mt-5" variant="destructive">
          <TriangleAlert />
          <AlertTitle>File upload error(s)</AlertTitle>
          <AlertDescription>
            {errors.map((error, index) => (
              <p className="last:mb-0" key={index}>
                {error}
              </p>
            ))}
          </AlertDescription>
        </Alert>
      )}

      <DialogUploadFile onOpenChange={setIsOpen} open={isOpen} />
    </div>
  )
}
