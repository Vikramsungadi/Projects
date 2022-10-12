const button = document.querySelector(".btn");
const taskinput = document.querySelector(".input");
const main = document.querySelector(".main");
const trashicon = document.querySelector("i");
const bottomCard = document.querySelector(".bottom--card");
const pa = document.querySelectorAll(".para");

button.addEventListener("click", addTask);
main.addEventListener("click", removeTask);
main.addEventListener("click", checkTask);
main.addEventListener("click", edit);
// main.addEventListener("click", previous);
main.addEventListener("click", done);
document.addEventListener("DOMContentLoaded", loadTasksFromLS);

// CREATING TASK COMPONENT

function creatingTaskComponent(text) {
  const card = document.createElement("div");
  card.classList.add("top--card", "bottom--card");
  const p = document.createElement("p");
  p.className = "para";
  p.innerText = text;
  // p.appendChild(document.createTextNode(text));
  const trash = document.createElement("i");
  trash.className = "fa-solid fa-trash";
  const check = document.createElement("i");
  check.className = "fa-regular fa-circle-check";
  const edit = document.createElement("i");
  edit.className = "fa-solid fa-pen-to-square";
  const icon = document.createElement("div");
  icon.className = "icon";
  icon.append(check, trash, edit);
  // console.log(icon);
  // trash.className = "fa-solid fa-trash";
  // const check = document.createElement("div");
  // check.className = "check";
  // check.innerHTML = '<i class="fa-regular fa-circle-check"></i>';

  card.append(p, icon);

  main.appendChild(card);
}

// LOADING TASKS FROM LOCAL STORAGE TO DOM

function loadTasksFromLS() {
  if (localStorage.getItem("tasks") !== null) {
    let tasks;
    tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach(function (task) {
      const card = document.createElement("div");
      card.classList.add("top--card", "bottom--card");

      const p = document.createElement("p");
      p.className = "para";
      if (task.strike === true) {
        card.classList.add("strike--card");
        p.classList.add("strike");
      }
      p.innerText = task.Text;

      // console.log(task.Text);
      // p.appendChild(document.createTextNode(text));
      const trash = document.createElement("i");
      trash.className = "fa-solid fa-trash";
      const check = document.createElement("i");
      check.className = "fa-regular fa-circle-check";
      const edit = document.createElement("i");
      edit.className = "fa-solid fa-pen-to-square";
      const icon = document.createElement("div");
      icon.className = "icon";

      // if (task.strike === true) {
      //   icon.append(check, trash);
      // } else {
      //   icon.append(check, trash, edit);
      // }
      // console.log(icon);
      icon.append(check, trash, edit);
      card.append(p, icon);

      main.appendChild(card);
    });
  }
}

// ADDING TASK TO DOM

function addTask() {
  if (taskinput.value === "") {
    alert("Add a Task");
  } else {
    creatingTaskComponent(taskinput.value);
    storeTaskinLS(taskinput.value);
    taskinput.value = "";
  }
}

// STORING TASK INPUT IN LOCAL STORAGE

function storeTaskinLS(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  obj = { Text: task, strike: false };
  tasks.push(obj);
  // tasks.push(task);
  // console.log(obj.Text);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//  REMOVING TASK COMPONENT FROM DOM

function removeTask(e) {
  // console.log(e.target.className);
  if (
    e.target.parentElement.parentElement.classList.contains("bottom--card") &&
    e.target.classList.contains("fa-trash")
  ) {
    e.target.parentElement.parentElement.remove();
    console.log(e.target.parentElement.parentElement.textContent);
    removeTaskFromLS(e.target.parentElement.parentElement.textContent);
  }
}

//  REMOVING TASK INPUT IN LOCAL STORAGE

function removeTaskFromLS(text) {
  let tasks;
  tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach(function (task, index) {
    if (text === task.Text) {
      tasks.splice(index, 1);
      // console.log(text == task.Text);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
}

function checkTask(e) {
  if (
    e.target.parentElement.parentElement.classList.contains("bottom--card") &&
    e.target.classList.contains("fa-circle-check")
  ) {
    // console.log(e.target.parentElement.parentElement.querySelector(".para"));
    const card = e.target.parentElement.parentElement;
    const p = e.target.parentElement.parentElement.querySelector("p");
    let tasks = JSON.parse(localStorage.getItem("tasks"));

    if (p.classList.contains("strike")) {
      p.classList.remove("strike");
      card.classList.remove("strike--card");
      // e.target.parentElement.lastChild.style.display = "block";
      storeStrikesToLS(p.textContent);
    } else {
      p.classList.add("strike");
      card.classList.add("strike--card");
      // e.target.parentElement.lastChild.style.display = "none";
      storeStrikesToLS(p.textContent);
    }
  }
}

function storeStrikesToLS(text) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach(function (task) {
    if (task.Text === text) {
      if (task.strike === true) {
        task.strike = false;
      } else {
        task.strike = true;
      }
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  });
}

function edit(e) {
  let grandparent = e.target.parentElement.parentElement;
  let parent = e.target.parentElement;
  if (
    grandparent.classList.contains("bottom--card", "top--card") &&
    e.target.classList.contains("fa-pen-to-square")
  ) {
    console.log(parent.previousElementSibling.textContent);
    let p = parent.previousElementSibling;
    console.log(p);
    let textp = p.textContent;
    p.classList.add("none");
    parent.classList.add("none");
    grandparent.innerHTML = `<div class="input--holder">
          <div class="btn--div">
            <input class="input input2"  value="${textp}" type="text" />
            <button type="submit" class="btn2">Done</button>
          </div>
        </div>`;
    removeTaskFromLS(textp);
  }
}
// function previous(e) {
//   if (
//     e.target.parentElement.classList.contains("bottom--card", "top--card") &&
//     e.target.classList.contains("para")
//   )
//     return target.textContent;
// }

function done(e) {
  if (e.target.classList.contains("btn2")) {
    let text = e.target.previousElementSibling.value;
    console.log(text);
    let x = e.target.closest(".bottom--card");
    x.innerHTML = `<p class="para">${text}</p>
          <div class="icon checked--icons">
            <i class="fa-regular fa-circle-check"></i
            ><i class="fa-solid fa-trash"></i><i class="fa-solid fa-pen-to-square">
          </div>`;
    console.log(x);
    storeTaskinLS(text);
    //   let tasks = JSON.parse(localStorage.getItem("tasks"));
    //   tasks.forEach(function (task) {
    //     if (task.Text === previousText) {
    //       task.Text = text;
    //     }
    //   });
    //   localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}
