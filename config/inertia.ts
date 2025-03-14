import { HttpContext } from '@adonisjs/core/http'
import { defineConfig } from '@adonisjs/inertia'
import type { InferSharedProps } from '@adonisjs/inertia/types'

const inertiaConfig = defineConfig({
  /**
   * Path to the Edge view that will be used as the root view for Inertia responses
   */
  rootView: 'inertia_layout',

  /**
   * Data that should be shared with all rendered pages
   */
  sharedData: {
    user: (ctx) => ctx.inertia.always(() => ctx.auth.user),
    flashMessages: (ctx) => ctx.session.flashMessages,
    errors: (ctx) => ctx.inertia.always(() => ctx.session?.flashMessages.get('errors')),
    path: (ctx) => ctx.request.url(),
    query: (ctx) => ctx.request.qs(),
    params: (ctx) => ctx.params,
    route: (ctx) => ctx.route?.name,
    publications: async ({ auth }: HttpContext) => {
      if (auth.isAuthenticated) {
        const publications = await auth.user?.related('publications').query()
        return publications
      }
      return []
    },
    currentPublication: async ({ auth, params }: HttpContext) => {
      if (auth.isAuthenticated && params.domain) {
        const publication = await auth.user
          ?.related('publications')
          .query()
          .orderBy('createdAt', 'desc')
          .where('slug', params.domain)
          .orWhere('custom_domain', params.domain)
          .first()
        return publication
      }

      return null
    },
  },

  /**
   * Options for the server-side rendering
   */
  ssr: {
    enabled: true,
    entrypoint: 'inertia/app/ssr.tsx',
  },
})

export default inertiaConfig

declare module '@adonisjs/inertia/types' {
  export interface SharedProps extends InferSharedProps<typeof inertiaConfig> {}
}
