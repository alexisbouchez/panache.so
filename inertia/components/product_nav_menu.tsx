'use client'

import * as React from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu'
import { cn } from '#inertia/lib/utils'
import { IconFeedback, IconRoadmap, IconChangelog, IconHelpCenter } from './icons'

// Add resources data
const resources: { title: string; href: string; description: string; icon: React.ReactNode }[] = [
  {
    title: 'Feedback',
    href: 'https://panache.featurebase.app/en',
    description: 'Share your thoughts and suggestions to help improve the platform.',
    icon: <IconFeedback className="w-4 h-4 text-neutral-600" />,
  },
  {
    title: 'Help Center',
    href: 'https://panache.featurebase.app/en/help',
    description: 'Find answers to your questions and learn how to use the platform.',
    icon: <IconHelpCenter className="w-4 h-4 text-neutral-600" />,
  },
  {
    title: 'Changelog',
    href: 'https://panache.featurebase.app/en/changelog',
    description: 'Keep up with the latest updates and improvements.',
    icon: <IconChangelog className="w-4 h-4 text-neutral-600" />,
  },

  {
    title: 'Roadmap',
    href: 'https://panache.featurebase.app/en/roadmap',
    description: 'See what features are planned and coming soon.',
    icon: <IconRoadmap className="w-4 h-4 text-neutral-600" />,
  },
]

export function ProductNavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="cursor-pointer">Product</NavigationMenuTrigger>
          <NavigationMenuContent className="md:left-1/2 md:transform md:-translate-x-1/2">
            <ul className="grid w-[200px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
              {resources.map((resource) => (
                <ListItem
                  key={resource.title}
                  title={resource.title}
                  href={resource.href}
                  icon={resource.icon}
                  className="flex items-start"
                >
                  {resource.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & { icon?: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'flex flex-col select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            {icon ? <span className="rounded-lg bg-accent p-1 border">{icon}</span> : null}
            <span className="text-sm font-medium leading-none">{title}</span>
          </div>
          <p className="line-clamp-3 text-sm text-left leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
