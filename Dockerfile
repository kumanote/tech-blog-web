FROM node:19.6.0-buster-slim

WORKDIR /tech-blog-web
COPY ./package.json /tech-blog-web/
COPY ./yarn.lock /tech-blog-web/
RUN yarn install

ARG BUILD_ENV

COPY . .
RUN yarn build

EXPOSE 3000
CMD ["yarn", "run", "nuxt", "start"]
