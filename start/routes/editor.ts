import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const PublicationsController = () => import('#controllers/editor/publications_controller')
router
  .get('/publications', [PublicationsController, 'index'])
  .as('editor.publications.index')
  .use(middleware.auth())
router
  .get('/publications/:domain', [PublicationsController, 'show'])
  .use(middleware.auth())
  .as('editor.publications.show')
router
  .post('/publications', [PublicationsController, 'store'])
  .use(middleware.auth())
  .as('editor.publications.store')

router
  .patch('/publications/:domain', [PublicationsController, 'update'])
  .use(middleware.auth())
  .as('editor.publications.update')

router
  .delete('/publications/:id', [PublicationsController, 'destroy'])
  .use(middleware.auth())
  .as('editor.publications.destroy')

const GeneralSettingsController = () => import('#controllers/general_settings_controller')
const DomainSettingsController = () => import('#controllers/domain_settings_controller')

router
  .get('/publications/:domain/settings', [GeneralSettingsController, 'show'])
  .use(middleware.auth())
  .as('editor.settings.general')

router
  .get('/publications/:domain/settings/domain', [DomainSettingsController, 'show'])
  .use(middleware.auth())
  .as('editor.settings.domain')

router
  .post('/publications/:id/settings/domain/check', [DomainSettingsController, 'check'])
  .use(middleware.auth())
  .as('editor.settings.domain.check')

const StripeWebhooksController = () => import('#controllers/stripe_webhooks_controller')
router.post('/webhooks/stripe', [StripeWebhooksController, 'handle']).as('stripe.webhooks')

const SubscribersController = () => import('#controllers/subscribers_controller')
router
  .get('/publications/:domain/audience', [SubscribersController, 'index'])
  .use(middleware.auth())
  .as('editor.subscribers.index')

router
  .post('/publications/:domain/contacts/sync', [SubscribersController, 'sync'])
  .use(middleware.auth())
  .as('editor.subscribers.sync')

router
  .delete('/publications/:domain/contacts/:id', [SubscribersController, 'destroy'])
  .use(middleware.auth())
  .as('editor.subscribers.destroy')

const PostsController = () => import('#controllers/editor/posts_controller')

router
  .get('/publications/:domain/posts', [PostsController, 'index'])
  .use(middleware.auth())
  .as('editor.posts.index')

router
  .post('/publications/:domain/posts', [PostsController, 'store'])
  .use(middleware.auth())
  .as('editor.posts.store')

router
  .get('/publications/:domain/posts/:postId/edit', [PostsController, 'edit'])
  .use(middleware.auth())
  .as('editor.posts.edit')

router
  .patch('/publications/:domain/posts/:postId', [PostsController, 'update'])
  .use(middleware.auth())
  .as('editor.posts.update')

router
  .delete('/publications/:domain/posts/:postId', [PostsController, 'destroy'])
  .use(middleware.auth())
  .as('editor.posts.destroy')

router
  .post('/publications/:domain/posts/:postId/publish', [PostsController, 'publish'])
  .use(middleware.auth())
  .as('editor.posts.publish')

router
  .post('/publications/:domain/posts/:postId/unpublish', [PostsController, 'unpublish'])
  .use(middleware.auth())
  .as('editor.posts.unpublish')
