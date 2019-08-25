# Ticket to Ride

## Resources

- [Creating a RESTful Web API](https://medium.com/@metehansenol/creating-a-restful-web-api-with-node-js-and-express-js-from-scratch-9ba6e21d58b9)
- [Using Swagger](http://www.acuriousanimal.com/2018/10/20/express-swagger-doc.html)
- [Using sequalize.js](https://stackabuse.com/using-sequelize-js-and-sqlite-in-an-express-js-app/)

## Database

This project uses sequelize for the sqlite database generation, code generation, migrations, and seeding.
See [Using sequalize.js](https://stackabuse.com/using-sequelize-js-and-sqlite-in-an-express-js-app/).

### Seeding and migrating

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
