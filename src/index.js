// required filese
const express = require("express");
const app = express();
require("./db/mongoose");
const tasksRouters = require("./routers/tasks");
const usersRouters = require("./routers/users");

//configuiration
const port = process.env.PORT || 3000;
app.use(express.json());
//----routers
app.use(usersRouters);
app.use(tasksRouters);

//------------listener
app.listen(port, () => {
  console.log("listening on port ", port);
});
