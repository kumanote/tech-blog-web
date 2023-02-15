<script setup lang="ts">
  import { Chapter } from '~/api/schema/series'
  interface Props {
    chapter: Chapter
    active: boolean
  }
  defineProps<Props>()
</script>

<template>
  <NuxtLink
    :href="`/series/${chapter.series_slug}/${chapter.slug}`"
    class="relative rounded-lg border px-6 py-5 shadow-sm flex items-center space-x-3 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
    :class="{
      'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700':
        !active,
      'border-primary-300 dark:border-primary-600 bg-primary-100 dark:bg-primary-700 hover:bg-primary-200 dark:hover:bg-primary-600':
        active,
    }"
  >
    <div v-if="chapter.avatar_image_url" class="flex-shrink-0">
      <img
        class="h-10 w-10 rounded-md"
        :src="chapter.avatar_image_url"
        alt=""
      />
    </div>
    <div class="flex-1 min-w-0">
      <div>
        <span class="absolute inset-0" aria-hidden="true"></span>
        <p class="text-sm font-medium text-gray-900 dark:text-gray-50">
          {{ chapter.title }}
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400 truncate">
          {{ chapter.subtitle }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>
