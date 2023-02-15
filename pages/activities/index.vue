<script setup lang="ts">
  import ActivityCard from '~/components/cards/ActivityCard.vue'
  import CenteredPagination from '~/components/paginations/CenteredPagination.vue'
  import { searchLatestActivities } from '~/api/gateway/activity'
  import { Activity } from '~/api/schema/activity'
  const itemsPerPage = 21
  const route = useRoute()
  const router = useRouter()
  const page = useState<number>('page', () => {
    if (!route.query.page) return 1
    try {
      return Number(route.query.page)
    } catch (_) {
      return 1
    }
  })
  const skip = (page.value - 1) * itemsPerPage
  const { data: searchResult } = await searchLatestActivities({
    skip,
    limit: itemsPerPage,
  })
  const items = useState<Array<Activity>>('items', () => {
    return searchResult?.value?.list || []
  })
  const total = useState<number>('total', () => {
    return searchResult?.value?.total || 0
  })
  const totalPage = computed(() => {
    return (
      Math.floor(total.value / itemsPerPage) +
      (total.value % itemsPerPage > 0 ? 1 : 0)
    )
  })
  const goToPage = async (value: number) => {
    const skip = (value - 1) * itemsPerPage
    const { data: searchResult } = await searchLatestActivities({
      skip,
      limit: itemsPerPage,
    })
    router.push(`/activities?page=${value}`)
    page.value = value
    items.value = searchResult?.value?.list || []
    total.value = searchResult?.value?.total || 0
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
</script>

<template>
  <section class="relative bg-white dark:bg-gray-900 py-8 sm:py-12 lg:py-16">
    <div class="relative">
      <div class="text-center container">
        <h2
          class="text-base font-semibold tracking-wider text-primary-600 uppercase"
        >
          activity
        </h2>
        <p
          class="mt-2 text-3xl font-extrabold text-gray-900 dark:text-gray-50 tracking-tight sm:text-4xl"
        >
          直近の記事
        </p>
      </div>
      <div class="mt-12 container grid gap-8 lg:grid-cols-3">
        <ActivityCard
          v-for="(item, index) in items"
          :key="index"
          :activity="item"
        ></ActivityCard>
      </div>
      <div
        v-if="totalPage > 1"
        class="max-w-md sm:max-w-lg lg:max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8 py-4"
      >
        <CenteredPagination
          :value="page"
          :length="totalPage"
          @input="goToPage"
        />
      </div>
    </div>
  </section>
</template>
