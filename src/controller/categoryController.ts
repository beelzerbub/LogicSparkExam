import { from } from "rxjs";
import { CategoryData, ICategory } from "../models/categoryData";
import { add } from "../models/dbHelper";

const tableName = "categories";

export const addCategory = (input: ICategory) => {
  const data = new CategoryData(input);
  const result = add(tableName, data);
  return result;
};
