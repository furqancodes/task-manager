const express = require("express");
const tasks = require("../models/tasks");
const router = new express.Router();

//--------------tasks crud----------------
//-------------------------create---------
router.post("/tasks", async (req, res) => {
  const createTasks = new tasks(req.body);
  try {
    await createTasks.save();
    res.status(201).send(createTasks);
  } catch (createTaskError) {
    res.status(400).send(createTaskError);
  }
});
//-------------------------read all---------
router.get("/tasks", async (req, res) => {
  try {
    const readAllTasks = await tasks.find({});
    readAllTasks
      ? res.status(200).send(readAllTasks)
      : res.status(404).send("task not found");
  } catch (readAllTaskError) {
    res.status(500).send(readAllTaskError);
  }
});
//-------------------------read one---------
router.get("/tasks/:taskid", async (req, res) => {
  try {
    const readTask = await tasks.findById({ _id: req.params.taskid });
    readTask
      ? res.status(200).send(readTask)
      : res.status(404).send("task not found");
  } catch (readTaskError) {
    res.status(500).send(readTaskError);
  }
});
//---------------------------update---------
router.patch("/tasks/:taskid", async (req, res) => {
  const taskUpdatesKeys = Object.keys(req.body);
  const allowedTaskUpdates = ["description", "completed"];
  const isUpdateValid = taskUpdatesKeys.every((taskUpdate) =>
    allowedTaskUpdates.includes(taskUpdate)
  );

  if (!isUpdateValid) {
    return res.status(400).send("ERROR ! Invalid Update");
  }
  try {
    const taskUpdate = await tasks.findById(req.params.taskid);
    taskUpdatesKeys.forEach((task) => {
      taskUpdate[task] = req.body[task];
    });
    await taskUpdate.save();
    taskUpdate
      ? res.status(200).send(taskUpdate)
      : res.status(404).send("task not found");
  } catch (updateTaskError) {
    res.status(400).send(updateTaskError);
  }
});
//-------------delete--------------------
router.delete("/tasks/:taskid", async (req, res) => {
  try {
    const taskDelete = await tasks.findByIdAndDelete(req.params.taskid);
    if (!taskDelete) {
      res.status(404).send("not found");
    }
    res.send(taskDelete);
  } catch (taskDeleteError) {
    res.status(500).send(taskDeleteError);
  }
});
module.exports = router;
