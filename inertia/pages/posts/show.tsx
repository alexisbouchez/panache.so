import PublicationFooter from '#inertia/components/publication-footer'
import Post from '#models/post'
import Publication from '#models/publication'
import SubscribeToNewsletter from '~/components/subscribe-to-newsletter'
import { formatDate } from 'date-fns'
import { Link } from '@inertiajs/react'
import { IconArrowLeft } from '@tabler/icons-react'
import { Head } from '@inertiajs/react'

function escape(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export default function PostsShow({ publication, post }: { publication: Publication; post: Post }) {
  return (
    <>
      <Head>
        <title>{escape(post.title)}</title>
        <meta name="description" content={escape(post.summary)} />
        <meta property="og:title" content={escape(post.title)} />
        <meta property="og:description" content={escape(post.summary)} />
        <meta
          property="og:url"
          content={`https://${escape(publication.slug)}.panache.so/posts/${post.id}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={escape(publication.title)} />
      </Head>
      <div>
        <main className="min-h-[calc(100vh-69px)] sm:min-h-[calc(100vh-53px)] flex flex-col justify-between max-w-2xl mx-auto px-4 sm:px-0 py-8 sm:py-16 space-y-8">
          <div>
            <header>
              <div className="flex justify-center items-center mb-2">
                <Link
                  href="/"
                  className="inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  <IconArrowLeft className="size-4 mr-2" />
                  Back to posts
                </Link>
              </div>

              <hgroup className="mx-auto flex flex-col items-center gap-1 w-full max-w-xl">
                <h2 className="font-serif text-4xl italic text-center">{post.title}</h2>
                <p className="text-base text-center text-neutral-700">
                  Published on{' '}
                  {formatDate(new Date(post.date as unknown as string), 'MMMM d, yyyy')}
                </p>
              </hgroup>

              <hr className="border-neutral-300 w-full mt-4" />
            </header>
            <div className="mt-4" dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>

          <SubscribeToNewsletter
            className="mt-auto"
            publicationId={publication.id}
            publicationSlug={publication.slug}
          />
        </main>
        <PublicationFooter publicationTitle={publication.title} showPanacheAttribution />
      </div>
    </>
  )
}
