import { buttonVariants } from '#inertia/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '#inertia/components/ui/card'
import useParams from '#inertia/hooks/use_params'
import Publication from '#models/publication'
import { Link } from '@inertiajs/react'
import { IconExternalLink } from '@tabler/icons-react'
import EditorLayout from '~/components/editor_layout'
import NewPostForm from '~/components/new_post_form'

export default function EditorShow({
  publication,
  numberOfPosts,
  numberOfContacts,
}: {
  publication: Publication
  numberOfPosts: number
  numberOfContacts: number
}) {
  const params = useParams()
  const publicationUrl = publication.customDomain
    ? `https://${publication.customDomain}`
    : `https://${publication.slug}.panache.so`

  return (
    <EditorLayout
      title="Overview"
      actions={
        <div className="flex items-center gap-x-2">
          <a
            className={buttonVariants({ variant: 'secondary' })}
            href={publicationUrl}
            target="_blank"
          >
            <IconExternalLink className="w-4.5 h-4.5 -ml-1" />
            <span className="flex items-center gap-x-2">View Site</span>
          </a>
          <NewPostForm publicationDomain={params.domain} />
        </div>
      }
    >
      <div className="my-8 flex items-center gap-x-4">
        <Link
          className="w-full hover:opacity-75 transition-opacity"
          href={`/publications/${params.domain}/posts`}
        >
          <Card className="w-full">
            <CardContent className="gap-y-2 flex flex-col">
              <CardDescription>Posts</CardDescription>
              <CardTitle className="text-xl">{numberOfPosts}</CardTitle>
            </CardContent>
          </Card>
        </Link>
        <Link
          className="w-full hover:opacity-75 transition-opacity"
          href={`/publications/${params.domain}/audience`}
        >
          <Card className="w-full">
            <CardContent className="gap-y-2 flex flex-col">
              <CardDescription>Subscribers</CardDescription>
              <CardTitle className="text-xl">{numberOfContacts}</CardTitle>
            </CardContent>
          </Card>
        </Link>
      </div>
    </EditorLayout>
  )
}
