import { FileSpreadsheet, Upload, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

type DialogUploadFileProps = {
  onOpenChange: (open: boolean) => void
  open: boolean
}

export const DialogUploadFile = ({
  onOpenChange,
  open,
}: DialogUploadFileProps) => {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="flex w-full max-w-lg items-center justify-center p-10 sm:mx-auto sm:max-w-lg">
        <form>
          <h3 className="text-lg font-semibold text-foreground">File Upload</h3>
          <div className="mt-4 flex justify-center space-x-4 rounded-md border border-dashed border-input px-6 py-10">
            <div className="sm:flex sm:items-center sm:gap-x-3">
              <Upload
                aria-hidden
                className="mx-auto size-8 text-muted-foreground sm:mx-0 sm:size-6"
              />
              <div className="mt-4 flex items-center text-sm leading-6 text-foreground sm:mt-0">
                <p>Drag and drop or</p>
                <Label
                  className="relative cursor-pointer rounded-sm pl-1 font-medium text-primary hover:underline hover:underline-offset-4"
                  htmlFor="file-upload-4"
                >
                  <span>choose file</span>
                  <input
                    className="sr-only"
                    id="file-upload-4"
                    name="file-upload-4"
                    type="file"
                  />
                </Label>
                <p className="pl-1">to upload</p>
              </div>
            </div>
          </div>
          <p className="mt-2 flex items-center justify-between text-xs leading-5 text-muted-foreground">
            Recommended max. size: 10 MB, Accepted file types: XLSX, XLS, CSV.
          </p>
          <div className="relative mt-8 rounded-lg bg-muted p-3">
            <div className="absolute right-1 top-1">
              <Button
                aria-label="Remove"
                className="rounded-sm p-2 text-muted-foreground hover:text-foreground"
                size="sm"
                type="button"
                variant="ghost"
              >
                <X aria-hidden={true} className="size-4 shrink-0" />
              </Button>
            </div>
            <div className="flex items-center space-x-2.5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-background shadow-sm ring-1 ring-inset ring-input">
                <FileSpreadsheet
                  aria-hidden={true}
                  className="size-5 text-foreground"
                />
              </span>
              <div className="w-full">
                <p className="text-xs font-medium text-foreground">
                  Revenue_Q1_2024.xlsx
                </p>
                <p className="mt-0.5 flex justify-between text-xs text-muted-foreground">
                  <span>3.1 MB</span>
                  <span>Completed</span>
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 flex items-center justify-end space-x-3">
            <Button
              className="whitespace-nowrap rounded-sm border border-input px-4 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-accent hover:text-foreground"
              onClick={() => onOpenChange(false)}
              type="button"
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              className="whitespace-nowrap rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
              onClick={() => onOpenChange(false)}
              type="button"
              variant="default"
            >
              Upload
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
