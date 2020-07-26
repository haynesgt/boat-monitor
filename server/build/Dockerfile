FROM node:10.22.0-buster

COPY package.json package-lock.json src test index.js deploy-dev.sh /

RUN npm install

CMD ["npm run test"]
