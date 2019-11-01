FROM node:8

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
# Bundle app source
COPY . .

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
RUN node_modules/.bin/sequelize db:migrate
RUN node_modules/.bin/sequelize db:seed:all
RUN mkdir /app/keys
RUN openssl genrsa -out /app/keys/private.key 2048
RUN openssl rsa -in /app/keys/private.key -outform PEM -pubout -out /app/keys/public.key
RUN openssl req -new -newkey rsa:2048 -days 365 -nodes -x509 -subj "/C=AU/ST=<State>/L=Canberra/O=OrangeLightning/CN=ticketbooth" -keyout /app/keys/server.key -out /app/keys/server.crt

# Setup app environment variables
ENV PORT='8080'
ENV PRIVATE_KEY='/app/keys/private.key'
ENV PUBLIC_KEY='/app/keys/public.key'
ENV PRIVATE_KEY='/app/keys/private.key'
ENV PUBLIC_KEY='/app/keys/public.key'
ENV JWT_ISSUER='ticketboothauth.com'
ENV JWT_AUDIENCE='compendium.com'
ENV JWT_EXPIRES_IN='12h'

EXPOSE 3000
CMD [ "npm", "start" ]
