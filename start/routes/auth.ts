import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const AuthController = () => import('#controllers/auth_controller')
router.get('/auth', [AuthController, 'show']).use(middleware.guest())
router.post('/auth', [AuthController, 'handle'])
router.get('/auth/:email', [AuthController, 'callback']).as('auth.callback')
router.post('/auth/sign_out', [AuthController, 'handleSignOut']).as('auth.sign_out')
