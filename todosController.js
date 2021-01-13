const createError = require("http-errors");

let todoList = [];
let idno = 0;

exports.index = function (req, res) {
  res.send({ key: "item", arr: todoList });
};

exports.create = function (req, res, next) {
  console.log(req);
  console.log(res);
  if (!req.body.name) {
    return next(createError(400, "name is required"));
  }
  todoList.push({ id: idno, name: req.body.name });
  res.send({ result: true });
  idno++;
};

exports.show = function (req, res, next) {
  const todoItem = todoList.find((todo) => todo.id == req.params.id);
  if (!todoItem) {
    return next(createError(404, "no todo with that id"));
  }
  res.send(todoItem);
};

exports.delete = function (req, res, next) {
  const todoItem = todoList.find((todo) => todo.id == req.params.id);
  if (!todoItem) {
    return next(createError(404, "no todo with that id"));
  }
  todoList = todoList.filter((todo) => todo.id != req.params.id);
  res.send({ result: true });
};

exports.update = function (req, res, next) {
  const todoItem = todoList.find((todo) => todo.id == req.params.id);
  if (!req.body.name) {
    return next(createError(400, "name is required"));
  }
  if (!todoItem) {
    return next(createError(404, "no todo with that id"));
  }
  todoList = todoList.map((todo) => {
    if (todo.id == req.params.id) {
      todo.name = req.body.name;
    }
    return todo;
  });
  res.send({ result: true });
};
