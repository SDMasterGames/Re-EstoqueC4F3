FROM node:16.15.1-alpine

WORKDIR /estoquec4f3

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm","run","dev"]