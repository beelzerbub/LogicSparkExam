const { from } = require("rxjs");
const { switchMap } = require("rxjs/operators");

exports.up = function (knex) {
  const createTable = () => {
    return from(
      knex.schema.createTable("categories", (table) => {
        table.increments("id").primary();
        table.string("category_name", 50).notNullable();
        table.unique("category_name");
        table.timestamp("create_at").notNullable().defaultTo(knex.fn.now());
        table.timestamp("update_at").notNullable().defaultTo(knex.fn.now());
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
  // .subscribe({
  //   next: (res) => console.log("next", res),
  //   error: (e) => console.log("error", e),
  // });
  // return knex.schema
  //   .createTable("categories", (table) => {
  //     table.increments("id").primary();
  //     table.string("category_name", 50).notNullable();
  //     table.unique("category_name");
  //     table.timestamp("create_at").notNullable().defaultTo(knex.fn.now());
  //     table.timestamp("update_at").notNullable().defaultTo(knex.fn.now());
  //   })
  //   .createTable("products", (table) => {
  //     table.increments("id").primary();
  //     table.string("product_name", 50).notNullable();
  //     table.unique("product_name");
  //     table.integer("product_group_id").unsigned();
  //     table.timestamp("create_at").notNullable().defaultTo(knex.fn.now());
  //     table.timestamp("update_at").notNullable().defaultTo(knex.fn.now());
  //   })
  //   .createTable("product_groups", (table) => {
  //     table.increments("id").primary();
  //     table.integer("product_id").unsigned();
  //     table.integer("categories_id").unsigned();
  //     table
  //       .foreign("product_id")
  //       .references("id")
  //       .inTable("products")
  //       .onDelete("CASCADE")
  //       .onUpdate("CASCADE");
  //     table
  //       .foreign("categories_id")
  //       .references("id")
  //       .inTable("categories")
  //       .onDelete("CASCADE")
  //       .onUpdate("CASCADE");
  //     table.timestamp("create_at").notNullable().defaultTo(knex.fn.now());
  //     table.timestamp("update_at").notNullable().defaultTo(knex.fn.now());
  //   });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("categories");
};

// .dropTableIfExists("product_groups")
// .dropTableIfExists("products")
