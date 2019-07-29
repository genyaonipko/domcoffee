FROM node:10

RUN cd client && npm install
    npm run lint