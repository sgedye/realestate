const express = require("express");
const app = express();
const fs = require("fs-extra");
const path = require("path");
const PORT = 5000;

app.use(express.json());

app.post("/api/v1", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  const formData = req.body;

  fs.writeJsonSync(
    path.resolve(__dirname, "./data/merged-AAAA.json"),
    formData,
    {
      spaces: 2,
    }
  );

  res.send({
    data: null,
    success: true,
    message: null,
  });
});

module.exports = app;

app.listen(PORT, () => console.log(`start listening on port : ${PORT}`));
