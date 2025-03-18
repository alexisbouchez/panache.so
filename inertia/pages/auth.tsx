import Logo from '~/components/logo'
import { useFlashMessages } from '~/hooks/use_flash_messages'
import { Link } from '@inertiajs/react'
import SendMagicLinkForm from '~/components/forms/send-magic-link-form'

export default function AuthPage() {
  const { success, email } = useFlashMessages()

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

        <SendMagicLinkForm success={!!success} initialEmail={email as string} />

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
