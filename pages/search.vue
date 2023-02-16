<script setup lang="ts">
  import ActivityCard from '~/components/cards/ActivityCard.vue'
  import ChapterCard from '~/components/cards/ChapterCard.vue'
  import CenteredPagination from '~/components/paginations/CenteredPagination.vue'
  import { searchArticles } from '~/api/gateway/search'
  const itemsPerPage = 21
  const route = useRoute()
  const router = useRouter()
  const tag = String(route.query.tag)
  const page = ref(Number(route.query.page) || 1)
  const skip = (page.value - 1) * itemsPerPage
  const { data: searchResult } = await searchArticles({
    tag: tag,
    skip,
    limit: itemsPerPage,
  })
  const items = ref(searchResult?.value?.list || [])
  const total = ref(searchResult?.value?.total || 0)

  const totalPage = computed(() => {
    return (
      Math.floor(total.value / itemsPerPage) +
      (total.value % itemsPerPage > 0 ? 1 : 0)
    )
  })
  const goToPage = async (value: number) => {
    const skip = (value - 1) * itemsPerPage
    const { data: searchResult } = await searchArticles({
      tag: tag,
      skip,
      limit: itemsPerPage,
    })
    router.push(`/search?tag=${tag}&page=${value}`)
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
          検索
        </h2>
        <p
          class="mt-2 text-3xl font-extrabold text-gray-900 dark:text-gray-50 tracking-tight sm:text-4xl"
        >
          {{ tag }}による検索結果
        </p>
      </div>
      <div class="mt-12 container grid gap-8 lg:grid-cols-3">
        <template v-for="item in items">
          <ChapterCard
            v-if="item.series_slug"
            :key="`${item.series_slug}--${item.slug}`"
            :chapter="item"
          ></ChapterCard>
          <ActivityCard
            v-else
            :key="`activities--${item.slug}`"
            :activity="item"
          ></ActivityCard>
        </template>
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
