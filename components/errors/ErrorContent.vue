<script setup lang="ts">
  import AppLogo from '~/components/logos/AppLogo.vue'
  interface Error {
    statusCode?: number | string
  }
  interface Props {
    error: Error
  }
  const props = defineProps<Props>()
  const errorMessage = computed(() => {
    const statusCode = props.error?.statusCode
      ? Number(props.error?.statusCode)
      : -1
    switch (statusCode) {
      case 404:
        return {
          title: 'ページがありません',
          description: 'お探しのページは見つかりませんでした。',
        }
      default:
        return {
          title: 'サーバーエラー',
          description: '予期せぬエラーが発生しました。',
        }
    }
  })
  const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <AppLogo class="inline-block w-12 h-12" />
    <div class="flex flex-col items-center justify-center py-16">
      <p class="text-base font-semibold text-primary-700 dark:text-primary-200">
        {{ error.statusCode }}
      </p>
      <h1
        class="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-gray-50"
      >
        {{ errorMessage.description }}
      </h1>
      <p class="mt-2 text-base text-gray-500 dark:text-gray-400">
        {{ errorMessage.title }}
      </p>
      <div class="mt-10">
        <button
          class="inline-flex items-center rounded-md border border-transparent bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 capitalize"
          @click="handleError"
        >
          TOPに戻る
        </button>
      </div>
    </div>
  </div>
</template>
