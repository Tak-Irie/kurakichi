FROM node:14
WORKDIR /app
# COPY . .
COPY package.json /
COPY yarn.lock /
COPY modules/ /modules/
COPY apps/server/ /apps/server/

RUN yarn install

CMD ["yarn", "dev:server"]