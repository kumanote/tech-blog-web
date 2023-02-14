<script setup lang="ts">
  import AppFooter from '~/components/footers/AppFooter.vue'
  import AppHeader from '~/components/headers/AppHeader.vue'
  import ConfirmCookieBanner from '~/components/banners/ConfirmCookieBanner.vue'
</script>

<template>
  <div
    class="min-h-screen flex flex-col font-inter tracking-tight antialiased bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-50"
  >
    <AppHeader />
    <main class="flex-grow">
      <slot />
    </main>
    <AppFooter />
    <ConfirmCookieBanner />
  </div>
</template>
