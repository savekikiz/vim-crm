'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const BackHeader = () => {
  const router = useRouter()

  return (
    <button
      className="flex w-fit items-center gap-2 transition-opacity hover:opacity-80"
      onClick={() => router.back()}
    >
      <ArrowLeft className="size-5 text-primary" />
      <span className="text-lg font-semibold">ย้อนกลับ</span>
    </button>
  )
}
