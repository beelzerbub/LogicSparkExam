import { from, throwError } from "rxjs";
import { get } from "../models/dbHelper";
import { IProduct } from "../models/productData";

const tableName = "products";

const handleError = (message: string) => {
  return throwError({ message }).toPromise();
};

export const getProduct = (condition: IProduct) => {
  try {
    return from(get(tableName, condition)).toPromise();
  } catch (err) {
    return handleError(err.message);
  }
};
