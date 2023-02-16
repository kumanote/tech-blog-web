<script setup lang="ts">
  import { TocItem } from '~/lib/toc'
  interface Props {
    toc: Array<TocItem>
  }
  const props = defineProps<Props>()
  const runtimeConfig = useRuntimeConfig()

  const currentOffset = ref<number>(0)
  const activeIndex = ref<number>(0)

  const indentClass = (indent: number) => {
    if (!indent || indent <= 0) return ''
    return `ml-${4 * indent}`
  }

  const findActiveIndex = () => {
    if (currentOffset.value < 100) {
      activeIndex.value = 0
      return
    }
    const list = props.toc.slice().reverse()
    const index = list.findIndex((item) => {
      const section = document.getElementById(item.id)
      if (!section) return false
      return section.offsetTop - 200 < currentOffset.value
    })
    const lastIndex = list.length - 1
    activeIndex.value = index > -1 ? lastIndex - index : lastIndex
  }

  const handleScroll = () => {
    const nextOffset =
      window.pageYOffset || document.documentElement.offsetTop || 0
    if (Math.abs(currentOffset.value - nextOffset) > 50) {
      currentOffset.value = nextOffset
      findActiveIndex()
    }
  }

  const goTo = (id: string) => {
    const hash = '#' + CSS.escape(id)
    const target = window.document.querySelector(hash)
    if (!target) return
    const top = target.getBoundingClientRect().top + window.pageYOffset
    window.scrollTo({
      top,
      behavior: 'smooth',
    })
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
  })
</script>

<template>
  <div class="flex flex-col justify-between">
    <div>
      <h5
        class="text-gray-900 dark:text-gray-50 uppercase tracking-wide font-semibold mb-3 text-sm lg:text-xs"
      >
        Table of Contents
      </h5>
      <ul class="overflow-x-hidden font-medium mb-8">
        <li v-for="(item, index) in toc" :key="index">
          <a
            class="block transform transition-colors duration-200 py-2"
            :class="`${indentClass(item.indent)} ${
              index === activeIndex
                ? 'text-primary-500'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark-hover:text-gray-200'
            }`"
            @click="goTo(item.id)"
            >{{ item.text }}</a
          >
        </li>
      </ul>
      <adsbygoogle
        :ad-slot="String(runtimeConfig.adsenseArticleToc)"
      ></adsbygoogle>
    </div>
  </div>
</template>
