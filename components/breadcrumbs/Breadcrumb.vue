<script setup lang="ts">
  import { HomeIcon } from '@heroicons/vue/20/solid'
  interface BreadcrumbItem {
    name: string
    href: string
  }
  interface Props {
    items: Array<BreadcrumbItem>
  }
  defineProps<Props>()
</script>

<template>
  <nav class="flex">
    <ol role="list" class="flex items-center space-x-4">
      <li>
        <div>
          <NuxtLink href="/" class="text-gray-400 hover:text-gray-500">
            <HomeIcon class="h-5 w-5 flex-shrink-0" aria-hidden="true" />
          </NuxtLink>
        </div>
      </li>
      <li v-for="item in items" :key="item.name">
        <div class="flex items-center">
          <svg
            class="h-5 w-5 flex-shrink-0 text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
          </svg>
          <NuxtLink
            :href="item.href"
            class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 capitalize dark:text-gray-400 dark:hover:text-gray-200 whitespace-nowrap max-w-36 sm:max-w-md truncate"
            >{{ item.name }}</NuxtLink
          >
        </div>
      </li>
    </ol>
  </nav>
</template>
