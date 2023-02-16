FROM node:12 as build

WORKDIR /usr/src

RUN apt-get update
RUN apt-get install python2.7

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci

COPY public/ public/
COPY src/ src/
RUN npm run build

FROM nginx:alpine

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/build /usr/share/nginx/html/
