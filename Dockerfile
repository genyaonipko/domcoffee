FROM alpine:3.4

RUN cd client && npm install
    npm run lint