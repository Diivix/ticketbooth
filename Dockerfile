FROM node:12

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
# Bundle app source
COPY . .

# If you are building your code for production
# RUN npm ci --only=production
RUN npm install
# RUN npm ci --only=production
RUN node_modules/.bin/sequelize db:migrate
RUN node_modules/.bin/sequelize db:seed:all
RUN mkdir /app/keys

# Setup app environment variables
ENV NODE_ENV='production'
ENV PORT='8443'
ENV CORS_WHITELIST='https://localhost:3000,https://localhost:3001'
ENV SERVER_KEY='./keys/server.key'
ENV SERVER_CERT='./keys/server.crt'
ENV PRIVATE_KEY='/app/keys/private.key'
ENV PUBLIC_KEY='/app/keys/public.key'
ENV JWT_ISSUER='ticketboothauth.com'
ENV JWT_AUDIENCE='compendium.com'
ENV JWT_EXPIRES_IN='12h'

EXPOSE 8443
CMD [ "npm", "start" ]
