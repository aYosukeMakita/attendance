FROM node:14.9.0-buster
ENV APP_ROOT /app

WORKDIR $APP_ROOT

COPY package*.json $APP_ROOT/
RUN npm install

COPY . $APP_ROOT
