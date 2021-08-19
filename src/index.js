import './style.css';
import Task from './modules/Task.js';
import Project from './modules/Project.js';
import Storage from './modules/Storage.js';
import UI from './modules/UI'

const ui = new UI();
const storage = new Storage();
let projects = [];

if (localStorage.length == 0) {
  projects.push(new Project('Inbox', 'All tasks', true));
  projects.push(new Project('Today', 'All tasks', true));
  projects.push(new Project('Week', 'All tasks', true));
} else  {
  projects = storage.retrieveProjects();
}



const allTasks = projects.map(project => project.tasks).flat();

const current = projects[0];
const main = ui.generateMain(projects, current);

document.body.appendChild(main);

storage.storeProjects(projects);

