FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install


COPY src src

COPY index.js index.js

EXPOSE 80
CMD [ "node", "index.js" ]