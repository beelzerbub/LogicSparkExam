import knex from "knex";
import config from "../../knexfile";
// import { CategoryData, ICategory } from "./categoryData";

const db = knex(config.development);

export const add = async <T>(table: string, data: T) => {
  const [id] = await db(table).insert(data).debug(!!process.env.DEV);
  return id;
};

export const getAll = () => {
  return db("categories");
};

const update = () => {};

const remove = () => {};
