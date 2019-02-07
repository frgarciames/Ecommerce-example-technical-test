exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('client', (table) => {
      table.increments('id').primary().unsigned();
      table.string('email');
      table.string('password');
      table.integer('age');
    })
  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('client')
  ])
};
