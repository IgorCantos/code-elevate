FROM node:20.11.1

WORKDIR /usr/src/app

COPY ./front/package*.json ./

RUN npm install

RUN ls -al /usr/src/app

COPY ./front ./

RUN ls -al /usr/src/app

RUN npm run build --verbose

FROM nginx:stable-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=0 /usr/src/app/dist /usr/share/nginx/html

EXPOSE 3030

CMD ["nginx", "-g", "daemon off;"]
