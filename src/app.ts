const inp_desc = document.getElementById("desc");
const inp_date = document.getElementById("data");
const inp_filter = document.getElementById("filter");
const btn_add = document.getElementById("add-btn");
const btn_filter = document.getElementById("filter-btn");
const tbody = document.querySelector("tbody");

interface ITask {
  id: number;
  done: boolean;
  description: string;
  deadline: string;
}

enum eStatus {
  DONE = "DONE",
  UNDONE = "UNDONE",
}

enum eIcon {
  DONE = "✅",
  UNDONE = "❎",
}

let tasks: ITask[] = [];

function showTasks(tasks: ITask[]): void {
  tbody!.innerHTML = "";
  for (let task of tasks) {
    let row = document.createElement("tr");
    let done = task.done ? eIcon.DONE : eIcon.UNDONE;
    row.innerHTML = `          
          <th><span onclick="set_status(${task.id})" class="status">${done}</span></th>
          <th>${task.description}</th>
          <th>${task.deadline}</th>
          <th><button onclick="delete_task(${task.id})">Delete task</button></th>
          `;
    tbody?.appendChild(row);
  }
}

btn_add?.addEventListener("click", (event) => {
  event.preventDefault();
  if (
    (inp_desc as HTMLInputElement).value == "" ||
    (inp_date as HTMLInputElement).value == ""
  ) {
    alert("Description and date are required");
    return;
  }
  let task: ITask = {
    id: tasks.length,
    done: false,
    description: (inp_desc as HTMLInputElement).value,
    deadline: new Date(
      (inp_date as HTMLInputElement).value
    ).toLocaleDateString(),
  };

  tasks.push(task);
  showTasks(tasks);
  (inp_date as HTMLInputElement).value = "";
  (inp_desc as HTMLInputElement).value = "";
});

btn_filter?.addEventListener("click", (event) => {
  event.preventDefault();
  let filtered_tasks: ITask[] = [];
  switch ((inp_filter as HTMLSelectElement).value) {
    case eStatus.DONE:
      filtered_tasks = tasks.filter((x: ITask) => {
        return x.done;
      });
      break;
    case eStatus.UNDONE:
      filtered_tasks = tasks.filter((x: ITask) => {
        return !x.done;
      });
      break;
  }
  showTasks(filtered_tasks);
});

function delete_task(id: number): void {
  tasks = tasks.filter((x: ITask) => {
    return x.id != id;
  });
  showTasks(tasks);
}

function set_status(id: number): void {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.done = !task.done;
    showTasks(tasks);
  } else {
    console.log("Task non esistente");
  }
}
