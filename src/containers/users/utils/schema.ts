import { z } from 'zod'

export const userSchema = z.object({
  email: z.string().email('invalid_email'),
  empId: z.string().min(1, 'empId_required'),
  name: z.string().min(2, 'name_too_short'),
  surname: z.string().min(1, 'surname_required'),
})

export const FORM_DEFAULT_VALUES = {
  email: '',
  empId: '',
  name: '',
  surname: '',
}
