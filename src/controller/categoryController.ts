import { from, of } from "rxjs";
import { catchError, concatMap, map, tap, toArray } from "rxjs/operators";
import { CategoryData, ICategory } from "../models/categoryData";
import { add, update } from "../models/dbHelper";
import moment from "moment";

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

export const updateCategory = (id: number, input: ICategory) => {
  const data = new CategoryData(input);
  data.setUpdateAt(moment().format("YYYY-MM-DD HH:mm:ss"));
  return from(update(tableName, id, data)).toPromise();
};
