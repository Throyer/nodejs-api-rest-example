FROM node:12

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install --production

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "start" ]