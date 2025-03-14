import React, { useState } from 'react'
import { Button, buttonVariants } from '~/components/ui/button'
import EditorLayout from '~/components/editor_layout'
import Publication from '#models/publication'
import Post from '#models/post'
import { Link } from '@inertiajs/react'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { Card, CardContent } from '~/components/ui/card'
import { format } from 'date-fns'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog'
import NewPostForm from '~/components/new_post_form'
import { TabLink } from '~/components/ui/tabs'
import { Tabs } from '@radix-ui/react-tabs'

interface Props {
  publication: Publication
  posts: Post[]
}

export default function PostsIndex({ publication, posts }: Props) {
  const [activeTab, setActiveTab] = useState<'published' | 'drafts'>('published')

  const publishedPosts = posts.filter((post) => post.published)
  const draftPosts = posts.filter((post) => !post.published || post.isDraft)

  const displayPosts = activeTab === 'published' ? publishedPosts : draftPosts

  return (
    <EditorLayout
      title="Posts"
      actions={<NewPostForm publicationDomain={publication.customDomain || publication.slug} />}
    >
      <div className="mt-8 flex">
        <div className="flex space-x-1 rounded-lg bg-muted p-1 w-auto">
          <TabLink
            className="w-auto"
            href="#published"
            label="Published"
            isActive={activeTab === 'published'}
            onClick={(e: React.MouseEvent) => {
              e.preventDefault()
              setActiveTab('published')
            }}
          />
          <TabLink
            className="w-auto"
            href="#drafts"
            label="Drafts"
            isActive={activeTab === 'drafts'}
            onClick={(e: React.MouseEvent) => {
              e.preventDefault()
              setActiveTab('drafts')
            }}
          />
        </div>
      </div>

      <div className="py-4">
        {displayPosts.length === 0 ? (
          <Card>
            <CardContent className="text-center py-6">
              <p className="text-sm text-neutral-600">
                {activeTab === 'published' ? 'No published posts yet.' : 'No drafts yet.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {displayPosts.map((post) => (
              <Card key={post.id}>
                <CardContent className="flex items-center justify-between py-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-sm text-accent-foreground">
                        {post.title || 'Untitled'}
                      </h3>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          post.published
                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                            : 'bg-neutral-100 text-neutral-700 border border-neutral-200'
                        }`}
                      >
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    {post.publishedAt ? (
                      <p className="text-xs text-neutral-600">
                        {format(new Date(post.publishedAt as unknown as string), 'MMMM d, yyyy')}
                      </p>
                    ) : (
                      <p className="text-xs text-neutral-600">
                        Last updated{' '}
                        {format(new Date(post.updatedAt as unknown as string), 'MMMM d, yyyy')}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/publications/${
                        publication.customDomain || publication.slug
                      }/posts/${post.id}/edit`}
                      className={buttonVariants({ variant: 'secondary', size: 'sm' })}
                    >
                      <IconPencil className="size-4" />
                    </Link>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="danger" size="sm">
                          <IconTrash className="size-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your post.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <Link
                            href={`/publications/${
                              publication.customDomain || publication.slug
                            }/posts/${post.id}`}
                            method="delete"
                            className={buttonVariants({ variant: 'danger' })}
                          >
                            Delete Post
                          </Link>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </EditorLayout>
  )
}
