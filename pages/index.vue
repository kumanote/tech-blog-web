<script setup lang="ts">
  import ActivityCard from '~/components/cards/ActivityCard.vue'
  import ChapterCard from '~/components/cards/ChapterCard.vue'
  import {
    searchLatestActivities,
    searchFavoriteActivities,
  } from '~/api/gateway/activity'
  import {
    searchLatestChapters,
    searchFavoriteChapters,
  } from '~/api/gateway/series'
  const appConfig = useAppConfig()
  const runtimeConfig = useRuntimeConfig()
  const { data: latestActivitiesSearchResult } = await searchLatestActivities({
    limit: 9,
  })
  const { data: latestChapters } = await searchLatestChapters({
    limit: 3,
  })
  const { data: favoriteActivitiesSearchResult } =
    await searchFavoriteActivities({
      limit: 9,
    })
  const { data: favoriteChapters } = await searchFavoriteChapters({
    limit: 3,
  })
</script>

<template>
  <div
    class="overflow-hidden bg-slate-900 dark:-mb-32 dark:mt-[-4.5rem] dark:pb-32 dark:pt-[4.5rem] dark:lg:mt-[-4.75rem] dark:lg:pt-[4.75rem]"
  >
    <div class="py-16 sm:px-2 lg:relative lg:py-20 lg:px-0 overflow-hidden">
      <div class="container">
        <div class="relative z-10 md:text-center lg:text-left">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            class="absolute top-1/2 left-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:translate-y-0 lg:-translate-x-1/2"
            aria-hidden="true"
          >
            <circle
              cx="512"
              cy="512"
              r="512"
              fill="url(#gradient-circle)"
              fill-opacity="0.7"
            />
            <defs>
              <radialGradient id="gradient-circle">
                <stop offset="0" stop-color="#0369a1" />
                <stop offset="1" stop-color="#bae6fd" />
              </radialGradient>
            </defs>
          </svg>
          <div class="relative">
            <p
              class="inline bg-gradient-to-r from-blue-200 to-primary-400 bg-clip-text font-display text-5xl tracking-tight text-transparent"
            >
              {{ appConfig.title }}
            </p>
            <p class="mt-3 text-2xl tracking-tight text-gray-400">
              {{ appConfig.description }}<br />
              また、このブログサイト自体オープンソースでできています。
            </p>
            <div class="mt-8 flex gap-4 md:justify-center lg:justify-start">
              <a
                target="_blank"
                class="rounded-full bg-slate-800 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:text-slate-400"
                href="https://github.com/kumanote/tech-blog-web"
                >View on GitHub</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <section
    v-if="latestActivitiesSearchResult?.list"
    class="relative bg-white dark:bg-gray-900 py-8 sm:py-12 lg:py-16"
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
        <ActivityCard
          v-for="(item, index) in latestActivitiesSearchResult?.list"
          :key="index"
          :activity="item"
        ></ActivityCard>
      </div>
    </div>
  </section>
  <section class="bg-white dark:bg-gray-900 py-8 sm:py-12 lg:py-16">
    <div class="relative">
      <div class="text-center container">
        <div class="rounded-lg shadow-lg overflow-hidden">
          <adsbygoogle
            :ad-slot="String(runtimeConfig.adsenseIndexBanner)"
          ></adsbygoogle>
        </div>
      </div>
    </div>
  </section>
  <section
    v-if="latestChapters"
    class="relative bg-white dark:bg-gray-900 py-8 sm:py-12 lg:py-16"
  >
    <div class="relative">
      <div class="text-center container">
        <h2
          class="text-base font-semibold tracking-wider text-primary-600 uppercase"
        >
          series
        </h2>
        <p
          class="mt-2 text-3xl font-extrabold text-gray-900 dark:text-gray-50 tracking-tight sm:text-4xl"
        >
          直近の連載記事
        </p>
      </div>
      <div class="mt-12 container grid gap-8 lg:grid-cols-3">
        <ChapterCard
          v-for="(item, index) in latestChapters"
          :key="index"
          :chapter="item"
        ></ChapterCard>
      </div>
    </div>
  </section>
  <section
    v-if="favoriteActivitiesSearchResult?.list"
    class="relative bg-white dark:bg-gray-900 py-8 sm:py-12 lg:py-16"
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
          人気の記事
        </p>
      </div>
      <div class="mt-12 container grid gap-8 lg:grid-cols-3">
        <ActivityCard
          v-for="(item, index) in favoriteActivitiesSearchResult?.list"
          :key="index"
          :activity="item"
        ></ActivityCard>
      </div>
    </div>
  </section>
  <section
    v-if="favoriteChapters"
    class="relative bg-white dark:bg-gray-900 py-8 sm:py-12 lg:py-16"
  >
    <div class="relative">
      <div class="text-center container">
        <h2
          class="text-base font-semibold tracking-wider text-primary-600 uppercase"
        >
          series
        </h2>
        <p
          class="mt-2 text-3xl font-extrabold text-gray-900 dark:text-gray-50 tracking-tight sm:text-4xl"
        >
          人気の連載記事
        </p>
      </div>
      <div class="mt-12 container grid gap-8 lg:grid-cols-3">
        <ChapterCard
          v-for="(item, index) in favoriteChapters"
          :key="index"
          :chapter="item"
        ></ChapterCard>
      </div>
    </div>
  </section>
  <section class="bg-white dark:bg-gray-900 py-8 sm:py-12 lg:py-16">
    <div class="relative">
      <div class="text-center container">
        <div class="grid gap-8 lg:grid-cols-3">
          <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
            <adsbygoogle
              :ad-slot="String(runtimeConfig.adsenseIndexBottomFst)"
            ></adsbygoogle>
          </div>
          <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
            <adsbygoogle
              :ad-slot="String(runtimeConfig.adsenseIndexBottomSnd)"
            ></adsbygoogle>
          </div>
          <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
            <adsbygoogle
              :ad-slot="String(runtimeConfig.adsenseIndexBottomThd)"
            ></adsbygoogle>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
