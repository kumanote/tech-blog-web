<script setup lang="ts">
  import AppLogo from '~/components/logos/AppLogo.vue'
  import FacebookIcon from '~/components/icons/socials/FacebookIcon.vue'
  import TwitterIcon from '~/components/icons/socials/TwitterIcon.vue'
  import GithubIcon from '~/components/icons/socials/GithubIcon.vue'
  import FeedlyIcon from '~/components/icons/socials/FeedlyIcon.vue'
  import AppStoreBadge from '~/components/badges/AppStoreBadge.vue'
  import GooglePlayStoreBadge from '~/components/badges/GooglePlayStoreBadge.vue'
  const appConfig = useAppConfig()
  const author = appConfig.author
  const urls = {
    contact: appConfig.contactUrl,
    facebook: appConfig.facebookUrl,
    twitter: appConfig.twitterUrl,
    github: appConfig.githubUrl,
    feedly: appConfig.feedlyUrl,
    corporateWebSiteTopUrl: appConfig.corporateWebSiteTopUrl,
    privacyPolicyUrl: appConfig.privacyPolicyUrl,
    iOSAppStoreUrl: appConfig.iOSAppStoreUrl,
    androidAppPlayStoreUrl: appConfig.androidAppPlayStoreUrl,
  }
</script>

<template>
  <footer class="bg-gray-100 dark:bg-gray-700">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <div class="space-y-8 xl:col-span-1">
          <AppLogo class="w-14 h-14 inline-block" />
          <div class="flex space-x-6">
            <a
              target="_blank"
              :href="urls.facebook"
              class="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
            >
              <span class="sr-only">Facebook</span>
              <FacebookIcon class="h-6 w-6" />
            </a>
            <a
              target="_blank"
              :href="urls.twitter"
              class="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
            >
              <span class="sr-only">Twitter</span>
              <TwitterIcon class="h-6 w-6" />
            </a>
            <a
              target="_blank"
              :href="urls.github"
              class="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
            >
              <span class="sr-only">GitHub</span>
              <GithubIcon class="h-6 w-6" />
            </a>
            <a
              target="_blank"
              :href="urls.feedly"
              class="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
            >
              <span class="sr-only">Feedly</span>
              <FeedlyIcon class="h-6 w-6" />
            </a>
          </div>
          <div class="flex items-center space-x-2">
            <a
              target="_blank"
              :href="urls.iOSAppStoreUrl"
              class="w-28 text-white hover:text-gray-200 dark:hover:text-gray-200"
            >
              <AppStoreBadge />
            </a>
            <a
              target="_blank"
              :href="urls.androidAppPlayStoreUrl"
              class="w-28 text-white hover:text-gray-200 dark:hover:text-gray-200"
            >
              <GooglePlayStoreBadge />
            </a>
          </div>
        </div>
        <div class="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3
                class="text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-wider uppercase"
              >
                ブログ
              </h3>
              <ul class="mt-4 space-y-4">
                <li>
                  <NuxtLink
                    href="/"
                    class="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 capitalize"
                  >
                    ブログTOP
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    href="/activities"
                    class="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 capitalize"
                  >
                    直近の記事
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    href="/series"
                    class="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 capitalize"
                  >
                    連載記事
                  </NuxtLink>
                </li>
              </ul>
            </div>
            <div class="mt-12 md:mt-0">
              <h3
                class="text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-wider uppercase"
              >
                その他
              </h3>
              <ul class="mt-4 space-y-4">
                <li>
                  <NuxtLink
                    href="/tools/morse"
                    class="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 capitalize"
                  >
                    Morse符号練習
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3
                class="text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-wider uppercase"
              >
                運営会社
              </h3>
              <ul class="mt-4 space-y-4">
                <li>
                  <a
                    target="_blank"
                    :href="urls.corporateWebSiteTopUrl"
                    class="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 capitalize"
                  >
                    ホームページ
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    :href="urls.contact"
                    class="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 capitalize"
                  >
                    お問い合わせ
                  </a>
                </li>
              </ul>
            </div>
            <div class="mt-12 md:mt-0">
              <h3
                class="text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-wider uppercase"
              >
                法務
              </h3>
              <ul class="mt-4 space-y-4">
                <li>
                  <a
                    target="_blank"
                    :href="urls.privacyPolicyUrl"
                    class="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 capitalize"
                  >
                    個人情報保護方針
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-12 border-t border-gray-200 dark:border-gray-600 pt-8">
        <p class="text-base text-gray-400 dark:text-gray-500 xl:text-center">
          &copy; 2016 {{ author }}
        </p>
      </div>
    </div>
  </footer>
</template>
