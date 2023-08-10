FROM node:16-alpine

ENV MONGO_URL mongodb://host.docker.internal/media

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]