<script setup lang="ts">
  import AppFooter from '~/components/footers/AppFooter.vue'
  import AppHeader from '~/components/headers/AppHeader.vue'
  import ErrorContent from '~/components/errors/ErrorContent.vue'
  interface Error {
    statusCode?: number | string
  }
  interface Props {
    error: Error
  }
  defineProps<Props>()
</script>

<template>
  <div
    class="min-h-screen flex flex-col font-inter tracking-tight antialiased bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-50"
  >
    <AppHeader />
    <main class="flex-grow flex items-center justify-center container py-16">
      <ErrorContent :error="error" />
    </main>
    <AppFooter />
  </div>
</template>
