import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 8081;

app.post(`/`, (req: Request, res: Response) => {
  return res.send(`Service now running on port : ${port}`);
});

app.listen(port, () => {
  console.log(`Service now listening to port : ${port}`);
});

// let db = new sqlite.Database({ filename: "/assets/db.db", driver });
