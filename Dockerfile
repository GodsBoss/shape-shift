FROM node:6.14.4-alpine

RUN apk add --update-cache \
  gimp

WORKDIR /root

COPY gulpfile.js /root
COPY npm-shrinkwrap.json /root
COPY package.json /root

RUN npm install
CMD ["./node_modules/.bin/gulp"]
