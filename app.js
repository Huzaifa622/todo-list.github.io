const todoForm = document.querySelector("#todoForm");
const todosList = document.querySelector(".todos");
const totalTasks = document.querySelector("#total-tasks");
const completedTasks = document.querySelector("#completed-tasks");
const remainingTasks = document.querySelector("#remaining-tasks");
const mainInput = document.querySelector("#todoForm input");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

if(localStorage.getItem('tasks')){
  tasks.map( (task)=>{
    createTask(task);
  })
}

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = mainInput.value;

  if (inputValue == "") {
    return;
  }

  const task = {
    id: new Date().getTime(),
    name: inputValue,
    isCompleted: false,
  };
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  createTask(task);
  todoForm.reset();
  mainInput.focus();
});

todosList.addEventListener('click', (e) =>{
  if(e.target.classList.contains('remove-task') || e.target.parentElement.classList.contains('remove-task') || e.target.parentElement.parentElement.classList.contains('remove-task') ){
    const taskId = e.target.closest('li').id;

    removeTask(taskId);
  }
})

todosList.addEventListener('input', (e)=>{
  const taskId = e.target.closest('li').id;

  updateTask(taskId, e.target);
})

function createTask(task) {
  const taskEl = document.createElement("li");

  taskEl.setAttribute("id", task.id);
  if (taskEl.isCompleted) {
    taskEl.classList.add("Completed");
  }

    const taskElMarkup = `
     <div>
       <input type="checkbox" name="tasks" id="${task.id}" ${task.isCompleted ? 'ch3ecked' : ''}>
          <span ${!task.isCompleted ? 'contenteditable' : ''}>${task.name}</span>
          </div>
        <button title="Remove the ${task.name} task" class="remove-task">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/> </svg>
         </button>`;

         taskEl.innerHTML = taskElMarkup;
         todosList.appendChild(taskEl);

         countTask();
}

function countTask(){
  const completedTasksArray = tasks.filter((task) => 
    task.isCompleted  === true
  );
  totalTasks.textContent = tasks.length;
  completedTasks.textContent = completedTasksArray.length;
  remainingTasks.textContent = tasks.length - completedTasksArray.length;
  
}

function removeTask(taskId){
  tasks = tasks.filter((task) => {
    tasks.id !== parseInt(taskId);
  })

  localStorage.setItem("tasks", JSON.stringify(tasks));

  document.getElementById(taskId).remove();

  countTask()
}

function updateTask(taskId, el){
const task = tasks.find((task)=> task.id === parseInt(taskId))

if(el.hasAttribute('contenteditable')){
  task.name = el.textContent;
}else{
  const span = el.nextElementSibling;
  const parent = el.closest('li')

  task.isCompleted = !task.isCompleted;

  if(task.isCompleted){
    span.removeAttribute('contenteditable');
    parent.classList.add('complete')
  }else{
    span.removeAttribute('contenteditable', true);
    parent.classList.remove('complete')
  }
}
localStorage.setItem("tasks", JSON.stringify(tasks));
countTask();
}