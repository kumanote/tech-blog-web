<script setup lang="ts">
  const appConfig = useAppConfig()
  const author = appConfig.author
</script>

<template>
  <NuxtLink href="/">
    <img src="~/assets/images/logo.png" :alt="author" class="w-full h-full" />
  </NuxtLink>
</template>
