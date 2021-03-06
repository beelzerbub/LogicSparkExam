import knex from "knex";
import { throwError } from "rxjs";

import config from "../../knexfile";

export const db = knex(config.development);

export const get = async <T>(table: string, condition: T) => {
  const result =
    Object.keys(condition).length > 0
      ? await db(table)
          .where({ ...condition })
          .debug(!!process.env.DEV)
      : await db(table).debug(!!process.env.DEV);
  return result;
};

export const join = async <T>(
  primaryTable: string,
  foreignTable: Array<{
    tableName: string;
    pkColumnName: string;
    operator: string;
    fkColumnName: string;
  }>,
  condition: T
) => {
  const result =
    Object.keys(condition).length > 0
      ? await db(primaryTable)
      : await db(primaryTable).where({ ...condition });
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

export const handleError = (message: string) => {
  return throwError({ message }).toPromise();
};
