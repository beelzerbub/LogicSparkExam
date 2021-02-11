const { from } = require("rxjs");
const { switchMap } = require("rxjs/operators");

exports.up = function (knex) {
  const createTable = () => {
    return from(
      knex.schema.createTable("categories", (table) => {
        table.increments("id").primary();
        table.string("category_name", 50).notNullable();
        table.unique("category_name");
        table.timestamp("create_at").defaultTo(knex.fn.now());
        table.timestamp("update_at").defaultTo(knex.fn.now());
      })
    );
  };

  const addInitialData = () => {
    return knex("categories").insert([
      { category_name: "Action" },
      { category_name: "Comedy" },
      { category_name: "Drama" },
      { category_name: "Fantasy" },
      { category_name: "Horror" },
      { category_name: "Mystery" },
      { category_name: "Romance" },
      { category_name: "Thriller" },
      { category_name: "Western" },
    ]);
  };

  return createTable()
    .pipe(switchMap(() => addInitialData()))
    .toPromise();
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("categories");
};
