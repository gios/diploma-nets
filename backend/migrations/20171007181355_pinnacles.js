exports.up = async (knex) => {
  await knex.schema.createTableIfNotExists("pinnacles", (table) => {
    table.increments();
    table.string("name").notNullable();
    table.integer("value");
    table.integer("x");
    table.integer("y");
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('users.id');
    table.timestamps(true, true);
  });

  await knex("pinnacles").insert([
    { name: "State 1", value: 1, x: 100, y: 100, user_id: 1 },
    { name: "State 2", value: 1, x: 100, y: 200, user_id: 1 },
    { name: "State 3", value: 1, x: 100, y: 300, user_id: 1 },
    { name: "State 4", value: 1, x: 100, y: 400, user_id: 1 },
    { name: "State 5", value: 1, x: 100, y: 500, user_id: 1 },
    { name: "State 6", value: 1, x: 100, y: 600, user_id: 1 },
    { name: "Ingredient 1", value: 0, x: 450, y: 100, user_id: 1 },
    { name: "Ingredient 2", value: 0, x: 450, y: 200, user_id: 1 },
    { name: "Ingredient 3", value: 0, x: 450, y: 300, user_id: 1 },
    { name: "Ingredient 4", value: 0, x: 450, y: 400, user_id: 1 },
    { name: "Ingredient 5", value: 0, x: 450, y: 500, user_id: 1 },
    { name: "Ingredient 6", value: 0, x: 450, y: 600, user_id: 1 },
    { name: "Construction 1", value: 0, x: 850, y: 200, user_id: 1 },
    { name: "Construction 2", value: 0, x: 850, y: 350, user_id: 1 },
    { name: "Construction 3", value: 0, x: 850, y: 500, user_id: 1 },
    { name: "Product 1", value: 0, x: 1250, y: 200, user_id: 1 },
    { name: "Product 2", value: 0, x: 1250, y: 350, user_id: 1 },
    { name: "Product 3", value: 0, x: 1250, y: 500, user_id: 1 },
    { name: "Shop 1", value: 0, x: 1650, y: 100, user_id: 1 },
    { name: "Shop 2", value: 0, x: 1650, y: 250, user_id: 1 },
    { name: "Shop 3", value: 0, x: 1650, y: 400, user_id: 1 },
    { name: "Shop 4", value: 0, x: 1650, y: 550, user_id: 1 },
    { name: "Remainder 1", value: 0, x: 1650, y: 700, user_id: 1 },
    { name: "Remainder 2", value: 0, x: 1650, y: 850, user_id: 1 },
    { name: "Remainder 3", value: 0, x: 1650, y: 1000, user_id: 1 },
  ]);
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("pinnacles");
};
