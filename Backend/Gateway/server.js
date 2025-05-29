const express = require("express");
require("dotenv").config();
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();


const Users = createProxyMiddleware({
  target: "http://localhost:3001",
  changeOrigin: true,
});

const gallery = createProxyMiddleware({
  target: "http://localhost:3002",
  changeOrigin: true,
});




app.use("/v1", Users);
app.use('/v2',gallery)
app.use(cors());

const port = process.env.port||3050;

app.listen(port, () => {
  console.log(`Gateway is runnning in port ${port}`);
});
