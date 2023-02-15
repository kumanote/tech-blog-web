<script setup lang="ts">
  import ChapterList from '~/components/lists/ChapterList.vue'
  import { searchAllChapters } from '~/api/gateway/series'
  import { Series } from '~/api/schema/series'
  const chapters: Array<Series> = await searchAllChapters()
</script>

<template>
  <section class="relative bg-white dark:bg-gray-900 py-8 sm:py-12 lg:py-16">
    <div class="text-center container">
      <h2
        class="text-base font-semibold tracking-wider text-primary-600 uppercase"
      >
        series
      </h2>
      <p
        class="mt-2 text-3xl font-extrabold text-gray-900 dark:text-gray-50 tracking-tight sm:text-4xl"
      >
        連載記事
      </p>
    </div>
    <div class="mt-12 container space-y-8">
      <div
        v-for="(item, index) in chapters"
        :key="index"
        class="shadow-lg overflow-hidden sm:rounded-md"
      >
        <div
          class="bg-white dark:bg-gray-800 px-4 py-5 border-b border-gray-200 dark:border-gray-600 sm:px-6"
        >
          <h3 class="text-lg leading-6 font-medium">
            <NuxtLink
              :href="`/series/${item.slug}`"
              class="text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-500"
            >
              {{ item.title }}
            </NuxtLink>
          </h3>
        </div>
        <ChapterList :chapters="item.chapters" />
      </div>
    </div>
  </section>
</template>
