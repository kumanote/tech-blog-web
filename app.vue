<script setup lang="ts">
  const appConfig = useAppConfig()
  useHead({
    titleTemplate: (s) => {
      return s ? `${s} - ${appConfig.title}` : appConfig.title
    },
    meta: [
      { name: 'description', content: appConfig.description },
      { property: 'og:title', content: appConfig.title },
      {
        property: 'og:site_name',
        content: appConfig.title,
      },
      {
        property: 'og:description',
        content: appConfig.description,
      },
    ],
  })
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>
