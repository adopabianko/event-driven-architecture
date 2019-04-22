FROM node:10
WORKDIR /app
COPY package.json /app
COPY . /app
RUN npm install -g nodemon
CMD ["nodemon", "start"]
EXPOSE 3000