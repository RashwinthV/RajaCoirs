const express = require("express");
require("dotenv").config();
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();


const Users = createProxyMiddleware({
  target: "https://rajacoirs-userservice.onrender.com",
  changeOrigin: true,
  onProxyRes: function (proxyRes, req, res) {
    const allowedOrigins = [
      "http://localhost:5173",
      "https://rajacoirs.onrender.com"
    ];
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
      proxyRes.headers["Access-Control-Allow-Origin"] = origin;
      proxyRes.headers["Access-Control-Allow-Credentials"] = "true";
      proxyRes.headers["Access-Control-Allow-Headers"] =
        "Origin, X-Requested-With, Content-Type, Accept, Authorization";
      proxyRes.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS";
    }
  },
});
const gallery = createProxyMiddleware({
  target: "https://rajacoirs-gallery.onrender.com",
  changeOrigin: true,
  onProxyRes: function (proxyRes, req, res) {
    const allowedOrigins = [
      "http://localhost:5173",
      "https://rajacoirs.onrender.com"
    ];
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
      proxyRes.headers["Access-Control-Allow-Origin"] = origin;
      proxyRes.headers["Access-Control-Allow-Credentials"] = "true";
      proxyRes.headers["Access-Control-Allow-Headers"] =
        "Origin, X-Requested-With, Content-Type, Accept, Authorization";
      proxyRes.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS";
    }
  },
});


const corsOptions = {
  origin: ["http://localhost:5173", "https://rajacoirs.onrender.com","http://localhost:5174"],
  credentials: true,
};
app.use(cors(corsOptions));


app.use("/v1", Users);
app.use('/v2',gallery)


const port = process.env.port||3050;

app.listen(port, () => {
  console.log(`Gateway is runnning in port ${port}`);
});
