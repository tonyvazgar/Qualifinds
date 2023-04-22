FROM node:16-bullseye

WORKDIR /app

COPY . .

RUN chown -R node /app/node_modules

RUN npm install
RUN npm install -g npm@9.6.5

ENTRYPOINT ["npm", "run", "scrapping"]
CMD ["$1"]