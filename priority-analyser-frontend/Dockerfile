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

EXPOSE 8092

CMD ["npm", "start"]
