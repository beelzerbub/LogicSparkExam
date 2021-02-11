import { from, of, throwError } from "rxjs";
import { catchError, concatMap, map, tap, toArray } from "rxjs/operators";
import { CategoryData, ICategory } from "../models/categoryData";
import { add, get, remove, update } from "../models/dbHelper";
import moment from "moment";

const tableName = "categories";

const handleError = (message: string) => {
  return throwError({ message }).toPromise();
};

export const getCategory = (condition: ICategory) => {
  try {
    return from(get(tableName, condition)).toPromise();
  } catch (err) {
    return handleError(err.message);
  }
};

export const addCategory = (input: ICategory | ICategory[]) => {
  try {
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
  } catch (err) {
    return handleError(err.message);
  }
};

export const updateCategory = (id: number, input: ICategory) => {
  try {
    const data = new CategoryData(input);
    data.setUpdateAt(moment().format("YYYY-MM-DD HH:mm:ss"));
    return from(update(tableName, id, data))
      .pipe(catchError((err) => of({ error: err.message })))

      .toPromise();
  } catch (err) {
    return handleError(err.message);
  }
};

export const deleteCategory = (id: number) => {
  try {
    return remove(tableName, id);
  } catch (err) {
    return handleError(err.message);
  }
};
