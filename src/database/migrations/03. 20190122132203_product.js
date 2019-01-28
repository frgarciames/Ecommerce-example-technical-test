
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('product', (table) => {
      table.increments('id').primary().unsigned()
      table.integer('cart_id').unsigned()
      table.string('external-id')
      table.string('name')
      table.integer('amount')
      table.float('price')
      table.string('image')
      table.foreign('cart_id').references('cart.id')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('product')
  ])
};
