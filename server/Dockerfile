FROM node:18

WORKDIR /app/

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install
RUN npm i -g @nestjs/cli
RUN  npm install class-transformer

# Bundle app source
COPY . .
# Run the build command which creates the production bundle
RUN npm run build

EXPOSE 8000
# Start the server 
CMD [ "npm", "start",":dev" ]
