exports.up = async (knex) => {
  await knex.schema.createTableIfNotExists("net_records", (table) => {
    table.increments();
    table.specificType('ids', 'integer[]');
    table.specificType('values', 'integer[]');
    table.integer('net_record_history_id').unsigned();
    table.foreign('net_record_history_id').references('net_records_history.id');
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('users.id');
    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("net_records");
};
