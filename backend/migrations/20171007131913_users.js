exports.up = async (knex) => {
  await knex.schema.createTableIfNotExists("users", (table) => {
    table.increments();
    table.string('username').unique();
    table.string('password');
    table.timestamps(true, true);
  });
};

exports.down = async(knex) => {
  await knex.schema.dropTableIfExists("users");
};
