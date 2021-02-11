import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import {
  addCategory,
  deleteCategory,
  updateCategory,
} from "./controller/categoryController";
import { ICategory } from "./models/categoryData";
import { getAll } from "./models/dbHelper";
const app = express();
const port = process.env.PORT || 8081;

app.use(bodyParser.json());

app.post(`/`, (req: Request, res: Response) => {
  return res.send(`Service now running on port : ${port}`);
});

app.get("/api/categories", (req: Request, res: Response) => {
  getAll()
    .then((categories: ICategory[]) => {
      res.status(200).json(categories);
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

app.post("/api/category/", (req: Request, res: Response) => {
  addCategory(req.body)
    .then((result) => res.status(200).json(result))
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

app.put("/api/category/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  updateCategory(id, req.body)
    .then((result) => res.status(200).json(result))
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

app.delete("/api/category/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  deleteCategory(id)
    .then((result) => res.status(200).json(result))
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

app.use(({}, res, {}) => {
  res.status(404).send({ message: `Service Not Found` });
});

app.listen(port, () => {
  console.log(`Service now listening to port : ${port}`);
});
