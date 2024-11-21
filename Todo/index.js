const addTodo = document.getElementById("addTodo");
const addInput = document.getElementById("addInput");
const todoList = document.querySelector("ul");

const todos = JSON.parse(localStorage.getItem("todos")) || [];
todos.sort((a, b) => a.id - b.id);
let isEdit = false;
previousTodo();

function createTodo(todo) {
  const li = document.createElement("li");
  const todoCheckbox = document.createElement("input");
  const todoData = document.createElement("input");
  const todoButtons = document.createElement("div");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");

  todoCheckbox.type = "checkbox";
  todoCheckbox.checked = todo.isCompleted;
  todoCheckbox.addEventListener("change", () => {
    if (!todoData.readOnly) {
      alert("You can't completed todo while editing");
      todoCheckbox.checked = false;
      return;
    }
    todoData.style.textDecoration = todoCheckbox.checked ? "line-through" : "none";
    todo.isCompleted = todoCheckbox.checked;
    localStorage.setItem("todos", JSON.stringify(todos));
  })
  li.appendChild(todoCheckbox);

  todoData.type = "text"
  todoData.readOnly = true;
  todoData.classList.add("todo-data");
  todoData.value = todo.data;
  li.appendChild(todoData);

  editButton.textContent = "Edit";
  editButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (todo.isCompleted) {
      alert("You can't edit completed todo");
      return
    };
    if (isEdit && editButton.textContent !== "Save") {
      return;
    }
    isEdit = !isEdit;

    editButton.textContent = editButton.textContent === "Edit" ? "Save" : "Edit";
    todoData.readOnly = !todoData.readOnly;
    if (!todoData.readOnly) {
      todoData.focus();
    } else {
      todo.data = todoData.value;
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  });

  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", (event) => {
    event.preventDefault();
    const index = todos.findIndex((t) => t.id === todo.id);
    if (index > -1) {
      todos.splice(index, 1);
    }
    localStorage.setItem("todos", JSON.stringify(todos));
    todoList.removeChild(li);
  });

  todoButtons.appendChild(editButton);
  todoButtons.appendChild(deleteButton);
  li.appendChild(todoButtons);
  todoList.prepend(li);
}

// Array.forEach(callback)


function previousTodo() {
  
  todos.forEach((todo) => {
    console.log(todo)
    createTodo(todo);
  });
}

function addTodoToList(event) {
  event.preventDefault();
  const inputValue = addInput.value.trim();
  if (inputValue === "") return;

  const todo = {
    data: inputValue,
    id: Date.now(),
    isCompleted: false
  }

  createTodo(todo);

  addInput.value = "";
  todos.unshift(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

addTodo.addEventListener("click", addTodoToList);
