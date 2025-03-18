/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import env from './env.js'
import './routes/auth.js'
import './routes/editor.js'
import './routes/publication.js'

const platformRoutes = router.group(() => {
  router.on('/').renderInertia('landing')

  router.on('/onboarding').renderInertia('onboarding').as('onboarding').use(middleware.auth())
})

if (env.get('NODE_ENV') === 'production') {
  platformRoutes.domain('panache.so').domain('www.panache.so')
}
