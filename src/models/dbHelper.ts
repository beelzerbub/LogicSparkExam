import knex from "knex";
import config from "../../knexfile";
// import { CategoryData, ICategory } from "./categoryData";

const db = knex(config.development);

export const get = async <T>(table: string, condition: T) => {
  console.log({ condition });
  const result =
    Object.keys(condition).length > 0
      ? await db(table)
          .where({ ...condition })
          .debug(!!process.env.DEV)
      : await db(table).debug(!!process.env.DEV);
  return result;
};

export const add = async <T>(table: string, data: T) => {
  const [id] = await db(table).insert(data).debug(!!process.env.DEV);
  return id;
};

export const getAll = () => {
  return db("categories");
};

export const update = async <T>(table: string, id: number, data: T) => {
  const result = await db(table)
    .where({ id })
    .update({ ...data })
    .debug(!!process.env.DEV);

  return result;
};

export const remove = async (table: string, id: number) => {
  const result = await db(table).where({ id }).del().debug(!!process.env.DEV);
  return result;
};
