import { concat, from, of } from "rxjs";
import { catchError, concatMap, map, tap, toArray } from "rxjs/operators";
import { CategoryData, ICategory } from "../models/categoryData";
import { add } from "../models/dbHelper";

const tableName = "categories";

export const addCategory = (input: ICategory | ICategory[]) => {
  let result: Promise<
    Array<
      | {
          id: number;
          category_name: string;
        }
      | {
          error: string;
        }
    >
  >;
  result = from(Array.isArray(input) ? input : [input])
    .pipe(
      concatMap((each: ICategory) => {
        const data = new CategoryData(each);
        return from(add(tableName, data))
          .pipe(
            map((queryResult) => ({
              id: queryResult,
              category_name: data.category_name,
            })),
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
};
