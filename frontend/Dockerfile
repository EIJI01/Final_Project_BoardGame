## base
FROM node:18-alpine as base
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .

## development
FROM base as dev
EXPOSE 3000
CMD ["yarn", "dev"]

## production 
FROM base as prod
RUN yarn build
EXPOSE 3001
CMD ["yarn", "preview"]
