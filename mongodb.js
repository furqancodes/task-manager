const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) {
      return console.log("error");
    }
    console.log("connected");
    const db = client.db(databaseName);
    db.collection("users")
      .deleteOne({ _id: new ObjectID("5fcbb5adac3bb8050c5cb30b") })
      .then((data) => {
        console.log(data.deletedCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }
);
