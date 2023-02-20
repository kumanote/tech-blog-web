FROM node:19.6.0-buster-slim

WORKDIR /tech-blog-web
COPY ./package.json /tech-blog-web/
COPY ./yarn.lock /tech-blog-web/
RUN yarn install

ARG GOOGLE_ADSENSE_ID
ARG GOOGLE_ADSENSE_TEST_MODE
ENV GOOGLE_ADSENSE_ID ${GOOGLE_ADSENSE_ID:-ca-google}
ENV GOOGLE_ADSENSE_TEST_MODE ${GOOGLE_ADSENSE_TEST_MODE:-true}

COPY . .
RUN yarn build

EXPOSE 3000
CMD ["yarn", "run", "nuxt", "start"]
