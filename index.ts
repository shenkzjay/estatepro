import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(5005, () => {
  console.log(`listening on port 5005`);
});