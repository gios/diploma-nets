exports.up = async (knex) => {
  await knex.schema.createTableIfNotExists("net_records_history", (table) => {
    table.increments();
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('users.id');
    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("net_records_history");
};
