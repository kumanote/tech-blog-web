# About this project

This is our tech blog website application.

Please visit our [blog site](https://blog.kumano-te.com).

# Technical information

This is a real-world example of [Nuxt3](https://nuxt.com/) application with the following features.

- nuxt3(vue3)
- typescript
- tailwindcss
- sass
- eslint
- prettier
- commitlint
- [vue-gtag-next](https://matteo-gabriele.gitbook.io/vue-gtag/v/next/)
- [sitemap](https://github.com/funkenstudio/sitemap-module-nuxt-3)
- [atom fee](./server/routes/feed.xml.ts)

# Docker build & run

```bash
% IMAGE=tech-blog-web:latest
% docker build -t ${IMAGE} .
% docker run --rm -p 3000:3000 -e GOOGLE_ADSENSE_TEST_MODE=true ${IMAGE}
```

**archive**

```bash
# after build docker image, you can archive built artifacts by the following command.
% docker run -it -v `pwd`/.build:/tmp/.build ${IMAGE} tar czf /tmp/.build/app.tar.gz /app
```
