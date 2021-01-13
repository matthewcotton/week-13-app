const express = require("express");
const router = express.Router();
const todos = require("./todosController");

/* GET home page */
router.get("/todo", todos.index);
router.post("/todo/create", todos.create);
router.get("/todo/:id", todos.show);
router.delete("/todo/:id", todos.delete);
router.put("/todo/:id", todos.update);

module.exports = router;
