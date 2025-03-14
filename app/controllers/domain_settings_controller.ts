import type { HttpContext } from '@adonisjs/core/http'
import FlyCertificatesApi from '../fly_certificates_api.js'
import FlyApiCaller from '../fly_api_caller.js'
import env from '#start/env'

export default class DomainSettingsController {
  async show({ inertia, auth, params }: HttpContext) {
    const publication = await auth
      .user!.related('publications')
      .query()
      .where('customDomain', params.domain)
      .orWhere('slug', params.domain)
      .firstOrFail()

    return inertia.render('editor/settings/domain', {
      publication,
    })
  }

  async check({ auth, params, response }: HttpContext) {
    const publication = await auth
      .user!.related('publications')
      .query()
      .where('id', params.id)
      .first()

    if (!publication) {
      return response.notFound('Publication not found')
    }

    const api = new FlyCertificatesApi(new FlyApiCaller(env.get('FLY_TOKEN')))
    try {
      const res = await api.checkCertificate(publication.customDomain!)
      publication.customDomainVerified = res === 'configured'
      await publication.save()
    } catch (error) {
      console.log(error)
    }

    return response.redirect().back()
  }
}
