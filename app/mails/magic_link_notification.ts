import env from '#start/env'
import router from '@adonisjs/core/services/router'
import { BaseMail } from '@adonisjs/mail'

export default class MagicLinkNotification extends BaseMail {
  from = 'Panache <no-reply@system.panache.social>'
  subject = 'Panache - Authenticate with magic link'

  constructor(private to: string) {
    super()
  }

  /**
   * The "prepare" method is called automatically when
   * the email is sent or queued.
   */
  prepare() {
    this.message.to(this.to)
    this.message.htmlView('emails/magic_link', {
      link: router
        .builder()
        .prefixUrl(env.get('APP_URL'))
        .params({ email: this.to })
        .makeSigned('auth.callback', {
          expiresIn: '1 hour',
          purpose: 'auth.callback',
        }),
    })
  }
}
