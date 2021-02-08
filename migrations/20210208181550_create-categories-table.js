exports.up = function (knex) {
  return knex.schema.createTable("categories", (tbl) => {
    tbl.increments("id").primary();
    tbl.string("category_name", 50).notNullable();
    tbl.timestamp("create_at").notNullable().defaultTo(knex.fn.now());
    tbl.timestamp("update_at").notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {};
