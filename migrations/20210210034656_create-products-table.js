const { from } = require("rxjs");
const { switchMap } = require("rxjs/operators");
exports.up = function (knex) {
  const createTable = () => {
    return from(
      knex.schema.createTable("products", (table) => {
        table.increments("id").primary();
        table.string("product_name", 50).notNullable();
        table.unique("product_name");
        table.integer("product_group_id").unsigned();
        table.timestamp("create_at").notNullable().defaultTo(knex.fn.now());
        table.timestamp("update_at").notNullable().defaultTo(knex.fn.now());
      })
    );
  };

  return createTable().toPromise();
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("products");
};
