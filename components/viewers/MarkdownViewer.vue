<script setup lang="ts">
  interface Props {
    html: string
  }
  defineProps<Props>()
  const { $prism } = useNuxtApp()
  onMounted(() => {
    $prism.highlightAll()
  })
</script>

<template>
  <div class="markdown px-0 py-0">
    <div
      class="subheading text--primary markdown-text line-numbers"
      v-html="html"
    />
  </div>
</template>
