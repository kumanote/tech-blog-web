import { Activity, ActivitySearchResult } from '~/api/schema/activity'

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

export function searchFavoriteActivities({
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
        type: 'favorite',
        skip: skip || 0,
        limit: limit,
      },
    }
  )
}

export async function searchRelatedActivities({
  tags,
  skip,
  limit,
}: {
  tags: Array<string> | null
  skip?: number
  limit: number
}) {
  if (!tags) return []
  const appConfig = useAppConfig()
  const { data } = await useFetch<ActivitySearchResult>(
    `${appConfig.apiBaseUrl}/activities/search`,
    {
      params: {
        type: 'tag',
        tags: tags.join(','),
        skip: skip || 0,
        limit: limit,
      },
    }
  )
  if (!data || !data.value) return []
  return data.value.list
}

export async function getActivity({ slug }: { slug: string }) {
  const appConfig = useAppConfig()
  const { data } = await useFetch<Activity>(
    `${appConfig.apiBaseUrl}/activities/${slug}`
  )
  if (!data || !data.value) return null
  return data.value
}
