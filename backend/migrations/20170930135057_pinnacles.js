exports.up = async (knex) => {
  await knex.schema.createTableIfNotExists("pinnacles", (table) => {
    table.increments();
    table.string("name").notNullable();
    table.integer("value");
    table.timestamps(true, true);
  });

  await knex("pinnacles").insert([
    { name: "Ingredient 1", value: 0 },
    { name: "Ingredient 2", value: 0 },
    { name: "Ingredient 3", value: 0 },
    { name: "Ingredient 4", value: 0 },
    { name: "Ingredient 5", value: 0 },
    { name: "Ingredient 6", value: 0 },
    { name: "Construction 1", value: 0 },
    { name: "Construction 2", value: 0 },
    { name: "Construction 3", value: 0 },
    { name: "Product 1", value: 0 },
    { name: "Product 2", value: 0 },
    { name: "Product 3", value: 0 },
    { name: "Shop 1", value: 0 },
    { name: "Shop 2", value: 0 },
    { name: "Shop 3", value: 0 },
    { name: "Shop 4", value: 0 }
  ]);
};

exports.down = async(knex) => {
  await knex.schema.dropTableIfExists("pinnacles");
};
