import { cn } from '~/lib/utils'

export default function Logo({ className }: { className?: string }) {
  return <div className={cn('logo', className)}>P</div>
}
