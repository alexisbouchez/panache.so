import { Link } from '@inertiajs/react'
import * as React from 'react'
import usePath from '../hooks/use_path'
import { cn } from '~/lib/utils'

interface TabProps {
  className?: string
  label: string
  href: string
}

const Tab: React.FunctionComponent<TabProps> = ({ className, href, label }) => {
  const path = usePath()
  return (
    <Link className={cn('relative w-f', className)} href={href}>
      <div className="mx-1 my-2 rounded-md px-3 py-2 transition-all duration-75 hover:bg-zinc-100 active:bg-zinc-200">
        <p className="text-sm text-zinc-600 font-medium hover:text-black">{label}</p>
      </div>
      {path === href && (
        <div className="absolute bottom-0 w-full px-1.5">
          <div className="h-[2.5px] bg-black"></div>
        </div>
      )}
    </Link>
  )
}

export default Tab
