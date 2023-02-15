<script setup lang="ts">
  import { Activity } from '~/api/schema/activity'
  interface Props {
    activity: Activity
  }
  defineProps<Props>()
</script>

<template>
  <a
    target="_blank"
    :href="`/activities/${activity.slug}`"
    class="block flex flex-col rounded-lg shadow-lg overflow-hidden"
  >
    <div
      v-if="activity.banner_image_url"
      class="flex-shrink-0 h-48 overflow-hidden"
    >
      <img
        class="h-48 w-full object-cover transform hover:scale-110 transition duration-500"
        :src="activity.banner_image_url"
        alt=""
      />
    </div>
    <div
      class="flex-1 bg-white p-6 flex flex-col justify-between hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <div class="flex-1">
        <p
          v-if="activity.published_at"
          class="text-sm text-gray-500 dark:text-gray-400"
        >
          {{ $dayjs(activity.published_at).format('YYYY/MM/DD') }}
        </p>
        <p class="text-xl font-semibold text-gray-900 dark:text-gray-50">
          {{ activity.title }}
        </p>
        <p v-if="activity.tags" class="mt-2 space-x-2">
          <span
            v-for="tag in activity.tags"
            :key="tag"
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
          >
            {{ tag }}
          </span>
        </p>
        <p
          v-if="activity.subtitle"
          class="mt-2 text-base text-gray-500 dark:text-gray-400"
        >
          {{ activity.subtitle }}
        </p>
      </div>
    </div>
  </a>
</template>
