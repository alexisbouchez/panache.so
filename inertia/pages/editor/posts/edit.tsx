import { Button } from '~/components/ui/button'
import EditorLayout from '~/components/editor_layout'
import Publication from '#models/publication'
import Post from '#models/post'
import { useForm } from '@inertiajs/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Textarea } from '~/components/ui/textarea'
import { IconDeviceFloppy } from '@tabler/icons-react'
import { Switch } from '~/components/ui/switch'

interface Props {
  publication: Publication
  post: Post
}

export default function EditPost({ publication, post }: Props) {
  const { data, setData, patch, processing, errors } = useForm({
    title: post.title,
    content: post.content,
    published: post.published,
  })

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    patch(`/publications/${publication.customDomain || publication.slug}/posts/${post.slug}`)
  }

  return (
    <EditorLayout title="Edit Post">
      <div className="py-8">
        <Card>
          <CardHeader>
            <CardTitle>Edit Post</CardTitle>
            <CardDescription>Edit your post content and settings.</CardDescription>
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
                {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
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
                {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={data.published}
                  onCheckedChange={(checked) => setData('published', checked)}
                />
                <Label htmlFor="published">Published</Label>
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={processing}>
                  <IconDeviceFloppy className="size-4 -ml-1" />
                  <span>Save Changes</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </EditorLayout>
  )
}
