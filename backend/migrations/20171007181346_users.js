exports.up = async (knex) => {
  await knex.schema.createTableIfNotExists("users", (table) => {
    table.increments();
    table.string("username").unique();
    table.string("password");
    table.timestamps(true, true);
  });

  await knex("users").insert({ username: "vandamme", password: "6549853bfc2e4729fed3cb054d2f170d" });
};

exports.down = async(knex) => {
  await knex.schema.dropTableIfExists("users");
};
