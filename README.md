# Ticketbooth

## Resources

- [Creating a RESTful Web API](https://medium.com/@metehansenol/creating-a-restful-web-api-with-node-js-and-express-js-from-scratch-9ba6e21d58b9)
- [Using Swagger](http://www.acuriousanimal.com/2018/10/20/express-swagger-doc.html)
- [Using sequalize.js](https://stackabuse.com/using-sequelize-js-and-sqlite-in-an-express-js-app/)
- [Exmaple providing JWTs](https://dev.to/santypk4/you-don-t-need-passport-js-guide-to-node-js-authentication-26ig)

## Database

This project uses sequelize for the sqlite database generation, code generation, migrations, and seeding.
See [Using sequalize.js](https://stackabuse.com/using-sequelize-js-and-sqlite-in-an-express-js-app/).

### Seeding and migrating

This is all that should be needed from now on, assuming the initial migration and seeders have been created:

1. Migrate the database: `node_modules/.bin/sequelize db:migrate`
2. Seed the database: `node_modules/.bin/sequelize db:seed:all`

#### From Scratch

1. Create a new table/model:
`node_modules/.bin/sequelize model:generate --name Contact --attributes firstName:string,lastName:string,phone:string,email:string`
2. Migrate the database:
`node_modules/.bin/sequelize db:migrate`
3. Add a new seed file, and update it:
`node_modules/.bin/sequelize model:generate --name Contact --attributes firstName:string,lastName:string,phone:string,email:string`
4. Seed the database:
`node_modules/.bin/sequelize db:seed:all`
5. [optional] undo the seeds
`node_modules/.bin/sequelize db:seed:undo:all`

## Generate public/private keypair and SSL certs

### Public/private keypair

1. `openssl genrsa -out private.key 2048`
2. `openssl rsa -in ./keys/private.key -outform PEM -pubout -out ./keys/public.key`

### SSL certs

1. `openssl req -new -newkey rsa:2048 -days 365 -nodes -x509 -subj "/C=AU/ST=ACT/L=Canberra/O=OrangeLightning/CN=ticketbooth" -keyout ./keys/server.key -out ./keys/server.crt`

## Deploying on Docker

1. Run `docker build -t ticketbooth .`
2. Run `docker run --name ticketbooth -p 8080:8080 -d ticketbooth`

To stop the container run `docker stop ticketbooth`
To ssh into the container run `docker exec -it ticketbooth /bin/bash`.
