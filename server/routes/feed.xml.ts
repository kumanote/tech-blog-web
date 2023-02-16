import TTLCache from '@isaacs/ttlcache'
import { Author, Feed, FeedOptions } from 'feed'
import { ActivitySearchResult } from '~/api/schema/activity'
import { Chapter } from '~/api/schema/series'

const cacheOptions = {
  cacheKey: 'feed',
  cacheTime: 1000 * 60 * 60 * 24, // 1 day
}
// global cache object
const cache = new TTLCache({ max: 1, ttl: cacheOptions.cacheTime })

function parseDateTime(str?: string | null): Date {
  if (!str) return new Date()
  // str in ISO 8601 format, like: 2008-09-15T15:53:16.619579.
  const year = Number(str.substring(0, 4))
  const month = Number(str.substring(5, 7)) - 1
  const date = Number(str.substring(8, 10))
  const hours = Number(str.substring(11, 13))
  const minutes = Number(str.substring(14, 16))
  const seconds = Number(str.substring(17, 19))
  const ms = Number(str.substring(20))
  return new Date(year, month, date, hours, minutes, seconds, ms)
}

export default defineEventHandler(async (event) => {
  let feedString = ''

  const cachedFeedString = cache.get<string>(cacheOptions.cacheKey)
  if (cachedFeedString) {
    feedString = cachedFeedString
  } else {
    const baseUrl = 'https://blog.kumano-te.com'
    const apiBaseUrl = 'https://api.kumano-te.com/api/v1'
    const author: Author = {
      name: 'Hiroki Tanaka',
      email: 'hiroki.tanaka@kumano-te.com',
      link: 'https://kumano-te.com/members',
    }
    const feedOptions: FeedOptions = {
      id: baseUrl,
      title: 'Kumanote Tech Blog',
      language: 'ja',
      author,
      link: `${baseUrl}/feed.xml`,
      description:
        '合同会社kumanoteのエンジニアブログです。開発に役立つ情報を発信しています。',
      image: `${baseUrl}/icon.png`,
      favicon: `${baseUrl}/favicon.ico`,
      copyright: `@2016 Kumanote LLC. All right reserved.`,
    }
    const feed = new Feed(feedOptions)
    feed.addCategory('blog')
    feed.addContributor(author)
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
    if (activities && activities.list) {
      activities.list.forEach((activity) => {
        feed.addItem({
          title: activity.title,
          id: activity.slug,
          link: `${baseUrl}/activities/${activity.slug}`,
          description: activity.subtitle || undefined,
          content: activity.content,
          date: parseDateTime(activity.published_at),
          image: activity.avatar_image_url || undefined,
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
      chapters.forEach((chapter) => {
        feed.addItem({
          title: chapter.title,
          id: chapter.slug,
          link: `${baseUrl}/series/${chapter.series_slug}/${chapter.slug}`,
          description: chapter.subtitle || undefined,
          content: chapter.content,
          date: parseDateTime(chapter.published_at),
          image: chapter.avatar_image_url || undefined,
        })
      })
    }
    feedString = feed.atom1()
    cache.set(cacheOptions.cacheKey, feedString)
  }
  event.node.res.setHeader(
    'content-type',
    'application/atom+xml; charset=UTF-8'
  )
  event.node.res.end(feedString)
})
