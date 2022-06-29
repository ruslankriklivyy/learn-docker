FROM node:latest

WORKDIR /app

COPY . .

RUN yarn

RUN yarn global add @vue/cli

RUN yarn global add @quasar/cli

EXPOSE 80

CMD ["yarn", "dev"]
