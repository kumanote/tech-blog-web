<script setup lang="ts">
  import Breadcrumb from '~/components/breadcrumbs/Breadcrumb.vue'
  import MarkdownViewer from '~/components/viewers/MarkdownViewer.vue'
  import ActivityCardSmall from '~/components/cards/ActivityCardSmall.vue'
  import TocSidebar from '~/components/sidebars/TocSidebar.vue'
  import { getActivity, searchRelatedActivities } from '~/api/gateway/activity'
  import { Activity } from '~/api/schema/activity'
  import { parseHtml } from '~/lib/toc'
  const runtimeConfig = useRuntimeConfig()
  const route = useRoute()
  const single: Activity | null = await getActivity({
    slug: String(route.params.slug),
  })
  if (!single) {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
  }
  useHead({ title: single.title })
  const relatedActivities = await searchRelatedActivities({
    tags: single.tags,
    limit: 4,
  })
  const { $md } = useNuxtApp()
  const contentHtml = computed(() => {
    return $md.render(single.content)
  })
  const toc = computed(() => {
    return parseHtml(contentHtml.value)
  })
  const breadcrumbItems = [
    {
      name: '記事一覧',
      href: '/activities',
    },
    {
      name: single.title,
      href: `/activities/${single.slug}`,
    },
  ]
  const stickToc = ref(false)
  const handleScroll = () => {
    const scrollHeight =
      window.pageYOffset || document.documentElement.offsetTop || 0
    stickToc.value = scrollHeight > 200
  }
  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
  })
</script>

<template>
  <div class="container py-2">
    <Breadcrumb :items="breadcrumbItems" />
  </div>
  <div class="container flex-auto lg:static lg:max-h-full lg:overflow-visible">
    <div class="w-full flex">
      <div class="min-w-0 flex-auto pt-10 pb-24 lg:pb-16">
        <p
          v-if="single.published_at"
          class="text-sm text-gray-500 dark:text-gray-400"
        >
          {{ $dayjs(single.published_at).format('YYYY/MM/DD') }}
        </p>
        <h1
          class="text-3xl font-extrabold text-gray-900 dark:text-gray-50 tracking-tight sm:text-4xl"
        >
          {{ single.title }}
        </h1>
        <p class="mt-2 space-x-2">
          <NuxtLink
            v-for="tag in single.tags"
            :key="tag"
            :href="`/search?tag=${tag}`"
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 hover:bg-primary-200 hover:underline"
          >
            {{ tag }}
          </NuxtLink>
        </p>
        <div class="pt-4">
          <MarkdownViewer :html="contentHtml" />
        </div>
        <div class="py-8">
          <div class="rounded-lg shadow-lg overflow-hidden">
            <adsbygoogle
              :ad-slot="String(runtimeConfig.adsenseActivityDetail)"
            ></adsbygoogle>
          </div>
        </div>
        <div
          v-if="relatedActivities && relatedActivities.length > 1"
          class="py-8"
        >
          <h1
            class="text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight"
          >
            関連する記事
          </h1>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4">
            <ActivityCardSmall
              v-for="(item, index) in relatedActivities"
              :key="index"
              :activity="item"
              :active="item.slug === single.slug"
            />
          </div>
        </div>
      </div>
      <div
        class="hidden xl:text-sm xl:block flex-none w-64 pl-8 mr-8 pb-6 overflow-y-auto max-h-screen pt-6"
        :class="{
          'sticky top-0': stickToc,
          'mt-4': !stickToc,
        }"
      >
        <TocSidebar :toc="toc" />
      </div>
    </div>
  </div>
</template>
