
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('client').del()
    .then(function () {
      // Inserts seed entries
      return knex('client').insert([
        { id: 1, email: 'john@gmail.com', age: 24 },
        { id: 2, email: 'oliver@gmail.com', age: 22 },
        { id: 3, email: 'charlie@gmail.com', age: 26 },
      ]);
    });
};
