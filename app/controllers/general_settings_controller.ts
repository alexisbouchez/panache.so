import type { HttpContext } from '@adonisjs/core/http'

export default class GeneralSettingsController {
  async show({ inertia, auth, params }: HttpContext) {
    const publication = await auth
      .user!.related('publications')
      .query()
      .where('customDomain', params.domain)
      .orWhere('slug', params.domain)
      .firstOrFail()

    return inertia.render('editor/settings/general', {
      publication,
    })
  }

  async check({}: HttpContext) {}
}
