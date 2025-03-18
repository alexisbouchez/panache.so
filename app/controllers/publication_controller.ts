import Contact from '#models/contact'
import Post from '#models/post'
import Publication from '#models/publication'
import env from '#start/env'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import { Resend } from 'resend'

@inject()
export default class PublicationController {
  async listPosts({ subdomains, request, response, inertia }: HttpContext) {
    const publication = await Publication.findByOrFail('slug', subdomains.slug)
    if (publication === null) {
      return response.notFound('Publication not found.')
    }

    await publication.load('posts', (query) => {
      query.orderBy('published_at', 'desc')
      query.where('published', true)

      query.preload('author')
    })

    if (request.wantsJSON()) {
      return response.json(publication.posts.map((post) => post.serialize()))
    }

    return inertia.render('posts/index', { publication, posts: publication.posts })
  }

  async showPost({ subdomains, params, response, inertia }: HttpContext) {
    const publication = await Publication.findByOrFail('slug', subdomains.slug)
    if (publication === null) {
      return response.notFound('Publication not found.')
    }

    const post = await Post.findByOrFail('id', params.id)
    if (post === null) {
      return response.notFound('Post not found.')
    }

    return inertia.render('posts/show', { publication, post })
  }

  async subscribe({ subdomains, request, response }: HttpContext) {
    const publication = await Publication.findByOrFail('slug', subdomains.slug)
    if (publication === null) {
      return response.notFound('Publication not found.')
    }

    const validator = vine.compile(
      vine.object({
        email: vine.string().email().normalizeEmail(),
      })
    )

    const { email } = await request.validateUsing(validator)

    if (publication.resendAudienceId === null) {
      return response.redirect().back()
    }

    const contact = await Contact.query()
      .where('publication_id', publication.id)
      .where('email', email)
      .first()
    if (contact !== null) {
      return response.redirect().back()
    }

    const resend = new Resend(env.get('RESEND_API_KEY'))
    const resendContactResponse = await resend.contacts.create({
      audienceId: publication.resendAudienceId,
      email,
    })

    await Contact.create({
      email,
      resendId: resendContactResponse.data?.id,
      publicationId: publication.id,
    })

    return response.redirect().back()
  }
}
