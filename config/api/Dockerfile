FROM node:14-alpine

COPY ./api /app/
WORKDIR /app
RUN yarn install
RUN yarn build

CMD ["yarn", "start"]
