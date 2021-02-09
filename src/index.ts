import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { add } from "./models/dbHelper";
const app = express();
const port = process.env.PORT || 8081;

app.use(bodyParser.json());

app.post(`/`, (req: Request, res: Response) => {
  return res.send(`Service now running on port : ${port}`);
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
