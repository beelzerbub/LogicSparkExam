const { log } = require("console");
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
  defaultIfEmpty,
  filter,
} = require("rxjs/operators");

const dummyData = [
  {
    name: "Shadow in the Cloud 2",
    categories: "Action,Horror",
  },
  {
    name: "The White Tiger",
    categories: "Drama",
  },
  {
    name: "Locked Down",
    categories: "Romantic,Comedy",
  },
  {
    name: `No Man's Land`,
    categories: "Western",
  },
];

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

  const addInitialData = (productID, categoryID) => {
    const result = knex("product_groups").insert({
      product_id: productID,
      category_id: categoryID,
    });
    return result;
  };

  return createTable()
    .pipe(
      switchMap(() =>
        from(dummyData).pipe(
          concatMap(async (product) => {
            const productID = await findProductByName(product.name);
            const categoryList = product.categories.split(",");
            return from(categoryList)
              .pipe(
                concatMap(async (category) => {
                  const categoryID = await findCategoryByName(category);
                  return { productID, categoryID, category_name: category };
                }),
                concatMap(async ({ productID, categoryID, category_name }) => {
                  if (productID && categoryID) {
                    const [id] = await addInitialData(productID, categoryID);
                    return {
                      product_group_id: id,
                      product_name: product.name,
                      category_name,
                    };
                  }
                  return {
                    error: `${
                      !productID && !categoryID
                        ? `${product.name} and ${category_name} not Found`
                        : !productID
                        ? `${product.name} not Found`
                        : `${category_name} not Found`
                    }`,
                  };
                }),
                bufferCount(categoryList.length)
              )
              .toPromise();
          }),
          filter((each) => each),
          toArray(),
          tap((res) => console.log("insert result : ", res))
        )
      )
    )
    .toPromise();
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("product_groups");
};
