// required filese
const express = require("express");
// const jwt = require("jsonwebtoken");
require("./db/mongoose");
const tasksRouters = require("./routers/tasks");
const usersRouters = require("./routers/users");

//configuiration
const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//   if (req) {
//     res.status(503).send("site is temporrarly down for the moment");
//   }
//   next();
// });

app.use(express.json());
//----routers
app.use(usersRouters);
app.use(tasksRouters);

//------------listener
app.listen(port, () => {
  console.log("listening on port ", port);
});
//-----------bcrypting password before saving------------------
// const sideFunction = async () => {};
