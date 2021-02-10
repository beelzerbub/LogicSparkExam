const { from, of, zip, combineLatest, concat } = require("rxjs");
const {
  tap,
  switchMap,
  bufferCount,
  toArray,
  map,
  mergeAll,
  mergeMap,
  concatMap,
} = require("rxjs/operators");

exports.up = function (knex) {
  const createTable = () => {
    return from(
      knex.schema.createTable("product_groups", (table) => {
        table.increments("id").primary();
        table.integer("product_id").unsigned();
        table.integer("category_id").unsigned();
        table
          .foreign("product_id")
          .references("id")
          .inTable("products")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
        table
          .foreign("category_id")
          .references("id")
          .inTable("categories")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
        table.timestamp("create_at").notNullable().defaultTo(knex.fn.now());
        table.timestamp("update_at").notNullable().defaultTo(knex.fn.now());
      })
    );
  };

  const findProductByName = async (product) => {
    const [result] = await knex("products").where("product_name", product);
    return result ? result.id : null;
  };

  const findCategoryByName = async (category) => {
    const [result] = await knex("categories").where("category_name", category);
    return result ? result.id : null;
  };

  const addInitialData = () => {};

  return createTable()
    .pipe(
      switchMap(() =>
        from([
          {
            product: "Shadow in the Cloud 2",
            categories: "Action,Horror",
          },
          {
            product: "The White Tiger",
            categories: "Drama",
          },
          {
            product: "Locked Down",
            categories: "Romantic,Comedy",
          },
          {
            product: `No Man's Land`,
            categories: "Western",
          },
        ]).pipe(
          concatMap(async (each) => {
            const productID = await findProductByName(each.product);
            const categoryList = each.categories.split(",");
            return from(categoryList)
              .pipe(
                concatMap(async (category) => {
                  const categoryID = await findCategoryByName(category);
                  return { productID, categoryID };
                })
              )
              .toPromise();
          })
        )
      )
    )
    .toPromise();
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("product_groups");
};
