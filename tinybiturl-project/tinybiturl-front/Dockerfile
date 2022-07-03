FROM node:13.12.0-alpine

WORKDIR /app/frontend

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json package-lock.json ./

RUN npm install --silent

RUN npm install bootstrap jquery axios

RUN npm install validator

COPY src src

COPY public public

# RUN npm install react-scripts@3.0.1 -g --silent

EXPOSE 3000

CMD npm start