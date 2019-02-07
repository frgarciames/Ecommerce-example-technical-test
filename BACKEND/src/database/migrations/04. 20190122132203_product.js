exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('product', (table) => {
      table.increments('id').primary().unsigned();
      table.integer('cart_id');
      table.string('wishlist_id');
      table.string('external-id');
      table.string('name');
      table.integer('amount');
      table.float('price');
      table.string('image');
      table.string('owns');
      table.foreign(['cart_id', 'wishlist_id']).references(['cart.id', 'wishlist.id']);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('product')
  ])
};
