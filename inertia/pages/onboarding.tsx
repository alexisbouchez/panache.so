import React from 'react'
import Logo from '~/components/logo'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardFooter } from '~/components/ui/card'
import { Error } from '~/components/ui/error'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { useForm } from '@inertiajs/react'
import { cn } from '~/lib/utils'
import { IconArrowRight } from '@tabler/icons-react'

export default function Onboarding() {
  const form = useForm({
    title: '',
    slug: '',
    domainType: 'panache',
    customDomain: '',
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.post('/publications')
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-[#f0eee6] p-6 md:p-10">
      <div className="flex w-full max-w-md flex-col gap-6">
        <div className="flex justify-center w-full">
          <Logo className="size-12 text-3xl" />
        </div>
        <div className="flex flex-col">
          <h1 className="font-medium text-2xl text-center">Create your first publication</h1>
          <h2 className="text-center text-neutral-600">
            Start sharing your ideas with the world, by setting up your first publication.
          </h2>
        </div>

        <Card>
          <CardContent>
            <form onSubmit={handleSubmit} id="publication-form">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="title">Publication Title</Label>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="The Sand Hill Road Journal"
                    required
                    value={form.data.title}
                    onChange={(e) => form.setData('title', e.target.value)}
                  />
                  <Error errorKey="title" />
                </div>
                <div className="grid gap-2">
                  <div>
                    <Label className="mb-3 block">Publication URL</Label>
                    <div className="grid gap-4">
                      <button
                        type="button"
                        onClick={() => form.setData('domainType', 'panache')}
                        className={cn(
                          'relative flex flex-col gap-1 rounded-lg border p-4 text-left transition-colors hover:bg-neutral-50 focus:outline-none focus:border-neutral-500 focus:ring-4 focus:ring-neutral-200 cursor-pointer',
                          form.data.domainType === 'panache'
                            ? 'border-neutral-600 bg-neutral-50'
                            : 'border-neutral-200'
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border',
                              form.data.domainType === 'panache'
                                ? 'border-neutral-600'
                                : 'border-neutral-300'
                            )}
                          >
                            {form.data.domainType === 'panache' && (
                              <div className="h-2 w-2 rounded-full bg-neutral-600" />
                            )}
                          </div>
                          <span className="font-medium text-sm">Use .panache.so domain</span>
                          <span className="ml-auto rounded-full border border-emerald-300 bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                            Free
                          </span>
                        </div>
                        <span className="text-xs text-neutral-600">
                          Get started quickly with a free .panache.so subdomain
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => form.setData('domainType', 'custom')}
                        className={cn(
                          'relative flex flex-col gap-1 rounded-lg border p-4 text-left transition-colors hover:bg-neutral-50 focus:outline-none focus:border-neutral-500 focus:ring-4 focus:ring-neutral-200 cursor-pointer',
                          form.data.domainType === 'custom'
                            ? 'border-neutral-600 bg-neutral-50'
                            : 'border-neutral-200'
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border',
                              form.data.domainType === 'custom'
                                ? 'border-neutral-600'
                                : 'border-neutral-300'
                            )}
                          >
                            {form.data.domainType === 'custom' && (
                              <div className="h-2 w-2 rounded-full bg-neutral-600" />
                            )}
                          </div>
                          <span className="font-medium text-sm">Use custom domain</span>
                          <span className="ml-auto rounded-full border border-blue-300 bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                            $50 (one-time)
                          </span>
                        </div>
                        <span className="text-xs text-neutral-600">
                          Use your own domain name for a more professional look
                        </span>
                      </button>
                      <div className="flex">
                        <span className="flex font-medium items-center border-r-0 px-3 h-10 text-neutral-600 rounded-sm rounded-r-none border border-neutral-300 bg-background text-sm">
                          https://
                        </span>
                        <Input
                          id="slug"
                          name="slug"
                          type="text"
                          className={cn(
                            'rounded-l-none',
                            form.data.domainType === 'panache' && 'rounded-r-none'
                          )}
                          placeholder={
                            form.data.domainType === 'panache'
                              ? 'sandhillroadjournal'
                              : 'sandhillroadjournal.com'
                          }
                          required
                          value={
                            form.data.domainType === 'panache'
                              ? form.data.slug
                              : form.data.customDomain
                          }
                          onChange={(e) => {
                            if (form.data.domainType === 'panache') {
                              form.setData(
                                'slug',
                                e.target.value.replaceAll(' ', '-').toLowerCase()
                              )
                            } else {
                              form.setData('customDomain', e.target.value)
                            }
                          }}
                        />
                        {form.data.domainType === 'panache' && (
                          <span className="flex font-medium items-center px-3 h-10 text-neutral-600 rounded-sm rounded-l-none border-l-0 border border-neutral-300 bg-background text-sm">
                            .panache.so
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <hr />
          <CardFooter className="pt-0">
            <Button
              type="submit"
              className="!w-full mt-4"
              form="publication-form"
              loading={form.processing}
            >
              <span>Continue</span>
              <IconArrowRight className="size-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
