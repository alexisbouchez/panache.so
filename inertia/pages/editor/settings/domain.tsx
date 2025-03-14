import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import EditorLayout from '~/components/editor_layout'
import Publication from '#models/publication'
import { IconCheck, IconCopy, IconSearch } from '@tabler/icons-react'
import { SettingsLayoutNav } from '#inertia/components/settings_layout_nav'
import { Alert, AlertDescription, AlertTitle } from '#inertia/components/ui/alert'
import { PartyPopperIcon, Clock } from 'lucide-react'
import { Input } from '~/components/ui/input'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { useForm } from '@inertiajs/react'

export default function DomainSettings({ publication }: { publication: Publication }) {
  const form = useForm()
  const publicationUrl = publication.customDomain
    ? publication.customDomain
    : `${publication.slug}.panache.so`

  const handleVerifyDns = () => {
    form.post(`/publications/${publication.id}/settings/domain/check`)
  }

  return (
    <EditorLayout title="Domain Settings">
      <div className="grid sm:grid-cols-4 lg:grid-cols-9 gap-x-8 py-8">
        <div className="lg:col-span-2">
          <SettingsLayoutNav />
        </div>
        <div className="sm:col-span-3 lg:col-span-7">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
              <div className="space-y-1">
                <CardTitle>
                  <span>Domain Settings</span>
                  <span className="text-neutral-600 ml-2">({publicationUrl})</span>
                </CardTitle>
                <CardDescription>
                  {publication.customDomainVerified
                    ? 'Your domain is properly configured and ready to use.'
                    : 'Configure your domain settings to start using your custom domain.'}
                </CardDescription>
              </div>
              {!publication.customDomainVerified && (
                <Button
                  onClick={handleVerifyDns}
                  disabled={form.processing}
                  loading={form.processing}
                >
                  <IconSearch className="size-4 -ml-1" />
                  <span>Check</span>
                </Button>
              )}
            </CardHeader>
            <CardContent className="!pt-0">
              <div className="space-y-6">
                <div className="gap-y-4 flex flex-col">
                  {publication.customDomainVerified ? <SuccessAlert /> : <PendingAlert />}
                </div>

                <div className="space-y-4">
                  <h3 className="text-base font-medium">DNS Configuration</h3>
                  <DnsRecordRow recordType="A" recordName="@" recordValue="213.188.215.116" />
                  <DnsRecordRow
                    recordType="AAAA"
                    recordName="@"
                    recordValue="2a09:8280:1::66:8978:0"
                  />
                  <DnsRecordRow recordType="A" recordName="www" recordValue="213.188.215.116" />
                  <DnsRecordRow
                    recordType="AAAA"
                    recordName="www"
                    recordValue="2a09:8280:1::66:8978:0"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </EditorLayout>
  )
}

interface DnsRecordRowProps {
  recordType: string
  recordName: string
  recordValue: string
}

function DnsRecordRow({ recordType, recordName, recordValue }: DnsRecordRowProps) {
  const [showNameCopyTooltip, setShowNameCopyTooltip] = useState(false)
  const [showValueCopyTooltip, setShowValueCopyTooltip] = useState(false)
  const [nameJustCopied, setNameJustCopied] = useState(false)
  const [valueJustCopied, setValueJustCopied] = useState(false)

  const handleCopy = async (
    text: string,
    setTooltip: (show: boolean) => void,
    setJustCopied: (copied: boolean) => void
  ) => {
    await navigator.clipboard.writeText(text)
    setTooltip(true)
    setJustCopied(true)
    setTimeout(() => {
      setTooltip(false)
      setJustCopied(false)
    }, 2000)
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6">
      <div className="flex-1 space-y-1">
        <dt className="font-medium text-sm">Record Name</dt>
        <dd className="text-sm flex">
          <div className="border border-r-0 border-neutral-300 flex items-center justify-center px-2 rounded-l-md bg-neutral-100 text-neutral-700 font-medium">
            {recordType}
          </div>
          <div className="relative flex-1">
            <Input value={recordName} readOnly className="rounded-none rounded-r-lg bg-white" />
            <button
              type="button"
              onClick={() => handleCopy(recordName, setShowNameCopyTooltip, setNameJustCopied)}
              className="absolute cursor-pointer inset-y-0 right-0 flex items-center px-3 text-neutral-500 hover:text-neutral-700"
            >
              {nameJustCopied ? (
                <IconCheck className="size-4 text-emerald-600" />
              ) : (
                <IconCopy className="size-4" />
              )}
              {showNameCopyTooltip && (
                <div className="absolute cursor-pointer -top-8 right-0 text-xs bg-neutral-900 text-white px-2 py-1 rounded">
                  Copied!
                </div>
              )}
            </button>
          </div>
        </dd>
      </div>

      <div className="flex-0 text-center select-none ml-7 sm:ml-0 sm:mt-6">
        <svg
          className="w-4 h-4 text-neutral-500 rotate-90 sm:rotate-0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14m-7-7l7 7-7 7" />
        </svg>
      </div>

      <div className="flex-1 space-y-1">
        <dt className="font-medium text-sm">Record Value</dt>
        <dd className="text-sm flex">
          <div className="relative flex-1">
            <Input value={recordValue} readOnly className="pr-10 bg-white" />
            <button
              type="button"
              onClick={() => handleCopy(recordValue, setShowValueCopyTooltip, setValueJustCopied)}
              className="absolute cursor-pointer inset-y-0 right-0 flex items-center px-3 text-neutral-500 hover:text-neutral-700"
            >
              {valueJustCopied ? (
                <IconCheck className="size-4 text-emerald-600" />
              ) : (
                <IconCopy className="size-4" />
              )}
              {showValueCopyTooltip && (
                <div className="absolute -top-8 right-0 text-xs bg-neutral-900 text-white px-2 py-1 rounded">
                  Copied!
                </div>
              )}
            </button>
          </div>
        </dd>
      </div>
    </div>
  )
}

function PendingAlert() {
  return (
    <Alert variant="warning">
      <Clock className="size-4 stroke-amber-700" />
      <AlertTitle className="text-sm">
        Please add the DNS records shown above to your domain's DNS settings.
      </AlertTitle>
      <AlertDescription className="text-[13px]">
        Once you've added them, click the "Check" button to check if they're properly configured.
      </AlertDescription>
    </Alert>
  )
}

function SuccessAlert() {
  return (
    <Alert variant="success">
      <PartyPopperIcon className="size-4 stroke-emerald-700" />
      <AlertTitle className="text-sm">All set!</AlertTitle>
      <AlertDescription className="text-[13px]">
        All the DNS records are verified. You are ready to start publishing and sending emails to
        your audience.
      </AlertDescription>
    </Alert>
  )
}
