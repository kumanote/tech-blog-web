import { Chapter } from '~/api/schema/series'

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
