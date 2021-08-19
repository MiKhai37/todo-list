import './style.css';
import Task from './modules/Task.js';
import Project from './modules/Project.js';
import Storage from './modules/Storage.js';
import UI from './modules/UI'

const ui = new UI();
let projects = [];

if (localStorage.length == 0) {
  projects.push(new Project('inbox', 'All tasks', true));
  projects[0].addTask(new Task('task', 'first task')); 
} else  {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const obj = JSON.parse(localStorage.getItem(key));
    
    // Re-add Project Prototype
    Object.setPrototypeOf(obj,Project.prototype);
    projects.push(obj);
    console.log(`${key} loaded`);
    obj.tasks.forEach(task => {Object.setPrototypeOf(task, Task.prototype)});
    //projects = storage.retrieveData();
  }  
}

const current = projects[0];
const main = ui.generateMain(projects, current);

document.body.appendChild(main);
