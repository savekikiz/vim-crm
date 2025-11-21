import { IconEdit } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export const FormFile = () => {
  const [isEdit, setIsEdit] = useState(false)
  const router = useRouter()
  const form = useFormContext()

  const isDisabled = !isEdit

  const triggerEditForm = () => setIsEdit((prev) => !prev)

  const handleBack = () => router.back()

  useEffect(() => {
    form.setValue('docNo', 'company-A_0001')
    form.setValue('taxId', '010550037423')
    form.setValue('documentDate', '21/11/2568')
    form.setValue('branch', 'สำนักงานใหญ่')
    form.setValue('pricePerUnit', '175.00')
    form.setValue('taxAmount', '25.3')
    form.setValue('amount', '1,700.00')
  }, [form])

  return (
    <Card className="flex size-full flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">รายละเอียด</h3>
        <Button onClick={triggerEditForm} variant="link">
          <IconEdit />
          แก้ไขข้อมูล
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="docNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>หมายเลขเอกสาร</FormLabel>
              <FormControl>
                <Input
                  disabled={isDisabled}
                  placeholder="document number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="taxId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>หมายเลขกำกับภาษี</FormLabel>
              <FormControl>
                <Input disabled={isDisabled} placeholder="tax id" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="documentDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>วันที่สร้างเอกสาร</FormLabel>
              <FormControl>
                <Input
                  disabled={isDisabled}
                  placeholder="created document date"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="branch"
          render={({ field }) => (
            <FormItem>
              <FormLabel>สาขา</FormLabel>
              <FormControl>
                <Input
                  disabled={isDisabled}
                  placeholder="branch name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div />
        <div />

        <FormField
          control={form.control}
          name="pricePerUnit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ราคาต่อหน่วย</FormLabel>
              <FormControl>
                <Input
                  disabled={isDisabled}
                  placeholder="price per unit"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="taxAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ภาษีมูลค่าเพิ่ม</FormLabel>
              <FormControl>
                <Input
                  disabled={isDisabled}
                  placeholder="tax amount"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>รวม</FormLabel>
              <FormControl>
                <Input disabled={isDisabled} placeholder="total" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="mt-auto flex justify-end gap-4">
        <Button onClick={handleBack} type="button" variant="secondary">
          ยกเลิก
        </Button>
        <Button onClick={handleBack} type="button">
          บันทึก
        </Button>
      </div>
    </Card>
  )
}
