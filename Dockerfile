FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
COPY ./db-init/wait-for-db.sh ./wait-for-db.sh
RUN chmod +x ./wait-for-db.sh
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["sh", "./wait-for-db.sh"]