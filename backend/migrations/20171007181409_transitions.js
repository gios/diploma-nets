exports.up = async (knex) => {
  await knex.schema.createTableIfNotExists("transitions", (table) => {
    table.increments();
    table.string("name").notNullable();
    table.integer("time");
    table.integer("x");
    table.integer("y");
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('users.id');
    table.timestamps(true, true);
  });

  await knex("transitions").insert([
    { name: "IT 1", time: 3, x: 300, y: 100, user_id: 1 },
    { name: "IT 2", time: 12, x: 300, y: 200, user_id: 1 },
    { name: "IT 3", time: 66, x: 300, y: 300, user_id: 1 },
    { name: "IT 4", time: 22, x: 300, y: 400, user_id: 1 },
    { name: "IT 5", time: 77, x: 300, y: 500, user_id: 1 },
    { name: "IT 6", time: 10, x: 300, y: 600, user_id: 1 },
    { name: "CT 1", time: 13, x: 700, y: 200, user_id: 1 },
    { name: "CT 2", time: 13, x: 700, y: 350, user_id: 1 },
    { name: "CT 3", time: 8, x: 700, y: 500, user_id: 1 },
    { name: "PT 1", time: 4, x: 1050, y: 200, user_id: 1 },
    { name: "PT 2", time: 5, x: 1050, y: 350, user_id: 1 },
    { name: "PT 3", time: 6, x: 1050, y: 500, user_id: 1 },
    { name: "ST 1", time: 26, x: 1450, y: 100, user_id: 1 },
    { name: "ST 2", time: 20, x: 1450, y: 250, user_id: 1 },
    { name: "ST 3", time: 22, x: 1450, y: 400, user_id: 1 },
    { name: "ST 4", time: 35, x: 1450, y: 550, user_id: 1 },
    { name: "RT 1", time: 35, x: 1450, y: 700, user_id: 1 },
    { name: "RT 2", time: 35, x: 1450, y: 850, user_id: 1 },
    { name: "RT 3", time: 35, x: 1450, y: 1000, user_id: 1 }
  ]);
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("transitions");
};
