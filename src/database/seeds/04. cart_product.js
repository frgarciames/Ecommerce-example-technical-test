
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('cart_product').del()
    .then(function () {
      // Inserts seed entries
      return knex('cart_product').insert([
        { id: 1, cart_id: 1, product_id: 1 },
        { id: 2, cart_id: 1, product_id: 2 },
        { id: 3, cart_id: 1, product_id: 3 },
      ]);
    });
};
