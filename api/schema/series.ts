export interface Series {
  slug: string
  title: string
  subtitle: string | null
  published_at: string | null
}

export interface Chapter {
  slug: string
  series_id: number
  sequence: number
  title: string
  subtitle: string | null
  content: string
  published_at: string | null
  page_view: number | null
  series_slug: string | null
  series_title: string | null
  avatar_image_url: string | null
  banner_image_url: string | null
  tags: Array<string> | null
}
