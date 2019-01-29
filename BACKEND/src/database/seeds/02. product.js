
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('product').del()
    .then(function () {
      // Inserts seed entries
      return knex('product').insert([
        { id: 1, name: 'Backbone Book', amount: 5, text: 'bla bla' },
        { id: 2, name: 'NgBook2', amount: 78, text: 'bla bla' },
        { id: 3, name: 'IonBook', amount: 45, text: 'bla bla' },
      ]);
    });
};
