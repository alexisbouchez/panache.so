import { Link } from '@inertiajs/react'
import { IconArrowRight, IconExternalLink } from '@tabler/icons-react'
import { ProductNavMenu } from './product_nav_menu'

export default function Header() {
  return (
    <header className="bg-white border-b border-neutral-100 relative">
      <div className="relative mx-auto max-w-4xl py-6 px-8 sm:px-0 text-justify">
        <div className="flex flex-wrap gap-4 items-center justify-between text-neutral-500">
          <div className="w-full sm:w-fit h-fit">
            <Link className="text-2xl font-serif italic text-black" href="/">
              Panache
            </Link>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <ProductNavMenu />

            <a
              className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 group cursor-pointer"
              href="https://panache.cafe"
              target="_blank"
            >
              <span>Blog</span>
              <IconExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>

          <Link className="btn btn-primary" href="/auth">
            <span>Get started</span>
            <IconArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  )
}
