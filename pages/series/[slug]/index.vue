<script setup lang="ts">
  import ChapterList from '~/components/lists/ChapterList.vue'
  import { getSeries } from '~/api/gateway/series'
  import { Series } from '~/api/schema/series'
  const route = useRoute()
  const single: Series | null = await getSeries({
    slug: String(route.params.slug),
  })
  if (!single) {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
  }
</script>

<template>
  <section
    v-if="single"
    class="relative bg-white dark:bg-gray-900 py-8 sm:py-12 lg:py-16"
  >
    <div class="text-center container">
      <h2
        class="text-base font-semibold tracking-wider text-primary-600 uppercase"
      >
        series
      </h2>
      <p
        class="mt-2 text-3xl font-extrabold text-gray-900 dark:text-gray-50 tracking-tight sm:text-4xl"
      >
        {{ single.title }}
      </p>
    </div>
    <div class="mt-12 container space-y-8">
      <div class="shadow-lg overflow-hidden sm:rounded-md">
        <ChapterList :chapters="single.chapters" />
      </div>
    </div>
  </section>
</template>
