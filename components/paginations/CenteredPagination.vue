<script setup lang="ts">
  import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue/20/solid'
  interface Props {
    value: number
    length: number
  }
  interface Page {
    page: number | null
    active: boolean
    label: string
  }
  interface Emits {
    (e: 'input', value: number): void
  }
  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  const previous = computed(() => {
    return props.value - 1
  })
  const hasPrevious = computed(() => {
    return previous.value > 0
  })
  const next = computed(() => {
    return props.value + 1
  })
  const hasNext = computed(() => {
    return next.value <= props.length
  })
  const pages = computed(() => {
    const maxItemCount = 7
    const results: Array<Page> = []
    const appendItem = (page: number | null) => {
      results.push({
        page,
        active: page === props.value,
        label: page ? `${page}` : '...',
      })
    }
    if (props.length <= maxItemCount) {
      for (let i = 1; i <= props.length; i++) {
        appendItem(i)
      }
      return results
    }
    const half = Math.floor(maxItemCount / 2)
    if (props.value <= half || props.length - props.value < half) {
      for (let i = 1; i <= half; i++) {
        appendItem(i)
      }
      if (props.value === half) {
        appendItem(half + 1)
      }
      appendItem(null)
      if (props.value === props.length - half + 1) {
        appendItem(props.length - half)
      }
      for (let i = props.length - half + 1; i <= props.length; i++) {
        appendItem(i)
      }
    } else {
      appendItem(1)
      appendItem(null)
      const additional = maxItemCount - 4
      const start = props.value - Math.floor(additional / 2)
      for (let i = start; i < start + additional; i++) {
        appendItem(i)
      }
      appendItem(null)
      appendItem(props.length)
    }
    return results
  })
  const change = (value: number) => {
    emit('input', value)
  }
</script>

<template>
  <nav
    class="border-t border-gray-200 dark:border-gray-600 px-4 flex items-center justify-between sm:px-0"
  >
    <div class="-mt-px w-0 flex-1 flex">
      <a
        v-if="hasPrevious"
        class="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 whitespace-nowrap"
        @click="change(previous)"
      >
        <ArrowLeftIcon class="mr-3 h-5 w-5 text-gray-400" />
        前へ
      </a>
    </div>
    <div class="hidden md:-mt-px md:flex">
      <template v-for="(item, index) in pages">
        <a
          v-if="item.page"
          :key="`${index}-${item.label}`"
          class="border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
          :class="{
            'border-primary-500 text-primary-600': item.active,
            'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300':
              !item.active,
          }"
          @click="change(item.page)"
        >
          {{ item.label }}
        </a>
        <span
          v-else
          :key="`${index}-${item.label}`"
          class="border-transparent text-gray-500 dark:text-gray-400 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
        >
          {{ item.label }}
        </span>
      </template>
    </div>
    <div class="-mt-px w-0 flex-1 flex justify-end">
      <a
        v-if="hasNext"
        class="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 whitespace-nowrap"
        @click="change(next)"
      >
        次へ
        <ArrowRightIcon
          name="arrow-narrow-right"
          class-object="ml-3 h-5 w-5 text-gray-400"
          :small="true"
        />
      </a>
    </div>
  </nav>
</template>
