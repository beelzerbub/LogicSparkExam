const { from } = require("rxjs");
const { switchMap } = require("rxjs/operators");
exports.up = function (knex) {
  const createTable = () => {
    return from(
      knex.schema.createTable("products", (table) => {
        table.increments("id").primary();
        table.string("product_name", 50).notNullable();
        table.unique("product_name");
        table.timestamp("create_at").notNullable().defaultTo(knex.fn.now());
        table.timestamp("update_at").notNullable().defaultTo(knex.fn.now());
      })
    );
  };

  const addInitialData = () => {
    return knex("products").insert([
      {
        product_name: "Shadow in the Cloud",
      },
      {
        product_name: "The White Tiger",
      },
      {
        product_name: "Locked Down",
      },
      {
        product_name: `No Man's Land`,
      },
    ]);
  };

  return createTable()
    .pipe(switchMap(() => addInitialData()))
    .toPromise();
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("products");
};
