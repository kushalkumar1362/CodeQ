const API_URL = "http://localhost:2003";

// Sections
const loginSection = document.getElementById("loginSection");
const signupSection = document.getElementById("signupSection");
const todoSection = document.getElementById("todoSection");

// Forms
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const addTodoForm = document.querySelector(".todo-form");

// Todo elements
const todoList = document.querySelector(".todo-list ul");
const addInput = document.getElementById("addInput");

let isEdit = false;
const apiRequest = async (endpoint, method, body = null) => {
  try {
    const options = {
      method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    };
    if (body) options.body = JSON.stringify(body);

    const response = await fetch(`${API_URL}${endpoint}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error during API request to ${endpoint}:`, error);
    return { success: false, message: error.message };
  }
};

async function showSection(newSectionID, currentSectionID) {
  if (currentSectionID) {
    document.getElementById(currentSectionID).style.display = "none";
  }
  document.getElementById(newSectionID).style.display = "flex";
  console.log("Section shown:", newSectionID);
}

const fetchTodos = async () => {
  const response = await apiRequest("/v1/todo/getTodo", "GET");
  if (response.success) {
    return response.todos;
  } else {
    if (response.message === "Unauthorized Request") {
      console.error("Failed to fetch todos:", response.message);
      alert("Please login first");
      showSection("loginSection", "todoSection");
    }
    return null;
  }
};

function createTodo(todo) {
  const li = document.createElement("li");

  const todoCheckbox = document.createElement("input");
  todoCheckbox.type = "checkbox";
  todoCheckbox.checked = todo.isCompleted;
  todoCheckbox.addEventListener("change", (event) => {
    updateTodoCompletion(todo.id, todoCheckbox.checked, event)
      .then((data) => { todo.isCompleted = data });
  });

  const todoData = document.createElement("input");
  todoData.type = "text";
  todoData.value = todo.todo;
  todoData.readOnly = true;
  todoData.classList.add("todo-data");

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.addEventListener("click", (event) => toggleEditMode(todo, todoData, editButton, event));

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", (event) => deleteTodo(todo.id, li, event));

  const todoButtons = document.createElement("div");
  todoButtons.append(editButton, deleteButton);

  li.append(todoCheckbox, todoData, todoButtons);
  todoList.prepend(li);
}

const deleteTodo = async (id, element, event) => {
  event.preventDefault();
  event.stopPropagation();
  const response = await apiRequest(`/v1/todo/deleteTodo?id=${id}`, "DELETE");
  if (response.success) {
    todoList.removeChild(element);
    console.log("Todo deleted successfully!");
  } else {
    console.error("Failed to delete todo:", response.message);
    alert("Failed to delete todo. Please try again.");
  }
};

const toggleEditMode = async (todo, inputElement, button, event) => {
  event.preventDefault();

  if (todo.isCompleted) {
    alert("You can't edit a completed todo.");
    return;
  }
  if (isEdit) {
    alert("You can edit one todo at a time");
    return;
  }
  isEdit = !isEdit;

  if (button.textContent === "Edit") {
    button.textContent = "Save";
    inputElement.readOnly = false;
    inputElement.focus();
  } else {
    button.textContent = "Edit";
    inputElement.readOnly = true;

    const updatedTodo = inputElement.value.trim();
    if (updatedTodo !== todo.todo) {
      const response = await apiRequest(`/v1/todo/updateTodo`, "PUT", { id: todo.id, todo: updatedTodo });
      if (response.success) {
        console.log("Todo updated successfully!");
      } else {
        console.error("Failed to update todo:", response.message);
        alert("Failed to update todo. Please try again.");
      }
    }
  }
};

const updateTodoCompletion = async (id, isCompleted, event) => {
  event.preventDefault();

  const response = await apiRequest(`/v1/todo/updateTodo`, "PUT", { id, isCompleted });
  if (response.success) {
    console.log("Todo completion status updated successfully!");
    return response.data.isCompleted;
  } else {
    console.error("Failed to update todo completion:", response.message);
    alert("Failed to update completion status. Please try again.");
    return isCompleted;
  }
};

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  const response = await apiRequest("/v1/users/signup", "POST", { email, password });
  if (response.success) {
    alert("Signup successful! Please login.");
    showSection("loginSection", "signupSection");
  } else {
    alert(response.message || "Signup failed!");
  }
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  const response = await apiRequest("/v1/users/login", "POST", { email, password });
  if (response.success) {
    const todos = await fetchTodos();
    if (todos) {
      todoList.innerHTML = "";
      todos.forEach(todo => createTodo(todo));
    }
    showSection("todoSection", "loginSection");
  } else {
    alert(response.message || "Login failed!");
  }
});

addTodoForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const inputValue = addInput.value.trim();
  if (inputValue === "") {
    alert("Please enter a todo.");
    return;
  }

  const response = await apiRequest("/v1/todo/addTodo", "POST", { todo: inputValue });
  if (response.success) {
    createTodo(response.data);
    console.log("Todo added successfully!");
    addInput.value = "";
  } else {
    console.error("Failed to add todo:", response.message);
    alert("Failed to add todo. Please try again.");
  }
});

document.getElementById('logout').addEventListener('click', async (event) => {
  event.preventDefault();

  const response = await apiRequest("/v1/users/logout", "GET");
  if (response.success) {
    console.log("Logout successful!");
    showSection("loginSection", "todoSection");
  } else {
    console.error("Logout failed:", response.message);
    alert("Failed to logout. Please try again.");
  }
});

window.addEventListener('load', async () => {
  const todos = await fetchTodos();
  if (todos === null) {
    showSection("loginSection", "todoSection");
    return;
  };
  if (todos.length > 0) {
    todos.forEach(todo => createTodo(todo));
  }
  console.log("Loads successfully!");
  showSection("todoSection", "loginSection");
});

