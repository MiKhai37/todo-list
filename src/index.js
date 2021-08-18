import './style.css';
import Task from './modules/Task.js';
import Project from './modules/Project.js';
import Storage from './modules/Storage.js';
import UI from './modules/UI'

const ui = new UI();
const storage = new Storage();
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
  }  
}
const currentProject = projects[0];
document.body.appendChild(ui.render_ui(projects, currentProject.projectTasks));