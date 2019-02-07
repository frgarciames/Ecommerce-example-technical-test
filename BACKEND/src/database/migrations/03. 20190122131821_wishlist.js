exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('wishlist', (table) => {
      table.increments('id').primary().unsigned();
      table.date('createdAt');
      table.string('name');
      table.boolean('priv');
      table.integer('client_id').unsigned();
      table.foreign('client_id').references('client.id');
    })
  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('wishlist')
  ])
};
