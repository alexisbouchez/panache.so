import env from '#start/env'
import type { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'
import vine from '@vinejs/vine'
import { Resend } from 'resend'
import Stripe from 'stripe'
import db from '@adonisjs/lucid/services/db'

export default class PublicationsController {
  async index({ auth, response }: HttpContext) {
    const publication = await auth.user!.related('publications').query().first()

    if (publication) {
      return response.redirect().toRoute('editor.publications.show', {
        domain: publication.customDomain || publication.slug,
      })
    }

    return response.redirect().toRoute('onboarding')
  }

  create({ inertia }: HttpContext) {
    return inertia.render('editor/publications/create')
  }

  async show({ auth, params, response, inertia }: HttpContext) {
    const publication = await auth
      .user!.related('publications')
      .query()
      .where('customDomain', params.domain)
      .orWhere('slug', params.domain)
      .first()

    if (!publication) {
      return response.notFound('Publication not found')
    }

    /**
     * Compute the number of posts.
     */
    const { count: postsCount } = await db
      .from('posts')
      .where('publication_id', publication.id)
      .count('* as count')
      .first()

    /**
     * Compute the number of contact in the audience
     */
    const { count: contactsCount } = await db
      .from('contacts')
      .where('publication_id', publication.id)
      .count('* as count')
      .first()

    return inertia.render('editor/show', {
      publication,
      numberOfPosts: Number.parseInt(postsCount),
      numberOfContacts: Number.parseInt(contactsCount),
    })
  }

  async store({ request, response, inertia, auth }: HttpContext) {
    // Define validation schema
    const validator = vine.compile(
      vine.object({
        title: vine.string().trim().minLength(2).maxLength(100),
        slug: vine
          .string()
          .trim()
          .minLength(2)
          .maxLength(50)
          .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
          .notIn([
            'www',
            'api',
            'app',
            'assets',
            'fonts',
            'images',
            'static',
            'storage',
            'tmp',
            'uploads',
            'favicon',
            'robots',
            'sitemap',
            'rss',
            'atom',
            'json',
            'css',
            'js',
            'png',
            'jpg',
            'jpeg',
            'gif',
            'svg',
          ]),
        domainType: vine.enum(['panache', 'custom']),
        customDomain: vine.string().optional(),
      })
    )

    // Validate request body
    const payload = await request.validateUsing(validator)

    // Create publication
    const publication = await auth.user!.related('publications').create({
      title: payload.title,
      slug: payload.slug,
      domainType: payload.domainType,
      customDomain: payload.customDomain,
    })

    /**
     * Assign Resend audience
     */
    try {
      const resend = new Resend(env.get('RESEND_API_KEY'))
      const res = await resend.audiences.create({
        name: publication.title,
      })
      publication.resendAudienceId = res.data?.id ?? null
      await publication.save()

      // Sync contacts if audience was created
      if (publication.resendAudienceId) {
        const { data } = await resend.contacts.list({
          audienceId: publication.resendAudienceId,
        })

        if (data?.data) {
          for (const resendContact of data.data) {
            await publication.related('contacts').create({
              email: resendContact.email,
              resendId: resendContact.id,
              unsubscribed: resendContact.unsubscribed,
            })
          }
        }
      }
    } catch (error) {
      logger.error({
        message: 'Failed to create Resend audience',
        error,
        publicationId: publication.id,
      })
    }

    if (payload.domainType === 'custom') {
      /**
       * Create Stripe session, and redirect to domain settings
       */
      const stripe = new Stripe(env.get('STRIPE_SECRET_KEY'))
      const session = await stripe.checkout.sessions.create({
        customer: auth.user!.stripeCustomerId!,
        line_items: [{ price: env.get('STRIPE_CUSTOM_DOMAIN_PRICE_ID'), quantity: 1 }],
        mode: 'payment',
        metadata: {
          publicationId: publication.id,
        },
        success_url: `${env.get('APP_URL')}/publications/${publication.slug}/settings/domain`,
      })

      return inertia.location(session.url!)
    }

    /**
     * Redirect to publication directly, if domain type is not custom.
     */
    return response.redirect().toRoute('editor.publications.index', {
      domain: publication.slug,
    })
  }

  async update({ params, request, response, auth }: HttpContext) {
    // Define validation schema for update
    const validator = vine.compile(
      vine.object({
        title: vine.string().trim().minLength(2).maxLength(100),
      })
    )

    try {
      // Validate request body
      const data = await validator.validate(request.all())

      // Find the publication using domain or slug
      const publication = await auth
        .user!.related('publications')
        .query()
        .where('customDomain', params.domain)
        .orWhere('slug', params.domain)
        .firstOrFail()

      // Update the publication
      await publication.merge(data).save()

      return response.redirect().back()
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.notFound('Publication not found')
      }

      return response.status(500).json({
        error: 'Failed to update publication',
      })
    }
  }

  async destroy({ params, auth, response }: HttpContext) {
    // Find the publication and ensure it belongs to the authenticated user
    const publication = await auth
      .user!.related('publications')
      .query()
      .where('id', params.id)
      .firstOrFail()

    try {
      // Delete the publication
      await publication.delete()

      // Redirect to onboarding if this was their only publication
      const hasOtherPublications = await auth.user!.related('publications').query().first()

      if (hasOtherPublications) {
        return response.redirect().toRoute('editor.publications.index')
      } else {
        return response.redirect().toRoute('onboarding')
      }
    } catch (error) {
      return response.status(500).json({
        error: 'Failed to delete publication',
      })
    }
  }
}
