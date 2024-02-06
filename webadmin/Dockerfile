## base
FROM node:18-alpine as base
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .

## development
FROM base as dev
EXPOSE 5000
CMD ["yarn", "dev"]

## production 
FROM base as prod
RUN yarn build
EXPOSE 5001
CMD ["yarn", "preview"]
