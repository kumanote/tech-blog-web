import { Chapter, Series } from '~/api/schema/series'

export function searchLatestChapters({
  skip,
  limit,
}: {
  skip?: number
  limit: number
}) {
  const appConfig = useAppConfig()
  return useFetch<Array<Chapter>>(`${appConfig.apiBaseUrl}/chapters/`, {
    params: {
      type: 'latest',
      skip: skip || 0,
      limit: limit,
    },
  })
}

export function searchFavoriteChapters({
  skip,
  limit,
}: {
  skip?: number
  limit: number
}) {
  const appConfig = useAppConfig()
  return useFetch<Array<Chapter>>(`${appConfig.apiBaseUrl}/chapters/`, {
    params: {
      type: 'favorite',
      skip: skip || 0,
      limit: limit,
    },
  })
}

export async function searchAllChapters() {
  const appConfig = useAppConfig()
  const { data: chapters } = await useFetch<Array<Chapter>>(
    `${appConfig.apiBaseUrl}/chapters/`,
    {
      params: {
        type: 'series',
        skip: 0,
        limit: -1,
      },
    }
  )
  const results: Array<Series> = []
  if (!chapters || !chapters.value) return results
  for (let i = 0; i < chapters.value.length; i++) {
    const chapter = chapters.value[i]
    let idx = -1
    for (let j = 0; j < results.length; j++) {
      const series = results[j]
      if (series.id === chapter.series_id) {
        idx = j
        break
      }
    }
    if (idx === -1) {
      results.push({
        id: chapter.series_id,
        slug: chapter.series_slug,
        title: chapter.series_title,
        chapters: [chapter],
      })
    } else {
      results[idx].chapters.push(chapter)
    }
  }
  return results
}
