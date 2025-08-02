import express from "express";
import { httpServerHandler } from "cloudflare:node";

const app = express();

app.get("/", (req, res) => {
  res.send("hello from express.js running on cloudflare workers");
});

app.listen(8080);

export default httpServerHandler({ port: 8080 });