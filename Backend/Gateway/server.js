const express = require("express");
require("dotenv").config();
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();


const Users = createProxyMiddleware({
  target: "https://rajacoirs-userservice.onrender.com",
  changeOrigin: true,
});

const gallery = createProxyMiddleware({
  target: "http://localhost:3002",
  changeOrigin: true,
});

const corsOptions = {
  origin: ["http://localhost:5173", "https://rajacoirs.onrender.com"],
  credentials: true,
};
app.use(cors(corsOptions));


app.use("/v1", Users);
app.use('/v2',gallery)


const port = process.env.port||3050;

app.listen(port, () => {
  console.log(`Gateway is runnning in port ${port}`);
});
