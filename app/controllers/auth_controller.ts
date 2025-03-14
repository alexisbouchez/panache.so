import mail from '@adonisjs/mail/services/main'
import MagicLinkNotification from '#mails/magic_link_notification'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import User from '#models/user'

export default class AuthController {
  async show({ inertia }: HttpContext) {
    return inertia.render('auth')
  }

  async handle({ request, session, response }: HttpContext) {
    const validator = vine.compile(
      vine.object({
        email: vine.string().email().normalizeEmail().trim(),
      })
    )

    const { email } = await request.validateUsing(validator)

    await mail.sendLater(new MagicLinkNotification(email))

    session.flash('success', 'Magic link sent')

    return response.redirect().back()
  }

  async callback({ auth, request, params, response, session }: HttpContext) {
    if (!request.hasValidSignature('auth.callback')) {
      return response.badRequest('Invalid or expired URL')
    }
    const email = params.email
    const user = await User.firstOrCreate({ email }, { email })
    await auth.use('web').login(user)
    session.flash('success', 'Logged in successfully')
    return response.redirect().toRoute('editor.publications.index')
  }

  async handleSignOut({ auth, response }: HttpContext) {
    await auth.use('web').logout()

    return response.redirect().toPath('/auth')
  }
}
