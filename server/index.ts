import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, world!');
});
app.get('/test', (req, res) => {
  res.send('testing, world!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// import express from "express";
// // const express = require("express");
// const app = express();
// const fs = require("fs-extra");
// const path = require("path");
// const PORT = 5000;

// app.use(express.json());

// app.post("/api/v1", (req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5000");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

//   const formData = req.body;

//   fs.writeJsonFile(
//     path.resolve(__dirname, "./data/merged-AAAA.json"),
//     formData,
//   );

//   res.status(200).json({
//     status: "success",
//     sucess: true,
//     data: null,
//     message: null
//   })

//   // res.send({
//   //   data: null,
//   //   success: true,
//   //   message: null,
//   // });
// });

// module.exports = app;

// app.listen(PORT, () => console.log(`start listening on port : ${PORT}`));
