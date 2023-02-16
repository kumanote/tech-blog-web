import { Activity } from '~/api/schema/activity'
import { Chapter } from '~/api/schema/series'
export interface SearchResult {
  total: number
  list: Array<Activity | Chapter>
}
