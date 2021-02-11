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

export const update = async <T>(table: string, target: number, data: T) => {
  const result = await db(table)
    .where({ id: target })
    .update({ ...data })
    .debug(!!process.env.DEV);

  return result;
};

const remove = () => {};
