import router from '@adonisjs/core/services/router'

const PublicationController = () => import('#controllers/publication_controller')

router
  .group(() => {
    router.get('/', [PublicationController, 'listPosts'])

    router.get('/posts/:id', [PublicationController, 'showPost'])

    router.post('/subscribe', [PublicationController, 'subscribe'])
  })
  .domain(':slug.panache.so')
