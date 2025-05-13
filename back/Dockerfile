FROM node:20.11.1

WORKDIR /usr/src/app

RUN ls -al /usr/src/app

COPY ./back/package*.json ./

RUN npm install

RUN ls -al /usr/src/app

COPY ./back ./

RUN ls -al /usr/src/app

RUN npm run build --verbose

EXPOSE 8080

CMD ["npm", "start"]