// @see https://nuxt.com/docs/guide/directory-structure/plugins#vue-plugins
import VueGtag, { trackRouter } from 'vue-gtag-next'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  if (config.gaId) {
    nuxtApp.vueApp.use(VueGtag, {
      isEnabled: false,
      property: {
        id: config.gaId,
      },
    })
    trackRouter(useRouter())
  }
})
