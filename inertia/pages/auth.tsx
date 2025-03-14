import React from 'react'
import Logo from '~/components/logo'
import { useFlashMessages } from '~/hooks/use_flash_messages'
import { Alert, AlertTitle, AlertDescription } from '~/components/ui/alert'
import { Button } from '~/components/ui/button'
import { Card, CardContent } from '~/components/ui/card'
import { Error } from '~/components/ui/error'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { CheckCircle2, ExternalLink } from 'lucide-react'
import { Link, useForm } from '@inertiajs/react'

export default function Auth() {
  const form = useForm({
    email: '',
  })
  const { success } = useFlashMessages()

  const getEmailProvider = (email: string) => {
    const domain = email.split('@')[1]?.toLowerCase()
    if (!domain) return null

    // Common email providers
    if (domain === 'gmail.com') return { name: 'Gmail', url: 'https://gmail.com' }
    if (domain === 'outlook.com' || domain === 'hotmail.com')
      return { name: 'Outlook', url: 'https://outlook.live.com' }
    if (domain === 'yahoo.com') return { name: 'Yahoo Mail', url: 'https://mail.yahoo.com' }
    if (domain === 'icloud.com') return { name: 'iCloud Mail', url: 'https://www.icloud.com/mail' }
    if (domain === 'gmx.com' || domain === 'gmx.net')
      return { name: 'GMX Mail', url: 'https://www.gmx.com' }
    if (domain === 'aol.com') return { name: 'AOL Mail', url: 'https://mail.aol.com' }
    if (domain === 'protonmail.com' || domain === 'proton.me')
      return { name: 'Proton Mail', url: 'https://mail.proton.me' }
    if (domain === 'zoho.com') return { name: 'Zoho Mail', url: 'https://mail.zoho.com' }
    return null
  }

  const emailProvider = success ? getEmailProvider(form.data.email) : null

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.post('/auth')
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-[#f0eee6] p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex justify-center w-full">
          <Link className="hover:opacity-75 transition-opacity" href="/">
            <Logo className="size-12 text-3xl" />
          </Link>
        </div>

        <div className="flex flex-col">
          <h1 className="font-medium text-2xl text-center">Get started</h1>
          <h2 className="text-center text-neutral-500">
            Your portal to start creating newsletters.
          </h2>
        </div>

        {success ? (
          <Card>
            <CardContent className="space-y-6">
              <Alert variant="success">
                <CheckCircle2 className="size-4 stroke-emerald-700" />
                <AlertTitle>Check your inbox</AlertTitle>
                <AlertDescription>
                  We've sent a magic link to your email address. Click the link to sign in to your
                  account.
                </AlertDescription>
              </Alert>
              {emailProvider && (
                <Button className="w-full gap-1.5" asChild>
                  <a href={emailProvider.url} target="_blank" rel="noopener noreferrer">
                    Open {emailProvider.name}
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    autoComplete="panache-email"
                    id="email"
                    name="email"
                    type="text"
                    placeholder="your@email.com"
                    required
                    value={form.data.email}
                    onChange={(e) => form.setData('email', e.target.value)}
                  />
                  <Error errorKey="email" />
                </div>
                <Button type="submit" className="!w-full mt-4" loading={form.processing}>
                  Send Magic Link
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
        <p className="text-neutral-600 text-sm text-center max-w-xs mx-auto">
          By continuing, you agree to Panache's{' '}
          <a
            className="text-emerald-600 hover:text-emerald-700 transition-colors"
            href="https://panache.so/legal/terms_of_service"
          >
            Terms of Service
          </a>
          , and acknowledge the{' '}
          <a
            className="text-emerald-600 hover:text-emerald-700 transition-colors"
            href="https://panache.so/legal/privacy_policy"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  )
}
