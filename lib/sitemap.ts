import { ActivitySearchResult } from '~/api/schema/activity'
import { Chapter } from '~/api/schema/series'
export default async () => {
  const apiBaseUrl = 'https://api.kumano-te.com/api/v1'
  interface SiteMapItem {
    url: string
    changefreq?: string | null
    lastmod?: string | null
  }
  const results: Array<SiteMapItem> = [
    {
      url: '/',
      changefreq: 'daily',
    },
    {
      url: '/tools/morse',
      changefreq: 'monthly',
    },
    {
      url: '/activities',
      changefreq: 'daily',
    },
    {
      url: '/series',
      changefreq: 'weekly',
    },
  ]
  const activities = await $fetch<ActivitySearchResult>(
    `${apiBaseUrl}/activities/search`,
    {
      params: {
        type: 'latest',
        skip: 0,
        limit: -1,
      },
    }
  )
  if (activities && activities && activities.list) {
    activities.list.forEach((activity) => {
      results.push({
        url: `/activities/${activity.slug}`,
        lastmod: activity.published_at,
        changefreq: 'weekly',
      })
    })
  }
  const chapters = await $fetch<Array<Chapter>>(`${apiBaseUrl}/chapters/`, {
    params: {
      type: 'latest',
      skip: 0,
      limit: -1,
    },
  })
  if (chapters) {
    const addedSeriesSlug: Array<string> = []
    chapters.forEach((chapter) => {
      if (!addedSeriesSlug.includes(chapter.series_slug)) {
        addedSeriesSlug.push(chapter.series_slug)
        results.push({
          url: `/series/${chapter.series_slug}`,
          changefreq: 'weekly',
        })
      }
      results.push({
        url: `/series/${chapter.series_slug}/${chapter.slug}`,
        lastmod: chapter.published_at,
        changefreq: 'weekly',
      })
    })
  }
  return results
}
