FROM node:16.14.2 as base

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .


RUN npm run build

RUN ls

EXPOSE 5000



ENTRYPOINT [ "node" ,"dist/app.js" ]

# CMD [ "dist/app.js"]