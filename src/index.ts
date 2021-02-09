import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { ICategory } from "./models/categoryData";
import { add, getAll } from "./models/dbHelper";
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
      console.error(error);
      res.status(500).json({ message: "Cannot get categories" });
    });
});

app.post("/api/category/", (req: Request, res: Response) => {
  add(req.body)
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Cannot add category" });
    });
});

app.listen(port, () => {
  console.log(`Service now listening to port : ${port}`);
});

// let db = new sqlite.Database({ filename: "/assets/db.db", driver });
