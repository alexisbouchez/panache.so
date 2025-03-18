import Logo from '~/components/logo'
import CreatePublicationForm from '~/components/forms/create-publication-form'

export default function Onboarding() {
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

        <CreatePublicationForm />
      </div>
    </div>
  )
}
