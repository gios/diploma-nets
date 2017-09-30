exports.up = async (knex) => {
  await knex.schema.createTableIfNotExists("link_connections", (table) => {
    table.increments();
    table.integer('pinnacle_id').unsigned();
    table.foreign('pinnacle_id').references('pinnacles.id')
    table.integer('transition_id').unsigned();
    table.foreign('transition_id').references('transitions.id')
    table.integer('from');
    table.integer('value');
    table.timestamps(true, true);
  });

  await knex("link_connections").insert([
    { pinnacle_id: 1, transition_id: 1, from: 1, value: 1 },
    { pinnacle_id: 2, transition_id: 2, from: 1, value: 1 },
    { pinnacle_id: 3, transition_id: 3, from: 1, value: 1 },
    { pinnacle_id: 4, transition_id: 4, from: 1, value: 1 },
    { pinnacle_id: 5, transition_id: 5, from: 1, value: 1 },
    { pinnacle_id: 6, transition_id: 6, from: 1, value: 1 },

    { pinnacle_id: 1, transition_id: 1, from: 2, value: 1 },
    { pinnacle_id: 2, transition_id: 2, from: 2, value: 1 },
    { pinnacle_id: 3, transition_id: 3, from: 2, value: 1 },
    { pinnacle_id: 4, transition_id: 4, from: 2, value: 1 },
    { pinnacle_id: 5, transition_id: 5, from: 2, value: 1 },
    { pinnacle_id: 6, transition_id: 6, from: 2, value: 1 },

    { pinnacle_id: 7, transition_id: 1, from: 2, value: 265 },
    { pinnacle_id: 8, transition_id: 2, from: 2, value: 277 },
    { pinnacle_id: 9, transition_id: 3, from: 2, value: 561 },
    { pinnacle_id: 10, transition_id: 4, from: 2, value: 898 },
    { pinnacle_id: 11, transition_id: 5, from: 2, value: 352 },
    { pinnacle_id: 12, transition_id: 6, from: 2, value: 39 },

    { pinnacle_id: 7, transition_id: 7, from: 1, value: 548 },
    { pinnacle_id: 8, transition_id: 8, from: 1, value: 847 },
    { pinnacle_id: 8, transition_id: 9, from: 1, value: 52 },
    { pinnacle_id: 9, transition_id: 7, from: 1, value: 276 },
    { pinnacle_id: 10, transition_id: 7, from: 1, value: 232 },
    { pinnacle_id: 11, transition_id: 7, from: 1, value: 55 },
    { pinnacle_id: 12, transition_id: 8, from: 1, value: 401 },
    { pinnacle_id: 12, transition_id: 9, from: 1, value: 399 },

    { pinnacle_id: 13, transition_id: 7, from: 2, value: 55 },
    { pinnacle_id: 14, transition_id: 8, from: 2, value: 401 },
    { pinnacle_id: 15, transition_id: 9, from: 2, value: 52 },

    { pinnacle_id: 13, transition_id: 10, from: 1, value: 962 },
    { pinnacle_id: 14, transition_id: 11, from: 1, value: 846 },
    { pinnacle_id: 15, transition_id: 12, from: 1, value: 91 },

    { pinnacle_id: 16, transition_id: 10, from: 2, value: 816 },
    { pinnacle_id: 17, transition_id: 11, from: 2, value: 570 },
    { pinnacle_id: 18, transition_id: 12, from: 2, value: 575 },

    { pinnacle_id: 16, transition_id: 13, from: 1, value: 620 },
    { pinnacle_id: 16, transition_id: 14, from: 1, value: 846 },
    { pinnacle_id: 16, transition_id: 16, from: 1, value: 202 },
    { pinnacle_id: 17, transition_id: 14, from: 1, value: 332 },
    { pinnacle_id: 18, transition_id: 15, from: 1, value: 104 },
    { pinnacle_id: 18, transition_id: 16, from: 1, value: 803 },

    { pinnacle_id: 19, transition_id: 13, from: 2, value: 620 },
    { pinnacle_id: 20, transition_id: 14, from: 2, value: 332 },
    { pinnacle_id: 21, transition_id: 15, from: 2, value: 104 },
    { pinnacle_id: 22, transition_id: 16, from: 2, value: 202 },

    { pinnacle_id: 16, transition_id: 17, from: 1, value: 771 },
    { pinnacle_id: 17, transition_id: 18, from: 1, value: 901 },
    { pinnacle_id: 18, transition_id: 19, from: 1, value: 957 },

    { pinnacle_id: 23, transition_id: 17, from: 2, value: 771 },
    { pinnacle_id: 24, transition_id: 18, from: 2, value: 901 },
    { pinnacle_id: 25, transition_id: 19, from: 2, value: 957 },
  ]);
};

exports.down = async(knex) => {
  await knex.schema.dropTableIfExists("link_connections");
};
