FROM node:12

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
# Bundle app source
COPY . .

RUN mkdir -p /data/keys
# If you are building your code for production
RUN npm install

# Setup app environment variables
ENV NODE_ENV='production'
ENV PORT='3080'
ENV CORS_WHITELIST='https://localhost:3000,https://localhost:3001'
ENV SERVER_KEY='/data/keys/server.key'
ENV SERVER_CERT='/data/keys/server.crt'
ENV PRIVATE_KEY='/data/keys/private.key'
ENV PUBLIC_KEY='/data/keys/public.key'
ENV JWT_ISSUER='diivix.com'
ENV JWT_AUDIENCE='diivix.com'
ENV JWT_EXPIRES_IN='1h'
ENV SIGNUP_KEY='throughvictorymychainsarebroken'

CMD [ "npm", "start" ]
