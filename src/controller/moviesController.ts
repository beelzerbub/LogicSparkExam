import { handleError } from "../models/dbHelper";
import { IProduct } from "../models/productData";

export const getMovies = (condition: IProduct) => {
  try {
    return new Promise(() => 0);
  } catch (err) {
    return handleError(err.message);
  }
};
