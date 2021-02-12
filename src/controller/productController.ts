import { empty, from, of, throwError } from "rxjs";
import {
  catchError,
  concatAll,
  concatMap,
  map,
  mergeAll,
  tap,
  toArray,
} from "rxjs/operators";
import { CategoryData, ICategory } from "../models/categoryData";
import { add, get } from "../models/dbHelper";
import { IProduct, ProductData } from "../models/productData";
import { ProductGroupData, IProductGroup } from "../models/productGroupData";
import { addCategory, getCategory } from "./categoryController";

interface IProductReq {
  ["product_name"]: string;
  ["product_type"]: string;
}

export const productTableName = "products";
export const productGroupTableName = "product_groups";

const handleError = (message: string) => {
  return throwError({ message }).toPromise();
};

export const getProduct = (condition: IProduct) => {
  try {
    return from(get(productTableName, condition)).toPromise();
  } catch (err) {
    return handleError(err.message);
  }
};

export const addProduct = (input: IProductReq | Array<IProductReq>) => {
  try {
    let result: Promise<
      Array<
        | {
            product_group_id: number;
            product_name: string;
          }[]
        | {
            error: string;
          }
      >
    >;
    result = from(Array.isArray(input) ? input : [input])
      .pipe(
        concatMap((each: IProductReq) => {
          const { product_name, product_type } = each;
          const productData = new ProductData({
            product_name,
          } as IProduct);
          return from(add(productTableName, productData))
            .pipe(
              concatMap((addProductResult) => {
                const typeList = product_type
                  .split(",")
                  .map((each) => each.trim());
                return from(typeList)
                  .pipe(
                    concatMap((eachType) => {
                      return from(
                        getCategory({ category_name: eachType } as ICategory)
                      )
                        .pipe(
                          concatMap((queryResult: CategoryData[]) => {
                            if (queryResult.length > 0) {
                              return [
                                {
                                  id: queryResult[0].id,
                                  category_name: queryResult[0].category_name,
                                },
                              ];
                            } else {
                              const newCategory = new CategoryData({
                                category_name: eachType,
                              } as CategoryData);
                              return addCategory(newCategory);
                            }
                          }),
                          concatMap((categoryResult: any) => {
                            const productGroup = new ProductGroupData({
                              category_id: Array.isArray(categoryResult)
                                ? categoryResult[0].id
                                : categoryResult.id,
                              product_id: addProductResult,
                            } as IProductGroup);
                            return add(productGroupTableName, productGroup);
                          })
                        )
                        .toPromise();
                    }),
                    map((eachInsertResult) => {
                      return {
                        product_id: addProductResult,
                        product_group_id: eachInsertResult,
                        product_name: productData.product_name,
                      };
                    }),
                    toArray()
                  )
                  .toPromise();
              }),
              catchError((err) => {
                return of({ error: `${err.message}` });
              })
            )
            .toPromise();
        }),
        toArray(),
        tap((res) => {
          if (process.env.DEV) {
            console.log("insert result : ", res);
          }
        })
      )
      .toPromise();
    return result;
  } catch (err) {
    return handleError(err.message);
  }
};
