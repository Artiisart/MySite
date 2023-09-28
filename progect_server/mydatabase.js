const {Sequelize} = require("sequelize")
//docker run --name users -e POSTGRES_PASSWORD=mymodel -p 5432:5432 -d postgres
//docker run -e POSTGRES_USER=docker -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=docker library/postgres

//docker run --name users -e POSTGRES_USER=user -e POSTGRES_PASSWORD=uspass -e POSTGRES_DB=docker postgres
//module.exports = new Sequelize('postgres://user:userpass@localhost:5432/postgres');
module.exports = new Sequelize('postgres://user:userpass@localhost:5432/postgres');
