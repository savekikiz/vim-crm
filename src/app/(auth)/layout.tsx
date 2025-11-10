import Image from 'next/image'
import React from 'react'

import { CircuitBoard } from '@/components/svg'

type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({ children }: Readonly<LayoutProps>) {
  return (
    <div className="relative min-h-screen bg-background">
      <figure className="absolute inset-0">
        <Image
          alt="background"
          className="size-full object-cover object-center"
          height={150}
          src="/background-horizontal.svg"
          width={1000}
        />
      </figure>
      <div className="absolute inset-0 opacity-5">
        <CircuitBoard className="size-full" fill="#fe5000" />
      </div>
      <div className="relative z-[1] grid min-h-screen place-items-center">
        {children}
      </div>
    </div>
  )
}
