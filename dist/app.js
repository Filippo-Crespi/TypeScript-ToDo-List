"use strict";
const inp_desc = document.getElementById("desc");
const inp_date = document.getElementById("data");
const inp_filter = document.getElementById("filter");
const btn_add = document.getElementById("add-btn");
const btn_filter = document.getElementById("filter-btn");
const tbody = document.querySelector("tbody");
var eStatus;
(function (eStatus) {
    eStatus["DONE"] = "DONE";
    eStatus["UNDONE"] = "UNDONE";
})(eStatus || (eStatus = {}));
var eIcon;
(function (eIcon) {
    eIcon["DONE"] = "\u2705";
    eIcon["UNDONE"] = "\u274E";
})(eIcon || (eIcon = {}));
let tasks = [];
function showTasks(tasks) {
    tbody.innerHTML = "";
    for (let task of tasks) {
        let row = document.createElement("tr");
        let done = task.done ? eIcon.DONE : eIcon.UNDONE;
        row.innerHTML = `          
          <th><span onclick="set_status(${task.id})" class="status">${done}</span></th>
          <th>${task.description}</th>
          <th>${task.deadline}</th>
          <th><button onclick="delete_task(${task.id})">Delete task</button></th>
          `;
        tbody === null || tbody === void 0 ? void 0 : tbody.appendChild(row);
    }
}
btn_add === null || btn_add === void 0 ? void 0 : btn_add.addEventListener("click", (event) => {
    event.preventDefault();
    if (inp_desc.value == "" ||
        inp_date.value == "") {
        alert("Description and date are required");
        return;
    }
    let task = {
        id: tasks.length,
        done: false,
        description: inp_desc.value,
        deadline: new Date(inp_date.value).toLocaleDateString(),
    };
    tasks.push(task);
    showTasks(tasks);
    inp_date.value = "";
    inp_desc.value = "";
});
btn_filter === null || btn_filter === void 0 ? void 0 : btn_filter.addEventListener("click", (event) => {
    event.preventDefault();
    let filtered_tasks = [];
    switch (inp_filter.value) {
        case eStatus.DONE:
            filtered_tasks = tasks.filter((x) => {
                return x.done;
            });
            break;
        case eStatus.UNDONE:
            filtered_tasks = tasks.filter((x) => {
                return !x.done;
            });
            break;
    }
    showTasks(filtered_tasks);
});
function delete_task(id) {
    tasks = tasks.filter((x) => {
        return x.id != id;
    });
    showTasks(tasks);
}
function set_status(id) {
    const task = tasks.find((task) => task.id === id);
    if (task) {
        task.done = !task.done;
        showTasks(tasks);
    }
    else {
        console.log("Task non esistente");
    }
}
