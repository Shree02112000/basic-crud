const { Model} = require('objection');
const Knex = require('knex');

const knex = Knex({
    client: 'mysql',
    connection: {
      HOST : "localhost",
      USER : "root",
      PASSWORD:"0211",
      database : "hapi",
      dialect :"mysql"
    },
    pool:{min:0, max:10}
});

Model.knex(knex)

module.exports = knex;