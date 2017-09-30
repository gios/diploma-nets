exports.up = async (knex) => {
  await knex.schema.createTableIfNotExists("link_connections", (table) => {
    table.increments();
    table.integer('pinnacle_id').unsigned().references('pinnacles.id')
    table.integer('transition_id').unsigned().references('transitions.id')
    table.integer('value');
    table.timestamps(true, true);
  });

  await knex("link_connections").insert([
    { transition_id: 1, pinnacle_id: 1, value: 265 },
    { transition_id: 2, pinnacle_id: 2, value: 277 },
    { transition_id: 3, pinnacle_id: 3, value: 561 },
    { transition_id: 4, pinnacle_id: 4, value: 898 },
    { transition_id: 5, pinnacle_id: 5, value: 352 },
    { transition_id: 6, pinnacle_id: 6, value: 39 },
    { transition_id: 7, pinnacle_id: 1, value: 548 },
    { transition_id: 8, pinnacle_id: 2, value: 847 },
    { transition_id: 9, pinnacle_id: 2, value: 52 },
    { transition_id: 7, pinnacle_id: 3, value: 276 },
    { transition_id: 7, pinnacle_id: 4, value: 232 },
    { transition_id: 7, pinnacle_id: 5, value: 55 },
    { transition_id: 8, pinnacle_id: 6, value: 401 },
    { transition_id: 9, pinnacle_id: 6, value: 399 },
    { transition_id: 7, pinnacle_id: 7, value: 55 },
    { transition_id: 8, pinnacle_id: 8, value: 401 },
    { transition_id: 9, pinnacle_id: 9, value: 52 },
    { transition_id: 10, pinnacle_id: 7, value: 962 },
    { transition_id: 11, pinnacle_id: 8, value: 846 },
    { transition_id: 12, pinnacle_id: 9, value: 91 },
    { transition_id: 10, pinnacle_id: 10, value: 816 },
    { transition_id: 11, pinnacle_id: 11, value: 570 },
    { transition_id: 12, pinnacle_id: 12, value: 575 },
    { transition_id: 13, pinnacle_id: 10, value: 620 },
    { transition_id: 14, pinnacle_id: 10, value: 846 },
    { transition_id: 16, pinnacle_id: 10, value: 202 },
    { transition_id: 14, pinnacle_id: 11, value: 332 },
    { transition_id: 15, pinnacle_id: 12, value: 104 },
    { transition_id: 16, pinnacle_id: 12, value: 803 },
    { transition_id: 13, pinnacle_id: 13, value: 620 },
    { transition_id: 14, pinnacle_id: 14, value: 332 },
    { transition_id: 15, pinnacle_id: 15, value: 104 },
    { transition_id: 16, pinnacle_id: 16, value: 202 }
  ]);
};

exports.down = async(knex) => {
  await knex.schema.dropTableIfExists("link_connections");
};
