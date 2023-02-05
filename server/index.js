const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/api/v1", (req, res) => {
  console.log(res,req)
  res.send({ data: "hello !!!!"});
});

app.post("/api/v1", (req, res) => {
  const {data} = req.body;
  console.log(req.body, '---');
  // const id = req.body.id;
  res.send({
    data: data,
    message: "data sent.",
  });
});

module.exports = app;

app.listen(PORT, () => console.log(`start listening on port : ${PORT}`));
