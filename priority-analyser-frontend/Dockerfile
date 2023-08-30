# pull official base image
FROM node:16
# set work directory
WORKDIR /app/
# add to $PATH
# install app dependencies
COPY package*.json ./
RUN npm install

# add app
COPY . ./

EXPOSE 3000

CMD ["npm", "start"]

