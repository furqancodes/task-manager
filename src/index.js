// required filese
const express = require("express");
const bcryptjs = require("bcryptjs");
require("./db/mongoose");
const tasksRouters = require("./routers/tasks");
const usersRouters = require("./routers/users");

//configuiration
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
//----routers
app.use(usersRouters);
app.use(tasksRouters);

//------------listener
app.listen(port, () => {
  console.log("listening on port ", port);
});
//-----------bcrypting password before saving------------------
const bcryptor = async () => {
  const password = "poop";
  const hashedPassword = await bcryptjs.hash(password, 8);
  console.log(hashedPassword);
  const isMatch = await bcryptjs.compare("poop", hashedPassword);
  console.log(isMatch);
};
