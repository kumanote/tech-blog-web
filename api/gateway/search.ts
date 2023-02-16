import { SearchResult } from '~/api/schema/search'

export function searchArticles({
  tag,
  skip,
  limit,
}: {
  tag: string
  skip?: number
  limit: number
}) {
  const appConfig = useAppConfig()
  return useFetch<SearchResult>('/search/', {
    baseURL: `${appConfig.apiBaseUrl}`,
    params: {
      tag,
      skip: skip || 0,
      limit: limit,
    },
  })
}
