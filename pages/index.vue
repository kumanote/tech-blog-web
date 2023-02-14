<script setup lang="ts">
  import BlogCard from '~/components/cards/BlogCard.vue'
  import { searchLatestActivities } from '~/api/gateway/activity'
  const { data: activitiesSearchResult } = await searchLatestActivities({
    limit: 9,
  })
</script>

<template>
  <section
    v-if="activitiesSearchResult?.list"
    class="relative bg-gray-50 dark:bg-gray-800 py-16 sm:py-24 lg:py-32"
  >
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
        <BlogCard
          v-for="(item, index) in activitiesSearchResult?.list"
          :key="index"
          :activity="item"
        ></BlogCard>
      </div>
    </div>
  </section>
</template>
