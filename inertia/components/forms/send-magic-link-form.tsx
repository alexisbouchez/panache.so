import React from 'react'
import { useForm } from '@inertiajs/react'
import { Alert, AlertTitle, AlertDescription } from '~/components/ui/alert'
import { Button } from '~/components/ui/button'
import { Card, CardContent } from '~/components/ui/card'
import { Error } from '~/components/ui/error'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { CheckCircle2, ExternalLink } from 'lucide-react'
import { Field } from '#inertia/components/ui/field'

interface SendMagicLinkFormProps {
  success?: boolean
  initialEmail?: string
}

export default function SendMagicLinkForm({
  success = false,
  initialEmail = '',
}: SendMagicLinkFormProps) {
  const form = useForm({
    email: initialEmail,
  })

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
    <Card>
      <CardContent className={success ? 'space-y-6' : ''}>
        {success ? (
          <>
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
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <Field>
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
            </Field>

            <Button type="submit" className="!w-full mt-4" loading={form.processing}>
              Send Magic Link
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
