const express = require('express');
const router = express.Router();

const { addTodo } = require("../controllers/todos/addTodo.controller");
const { getTodo } = require("../controllers/todos/getTodo.controller");
const { deleteTodo } = require("../controllers/todos/deleteTodo.controller");
const { updateTodo } = require("../controllers/todos/updateTodo.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

router.post("/addTodo", authMiddleware, addTodo);
router.get("/getTodo", authMiddleware, getTodo);
router.delete("/deleteTodo", authMiddleware, deleteTodo);
router.put("/updateTodo", authMiddleware, updateTodo);

module.exports = router;
