class App {
  constructor() {
    this.todoList = JSON.parse(localStorage.getItem("todos")) || [];
  }

  addTodo(todo) {
    this.todoList.push(todo);
    this.saveTodos();
  }

  getTodos() {
    return this.todoList;
  }

  saveTodos() {
    localStorage.setItem("todos", JSON.stringify(this.todoList));
  }
}

class ToDo extends App {
  constructor() {
    super();
    this.todoInput = document.getElementById("todoInput");
    this.statusSelect = document.getElementById("statusSelect");
    this.todoPlanElem = document
      .getElementById("todoPlan")
      .querySelector(".todos");
    this.todoInProgressElem = document
      .getElementById("todoInProgress")
      .querySelector(".todos");
    this.todoDoneElem = document
      .getElementById("todoDone")
      .querySelector(".todos");
    this.addButton = document.getElementById("addButton");
    this.addButton.addEventListener("click", this.addTodoHandler.bind(this));
    this.updateTodoList();
  }

  addTodoHandler() {
    const todoText = this.todoInput.value;
    if (!todoText) return;

    const status = this.statusSelect.value;
    const statusMap = {
      plan: "План",
      inProgress: "В процесi",
      done: "Виконано",
    };
    const todoItem = { text: todoText, status: statusMap[status] };
    this.todoInput.value = "";

    this.addTodo(todoItem);
    this.updateTodoList();
  }

  updateTodoList() {
    this.todoPlanElem.innerHTML = "";
    this.todoInProgressElem.innerHTML = "";
    this.todoDoneElem.innerHTML = "";

    this.getTodos().forEach((todoItem) => {
      const listItem = document.createElement("li");
      listItem.textContent = todoItem.text;
      listItem.setAttribute("data-status", todoItem.status);

      if (todoItem.status === "План") {
        this.todoPlanElem.appendChild(listItem);
      } else if (todoItem.status === "В процесi") {
        this.todoInProgressElem.appendChild(listItem);
      } else if (todoItem.status === "Виконано") {
        this.todoDoneElem.appendChild(listItem);
      }
    });
  }
}

const todoApp = new ToDo();
