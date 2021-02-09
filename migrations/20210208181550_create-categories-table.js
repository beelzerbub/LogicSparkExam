exports.up = function (knex) {
  return knex.schema
    .createTable("categories", (table) => {
      table.increments("id").primary();
      table.string("category_name", 50).notNullable();
      table.timestamp("create_at").notNullable().defaultTo(knex.fn.now());
      table.timestamp("update_at").notNullable().defaultTo(knex.fn.now());
    })
    .createTable("products", (table) => {
      table.increments("id").primary();
      table.string("product_name", 50).notNullable();
      table.integer("product_group_id").unsigned();
      table.timestamp("create_at").notNullable().defaultTo(knex.fn.now());
      table.timestamp("update_at").notNullable().defaultTo(knex.fn.now());
    })
    .createTable("product_groups", (table) => {
      table.increments("id").primary();
      table.integer("product_id").unsigned();
      table.integer("categories_id").unsigned();
      table
        .foreign("product_id")
        .references("id")
        .inTable("products")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .foreign("categories_id")
        .references("id")
        .inTable("categories")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.timestamp("create_at").notNullable().defaultTo(knex.fn.now());
      table.timestamp("update_at").notNullable().defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("product_groups")
    .dropTableIfExists("products")
    .dropTableIfExists("categories");
};
