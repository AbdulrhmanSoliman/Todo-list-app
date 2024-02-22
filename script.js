// Declare all important variables
let input = document.querySelector(".input");
let taskBtn = document.querySelector(".submit");
let taskContainer = document.querySelector(".tasks");
let add = document.querySelector(".add");

let tasksArr = []; // final array which will receive each task

// Check if localStorage have a previous value or not

if (window.localStorage.getItem("DOMtasks")) {
  tasksArr = JSON.parse(window.localStorage.getItem("DOMtasks"));
  if (tasksArr.length > 0) {
    add.remove();
  }
  addTaskToArr(tasksArr);
}

taskBtn.onclick = function (e) {
  e.preventDefault();
  if (input.value !== "") {
    createTask(input.value);
    addTaskToLS(tasksArr);
    input.value = "";
    add.remove();
  }
};

function createTask(taskText) {
  let taskObj = {
    id: Date.now(),
    title: taskText,
    complete: false,
  };
  tasksArr.push(taskObj);
  addTaskToArr(tasksArr);
}

// add task to DOM using innerHTML

function addTaskToArr(tasksArr) {
  taskContainer.innerHTML = "";

  tasksArr.forEach((task) => {
    // Create HTML Elements
    let taskHolder = document.createElement("div");
    let taskName = document.createElement("p");
    let controls = document.createElement("div");
    let xIcon = document.createElement("i");
    let trashIcon = document.createElement("i");
    let edit = document.createElement("i");

    // Assign className to elements
    taskHolder.className = "task";
    taskHolder.setAttribute("data-id", task.id);
    controls.className = "controls";
    trashIcon.className = "fa-solid fa-trash-can";
    xIcon.className = "fa-solid fa-circle-xmark";
    edit.className = "fa-solid fa-pen-to-square";

    // Assign Values to each Task
    taskName.innerHTML = task.title;

    // Append each element to the DOM
    taskContainer.appendChild(taskHolder);
    taskHolder.appendChild(taskName);
    taskHolder.appendChild(controls);
    controls.appendChild(xIcon);
    controls.appendChild(edit);
    controls.appendChild(trashIcon);

    //function to delete or update task from DOM and LocalSorage
    controls.onclick = function (e) {
      if (e.target.className == "fa-solid fa-trash-can") {
        removeFromLS(this.parentElement.getAttribute("data-id")); // remove From Local Storage
        this.parentElement.remove(); // remove From DOM
      } else if (e.target.className == "fa-solid fa-circle-xmark") {
        // condition to check if the task completed or not
        this.parentElement.classList.add("done");
        e.target.className = "fa-solid fa-circle-check";
        task.complete = true;
        addTaskToLS(tasksArr); // Update LocalStorage value
      } else if (e.target.className == "fa-solid fa-circle-check") {
        // if user click again on check mark then the task will change to be false
        // condition to check if the task completed or not
        this.parentElement.classList.remove("done");
        e.target.className = "fa-solid fa-circle-xmark";
        task.complete = false;
        addTaskToLS(tasksArr); // Update LocalStorage value
      } else if (e.target.className == "fa-solid fa-pen-to-square") {
        // edit or update value
        let updatedValue = prompt("Edit this task", task.title);
        if (updatedValue != null) {
          taskName.textContent = updatedValue;
          task.title = updatedValue;
          addTaskToLS(tasksArr);
        }
      }
    };
    // check if task is completed and control localStorage Tasks
    if (task.complete) {
      taskHolder.classList.add("done");
      xIcon.className = "fa-solid fa-circle-check";
    }
  });
}

// add task to local storage
function addTaskToLS(tasksArr) {
  window.localStorage.setItem("DOMtasks", JSON.stringify(tasksArr)); // Browsers need Stringify to understand it
}

function removeFromLS(rmTask) {
  // loop on tasks array to check if the id of the removed task equal the existed one
  tasksArr = tasksArr.filter((task) => task.id != rmTask);
  //update local storage
  addTaskToLS(tasksArr);
}
