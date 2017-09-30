exports.up = async (knex) => {
  await knex.schema.createTableIfNotExists("transitions", (table) => {
    table.increments();
    table.string("name").notNullable();
    table.integer("time");
    table.timestamps(true, true);
  });

  await knex("transitions").insert([
    { name: "IT1", time: 3 },
    { name: "IT2", time: 12 },
    { name: "IT3", time: 66 },
    { name: "IT4", time: 22 },
    { name: "IT5", time: 77 },
    { name: "IT6", time: 10 },
    { name: "CT1", time: 13 },
    { name: "CT2", time: 13 },
    { name: "CT3", time: 8 },
    { name: "PT1", time: 4 },
    { name: "PT2", time: 5 },
    { name: "PT3", time: 6 },
    { name: "ST1", time: 26 },
    { name: "ST2", time: 20 },
    { name: "ST3", time: 22 },
    { name: "ST4", time: 35 }
  ]);
};

exports.down = async(knex) => {
  await knex.schema.dropTableIfExists("transitions");
};
