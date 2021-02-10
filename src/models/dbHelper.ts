import knex from "knex";
import config from "../../knexfile";
import { CategoryData, ICategory } from "./categoryData";
const db = knex(config.development);

export const add = async (data: ICategory) => {
  const category = new CategoryData(data);
  const [id] = await db("categories").insert(category);
  return id;
};

export const getAll = () => {
  return db("categories");
};

const update = () => {};

const remove = () => {};
