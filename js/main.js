const taskInput = document.querySelector(".inputTask");
const AddBtn = document.querySelector(".AddBtn");
let taskBox = document.querySelector(".taskBox");
let filters=document.querySelectorAll(".filters span");
let clearAll=document.querySelector(".clearBtn");
let editId;
let isEditedTask=false;
let todos = JSON.parse(localStorage.getItem("todoList"));
filters.forEach((btn)=>{
    btn.addEventListener("click",(e)=>{
        console.log(btn)
        document.querySelector("span.active").classList.remove("active")
        btn.classList.add("active")
        showTodo(btn.id)
    })
})
function showTodo(filter) {
  let li = " ";
  if (todos) {
    todos.forEach((task, id) => {
      let isCompleted = task.status == "completed" ? "checked" : "";
      if(filter==task.status || filter=="all"){
        li += `
        <li class="task">
            <label for="${id}">
                <input type="checkbox" onclick="updateStatus(this)"  id="${id}"  ${isCompleted} />
                <p class="${isCompleted}">${task.name}</p>
            </label>
            <div class="setting">
                <i class="fas fa-ellipsis" onclick="showMenu(this)"></i>
                <ul class="taskMenu">
                    <li onclick="updateTask(${id},'${task.name}')">
                        <i class="fas fa-pencil-alt"
                        ></i>Edit
                    </li>
                    <li onclick="deleteTask(${id})">
                        <i class="fas fa-trash-alt"></i>Delete
                    </li>
                </ul>
            </div>
        </li> 
        `;
      }
     
    });
  }
  taskBox.innerHTML = li || `<span>You don't have any tasks here !</span>`;
}
showTodo("all");
// =====updateStatus===========
function updateStatus(selectTask) {
  let taskName = selectTask.parentElement.lastElementChild;
  if (selectTask.checked) {
    taskName.classList.add("checked");
    todos[selectTask.id].status = "completed";
  } else {
    taskName.classList.remove("checked");
    todos[selectTask.id].status = "pending";
  }
  localStorage.setItem("todoList", JSON.stringify(todos));
  // console.log(taskName)
}
// ===========showMenu======
function showMenu(selectedElement) {
  let taskMenu = selectedElement.parentElement.lastElementChild;
  taskMenu.classList.toggle("show");
}
// ============updateTask=======
function updateTask(taskId,taskName){
    editId=taskId;
    isEditedTask=true;
    taskInput.value=taskName; 
}
// ============deleteTask=======
function deleteTask(deleteId){
    todos.splice(deleteId,1)
    localStorage.setItem("todoList", JSON.stringify(todos));
    showTodo("all")
}
clearAll.addEventListener("click",(e)=>{
    console.log(e.target)
   let ques= confirm("Are you want to delete all tasks ?")
    if(ques==true){
        todos.splice(0,todos.length)
        localStorage.setItem("todoList", JSON.stringify(todos));
        showTodo("all");
    }
    else{
        localStorage.setItem("todoList", JSON.stringify(todos));
        showTodo("all");
    }
})
AddBtn.addEventListener("click", (e) => {
  let userTask = taskInput.value.toUpperCase().trim();
  if (userTask == "") {
    alert("Please enter your task !");
  } else {
    if(!isEditedTask){
        if (!todos) {
            todos = [];
          }
          let taskInfo = { name: userTask, status: "pending" };
        todos.push(taskInfo);
    }else{
        isEditedTask=false;
        todos[editId].name=userTask;
    }
    taskInput.value = "";
    localStorage.setItem("todoList", JSON.stringify(todos));
    showTodo("all");
  }
});
