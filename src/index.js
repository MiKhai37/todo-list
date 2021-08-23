import './style.css';
import Task from './modules/Task.js';
import Project from './modules/Project.js';
import Storage from './modules/Storage.js';
import UI from './modules/UI'

const ui = new UI();
const storage = new Storage();
let projects = [];

if (localStorage.length == 0) {
  projects.push(new Project('Test', 'All tasks', true));
  projects[0].addTask(new Task('Test'))
  storage.storeProjects(projects)
} else  {
  projects = storage.retrieveProjects();
}

const current = projects[0];
const main = ui.generateMain(projects, current);

document.body.appendChild(main);