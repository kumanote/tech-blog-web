import { ActivitySearchResult } from '~/api/schema/blog/activity'

export function searchLatestActivities({
  skip,
  limit,
}: {
  skip?: number
  limit: number
}) {
  const appConfig = useAppConfig()
  return useFetch<ActivitySearchResult>(
    `${appConfig.apiBaseUrl}/activities/search`,
    {
      params: {
        type: 'latest',
        skip: skip || 0,
        limit: limit,
      },
    }
  )
}
