<script setup lang="ts">
  import { ChevronRightIcon } from '@heroicons/vue/20/solid'
  import { Chapter } from '~/api/schema/series'

  interface Props {
    chapters: Array<Chapter>
  }
  defineProps<Props>()
</script>

<template>
  <ul class="divide-y divide-gray-200 dark:divide-gray-600">
    <li v-for="(chapter, index) in chapters" :key="index">
      <NuxtLink
        :href="`/series/${chapter.series_slug}/${chapter.slug}`"
        class="block bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
      >
        <div class="flex items-center px-4 py-4 sm:px-6">
          <div class="min-w-0 flex-1 flex items-center">
            <div v-if="chapter.avatar_image_url" class="flex-shrink-0">
              <img
                class="h-12 w-12 rounded-md"
                :src="chapter.avatar_image_url"
                alt=""
              />
            </div>
            <div
              class="min-w-0 flex-1 px-4 md:flex md:justify-between items-baseline"
            >
              <div>
                <p
                  class="text-sm font-medium text-gray-900 dark:text-gray-50 truncate"
                >
                  {{ chapter.title }}
                </p>
                <p
                  class="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 truncate"
                >
                  {{ chapter.subtitle }}
                </p>
                <p class="mt-2 flex items-center text-sm space-x-1 truncate">
                  <span
                    v-for="tag in chapter.tags"
                    :key="tag"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                  >
                    {{ tag }}
                  </span>
                </p>
              </div>
              <div class="hidden md:block">
                <div>
                  <p
                    v-if="chapter.published_at"
                    class="text-xs text-gray-700 dark:text-gray-200 text-right"
                  >
                    {{ $dayjs(chapter.published_at).format('YYYY/MM/DD') }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <ChevronRightIcon
              class="h-5 w-5 text-gray-400 dark:text-gray-500"
            />
          </div>
        </div>
      </NuxtLink>
    </li>
  </ul>
</template>
