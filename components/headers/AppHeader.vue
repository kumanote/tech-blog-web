<script setup lang="ts">
  import {
    Popover,
    PopoverButton,
    PopoverPanel,
    PopoverOverlay,
    TransitionRoot,
    TransitionChild,
  } from '@headlessui/vue'
  import { ChevronDownIcon, XMarkIcon } from '@heroicons/vue/24/outline'
  import AppLogo from '~/components/logos/AppLogo.vue'

  const route = useRoute()
  const navItems = computed(() => {
    let items = [
      {
        href: '/activities',
        text: '直近の記事',
        active: false,
      },
      {
        href: '/series',
        text: '連載記事',
        active: false,
      },
    ]
    items = items.map((item) => {
      return {
        ...item,
        active: route.path === item.href,
      }
    })
    return items
  })
</script>

<template>
  <header
    class="bg-transparent pointer-events-none relative z-50 flex flex-col"
  >
    <div class="top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="relative flex items-center gap-4 py-6">
          <div class="flex flex-1">
            <div
              class="h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10"
            >
              <AppLogo class="h-9 w-9 inline-block pointer-events-auto" />
            </div>
          </div>
          <div class="flex flex-1 justify-end md:justify-center">
            <!-- Mobile Navigation -->
            <nav class="pointer-events-auto md:hidden">
              <Popover v-slot="{ open }" class="pointer-events-auto md:hidden">
                <PopoverButton
                  class="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20 capitalize"
                >
                  メニュー
                  <ChevronDownIcon
                    class="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400"
                  />
                </PopoverButton>
                <TransitionRoot as="mobile_menu" :show="open">
                  <TransitionChild
                    as="mobile_menu"
                    enter="duration-150 ease-out"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="duration-150 ease-in"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                  >
                    <PopoverOverlay
                      class="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80"
                    />
                  </TransitionChild>
                  <TransitionChild
                    as="mobile_menu"
                    enter="duration-150 ease-out"
                    enter-from="opacity-0 scale-95"
                    enter-to="opacity-100 scale-100"
                    leave="duration-150 ease-in"
                    leave-from="opacity-100 scale-100"
                    leave-to="opacity-0 scale-95"
                  >
                    <PopoverPanel
                      focus
                      class="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800"
                    >
                      <div
                        class="flex flex-row-reverse items-center justify-between"
                      >
                        <PopoverButton class="-m-1 p-1 rounded-full">
                          <XMarkIcon
                            class="h-6 w-6 text-zinc-500 dark:text-zinc-400"
                          />
                        </PopoverButton>
                        <h2
                          class="text-sm font-medium text-zinc-600 dark:text-zinc-400 capitalize"
                        >
                          メニュー
                        </h2>
                      </div>
                      <nav class="mt-6">
                        <ul
                          class="-my-2 text-base text-zinc-800 dark:text-zinc-300"
                        >
                          <li v-for="item in navItems" :key="item.href">
                            <PopoverButton
                              as="a"
                              :href="item.href"
                              class="block py-2 capitalize"
                            >
                              {{ item.text }}
                            </PopoverButton>
                          </li>
                        </ul>
                      </nav>
                    </PopoverPanel>
                  </TransitionChild>
                </TransitionRoot>
              </Popover>
            </nav>
            <!-- Desktop Navigation -->
            <nav class="pointer-events-auto hidden md:block">
              <ul
                class="flex rounded-full bg-white/90 px-3 text-xs font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 lg:text-sm"
              >
                <li v-for="item in navItems" :key="item.href">
                  <NuxtLink
                    :href="item.href"
                    class="relative block px-3 py-2 transition capitalize"
                    :class="{
                      'hover:text-primary-500 dark:hover:text-primary-400':
                        !item.active,
                      'text-primary-500 dark:text-primary-400': item.active,
                    }"
                    >{{ item.text
                    }}<span
                      v-if="item.active"
                      class="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-primary-500/0 via-primary-500/40 to-primary-500/0 dark:from-primary-400/0 dark:via-primary-400/40 dark:to-primary-400/0"
                  /></NuxtLink>
                </li>
              </ul>
            </nav>
          </div>
          <div class="flex items-center justify-end md:flex-1"></div>
        </div>
      </div>
    </div>
  </header>
</template>
