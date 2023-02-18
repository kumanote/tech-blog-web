FROM node:19.6.0-buster-slim

WORKDIR /app
COPY ./package.json /app/
COPY ./yarn.lock /app/
RUN yarn install

ARG BUILD_ENV

COPY . .
RUN yarn build

EXPOSE 3000
CMD ["yarn", "run", "nuxt", "start", "--hostname", "0.0.0.0", "--port", "3000"]
