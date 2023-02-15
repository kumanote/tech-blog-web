<script setup lang="ts">
  import AppStoreBadge from '~/components/badges/AppStoreBadge.vue'
  import GooglePlayStoreBadge from '~/components/badges/GooglePlayStoreBadge.vue'
  const appConfig = useAppConfig()
</script>

<template>
  <div class="bg-white dark:bg-gray-900 py-8 sm:py-12 lg:py-16">
    <div class="container">
      <div
        class="bg-primary-700 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4"
      >
        <div
          class="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20"
        >
          <div class="lg:self-center">
            <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
              <span class="block">Kumanote</span>
              <span class="block">Mobile App</span>
            </h2>
            <p class="mt-4 text-lg leading-6 text-primary-200">
              弊社はモバイルアプリの開発も行っており、その開発ノウハウをモバイルアプリにて公開しております。<br />
              モバイルアプリでは、弊社で開発する際に頻繁に使うUIコンポーネントを中心に掲載しています。<br />
              アプリ内のコンポーネントは直接操作できるだけでなく、ソースコードの公開をしています。是非ご覧ください。
            </p>
            <div class="mt-8 flex items-center space-x-2 sm:space-x-4">
              <a
                target="_blank"
                :href="appConfig.iOSAppStoreUrl"
                class="text-white hover:text-gray-200 dark:hover:text-gray-200 w-1/2"
              >
                <AppStoreBadge />
              </a>
              <a
                target="_blank"
                :href="appConfig.androidAppPlayStoreUrl"
                class="text-white hover:text-gray-200 dark:hover:text-gray-200 w-1/2"
              >
                <GooglePlayStoreBadge />
              </a>
            </div>
          </div>
        </div>
        <div
          class="-mt-6 aspect-w-5 aspect-h-4 md:aspect-w-3 md:aspect-h-2 max-w-sm"
        >
          <img
            class="transform translate-x-8 translate-y-8 rounded-md object-cover object-left-top sm:translate-x-48 lg:translate-y-20"
            src="/images/blog-ios-app-screenshot.png"
            alt="blog mobile app screenshot"
          />
        </div>
      </div>
    </div>
  </div>
</template>
