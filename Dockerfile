FROM node:12 as BUILDER

WORKDIR /usr/src/app

COPY . .

RUN yarn install && yarn tsc && yarn build

FROM node:12-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY --from=BUILDER /usr/src/app/dist /dist

COPY ormconfig.js ormconfig.js

COPY package.json package.json

COPY yarn.lock yarn.lock

COPY ./.env ./.env

RUN yarn install --production

EXPOSE ${SERVER_PORT}

CMD [ "node", "dist/server.js" ]
