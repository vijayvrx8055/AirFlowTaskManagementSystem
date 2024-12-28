const express = require('express');
const { resolve } = require('path');
let cors = require('cors');
const res = require('express/lib/response');

const app = express();
const port = 3000;

app.use(express.static('static'));
app.use(cors());

let tasks = [
  { "taskId": 1, "text": 'Fix bug #101', "priority": 2 },
  { "taskId": 2, "text": 'Implement feature #202', "priority": 1 },
  { "taskId": 3, "text": 'Write documentation', "priority": 3 }
];

//======================================================================
app.get('/tasks/add',(req,res)=>{
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = parseInt(req.query.priority);
  let newTask = { "taskId": taskId, "text": text, "priority": priority };
  addNewTask(newTask);
  res.json({"tasks": tasks});
});
function addNewTask(newTask){
  tasks.push(newTask);
}

app.get('/tasks',(req,res)=>{
  res.json({"tasks":getCurrentState()});
});
function getCurrentState(){
  return tasks;
}

app.get('/tasks/sort-by-priority',(req,res)=>{
  let tasksCopy = tasks.slice();
  tasksCopy.sort(sortByPriority)
  res.json({"tasks":tasksCopy});
});
function sortByPriority(task1, task2){
  return task1.priority - task2.priority;
}

app.get('/tasks/edit-priority',(req,res)=>{
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);
  let response = updatePriority(tasks, taskId, priority);
  res.json({"tasks":response});
});
function updatePriority(tasks, taskId, priority){
  for(let i=0; i<tasks.length; i++){
    if(tasks[i].taskId === taskId){
      tasks[i].priority = priority;
    }
  }
  return tasks;
}
//======================================================================
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
