import { from } from "rxjs";

import { db, handleError } from "../models/dbHelper";
import { IProduct } from "../models/productData";
import { categoryTableName } from "./categoryController";
import { productGroupTableName, productTableName } from "./productController";

export const getMovies = (condition: IProduct) => {
  try {
    const result =
      Object.keys(condition).length > 0
        ? from(
            db(productGroupTableName)
              .join(
                productTableName,
                `${productTableName}.id`,
                `${productGroupTableName}.product_id`
              )
              .join(
                categoryTableName,
                `${categoryTableName}.id`,
                `${productGroupTableName}.category_id`
              )
              .select(
                `${productTableName}.id`,
                `${productTableName}.product_name`,
                db.raw(
                  `GROUP_CONCAT(${categoryTableName}.category_name) as 'Category Name'`
                )
              )
              .where({ ...condition })
              .groupBy(`${productTableName}.id`)
              .debug(true)
          ).toPromise()
        : from(
            db(productGroupTableName)
              .join(
                productTableName,
                `${productTableName}.id`,
                `${productGroupTableName}.product_id`
              )
              .join(
                categoryTableName,
                `${categoryTableName}.id`,
                `${productGroupTableName}.category_id`
              )
              .select(
                `${productTableName}.id`,
                `${productTableName}.product_name`,
                db.raw(
                  `GROUP_CONCAT(${categoryTableName}.category_name) as 'Category Name'`
                )
              )
              .groupBy(`${productTableName}.id`)
              .debug(true)
          ).toPromise();
    return result;
  } catch (err) {
    return handleError(err.message);
  }
};
