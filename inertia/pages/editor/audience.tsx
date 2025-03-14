import EditorLayout from '#inertia/components/editor_layout'
import { SubscribersDataTable } from '#inertia/components/subscribers_data_table'

interface Props {
  contacts: {
    created_at: string
    id: string
    email: string
    unsubscribed: boolean
  }[]
}

export default function Audience({ contacts }: Props) {
  return (
    <EditorLayout title="Audience">
      <SubscribersDataTable data={contacts} />
    </EditorLayout>
  )
}
