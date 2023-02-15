export interface Activity {
  avatar_image_url: string | null
  banner_image_url: string | null
  tags: Array<string> | null
  slug: string
  project_id: string | null
  title: string
  subtitle: string | null
  content: string
  start_date: string
  end_date: string
  published_at: string | null
  page_view: number | null
}

export interface ActivitySearchResult {
  total: number
  list: Array<Activity>
}
