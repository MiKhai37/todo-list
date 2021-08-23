import './style.css';
import Task from './modules/Task.js';
import Project from './modules/Project.js';
import Storage from './modules/Storage.js';
import UI from './modules/UI'
import { renderUI } from './modules/UI2';

const storage = new Storage();
let projects = [];

if (localStorage.length == 0) {
  projects.push(new Project('Test', 'All tasks', true));
  projects[0].addTask(new Task('Test'))
  storage.storeProjects(projects)
} else  {
  projects = storage.retrieveProjects();
}

let current = projects[0];
document.body.appendChild(renderUI());

function populateProject(projetcs) {
  const projetcsDiv = document.getElementById('projects-div');

  projects.forEach(project => {
    const projectDiv = document.createElement('div');
    projectDiv.classList.add('project');
    projectDiv.textContent = project.title;
    projectDiv.addEventListener('click', () => {
      current = project;
    });

    projetcsDiv.appendChild(projectDiv);
  })
}

function populateTasks(tasks) {
  const tasksDiv = document.getElementById('tasks-div');
}

populateProject(projects)