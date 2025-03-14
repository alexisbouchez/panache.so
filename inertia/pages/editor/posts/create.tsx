import React from 'react'
import { Button } from '~/components/ui/button'
import EditorLayout from '~/components/editor_layout'
import Publication from '#models/publication'
import { useForm } from '@inertiajs/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Textarea } from '~/components/ui/textarea'
import { IconDeviceFloppy } from '@tabler/icons-react'
import { Error } from '#inertia/components/ui/error'

interface Props {
  publication: Publication
}

export default function CreatePost({ publication }: Props) {
  const { data, setData, post, processing } = useForm({
    title: '',
    content: '',
  })

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    post(`/publications/${publication.customDomain || publication.slug}/posts`)
  }

  return (
    <EditorLayout title="New Post">
      <div className="py-8">
        <Card>
          <CardHeader>
            <CardTitle>New Post</CardTitle>
            <CardDescription>Create a new post for your publication.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={data.title}
                  onChange={(e) => setData('title', e.target.value)}
                  placeholder="Enter your post title"
                />
                <Error errorKey="title" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={data.content}
                  onChange={(e) => setData('content', e.target.value)}
                  placeholder="Write your post content"
                  rows={10}
                />
                <Error errorKey="content" />
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={processing} loading={processing}>
                  <IconDeviceFloppy className="size-4 -ml-1" />
                  <span>Save Post</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </EditorLayout>
  )
}
