import './style.css';
import './overlayStyle.css';
import Task from './modules/Task';
import Project from './modules/Project';
import Storage from './modules/Storage';
import UI from './modules/UI'

const storage = new Storage();
const projects = [];

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
  }
}

const currentProject = projects[0];

function renderProjects(projects, currentProject) {
  const projectsDiv = document.createElement('div');
  projectsDiv.classList.add('projects');

  const title = document.createElement('h2');
  title.textContent = 'Projects';
  projectsDiv.appendChild(title);

  projects.forEach(project => {
    const projectDiv = document.createElement('div');
    projectDiv.classList.add('project');
    projectDiv.textContent = project.title;

    // Highlight the current project
    if (project == currentProject) {
      projectDiv.style.backgroundColor = 'grey';
    };

    projectDiv.addEventListener('click', () => {
      currentProject = project;
      refresh(projects, currentProject);
    });
    if (!project.perm) {
      // The delete button
      const delButton = document.createElement('button');
      delButton.classList.add('delBtn');
      delButton.style.backgroundColor = projectDiv.style.backgroundColor;
      delButton.innerHTML = '<i class="fas fa-times"></i>';
      delButton.addEventListener('click', () => {
        const index = projects.indexOf(project);
        if (index > -1) projects.splice(index, 1);
        if (project == currentProject) currentProject.projectTasks = [];
        storage.storeData(projects);
        refresh(projects, currentProject);
      });
      projectDiv.appendChild(delButton);
    }

    projectsDiv.appendChild(projectDiv);
  });

  // The add project button
  const addProjectDiv = document.createElement('div');
  addProjectDiv.classList.add('project');

  const titleInput = document.createElement('input');
  titleInput.classList.add('input') ;
  titleInput.placeholder = 'Project Name';
  addProjectDiv.appendChild(titleInput);

  const descInput = document.createElement('input');
  descInput.classList.add('input') ;
  descInput.placeholder = "Project Description";
  addProjectDiv.appendChild(descInput);

  const addProjectBtn = document.createElement('button');
  addProjectBtn.classList.add('addProjectBtn');
  addProjectBtn.innerHTML = '<i class="fas fa-folder-plus"></i>';

  addProjectBtn.addEventListener('click', () => {
    const title = titleInput.value;
    const desc = descInput.value;
    if (!title || !desc) return;
    projects.push(new Project(title, desc));
    storage.storeData(projects);
    refresh(projects, currentProject);
  });

  addProjectDiv.appendChild(addProjectBtn);
  projectsDiv.appendChild(addProjectDiv);
  return projectsDiv;
}

function renderTasks(projects, currentProject) {
  // Div
  const tasksDiv = document.createElement('div');
  tasksDiv.classList.add('tasks');

  // Task Title
  const title = document.createElement('h2');
  title.textContent = 'Tasks';
  tasksDiv.appendChild(title);

  // Add all task of the current project
  currentProject.projectTasks.forEach(task => {
    // The task
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    taskDiv.textContent = `${task.title}`;

    const expendBtn = document.createElement('button');
    expendBtn.classList.add('expendBtn');
    expendBtn.innerHTML = '<i class="fas fa-arrow-down"></i>';

    const valBtn = document.createElement('button');
    valBtn.classList.add('valBtn');
    valBtn.innerHTML = '<i class="fas fa-check"></i>';
    valBtn.addEventListener('click', () => {
      valBtn.classList.toggle('valid');
      task.isDone = !task.isDone;
      storage.storeData(projects);
    })

    // The delete button
    const delButton = document.createElement('button');
    delButton.classList.add('delBtn');
    delButton.innerHTML = '<i class="fas fa-times"></i>';
    delButton.addEventListener('click', () => {
      currentProject.delTask(task);
      storage.storeData(projects);
      refresh(projects, currentProject);
    });

    // Event listener to switch between normal and detailed task
    expendBtn.addEventListener('click', () => {
      taskDiv.classList.toggle('open');
      if (taskDiv.classList.contains('open')) {
        taskDiv.innerHTML = `${task.title}<br>${task.description}<br>${task.deadline}`;
        expendBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
      } else {
        taskDiv.innerHTML = `${task.title}`;
        expendBtn.innerHTML = '<i class="fas fa-arrow-down"></i>';
      };
      taskDiv.appendChild(valBtn);
      taskDiv.appendChild(expendBtn);
      taskDiv.appendChild(delButton);
    });
    taskDiv.appendChild(valBtn);
    taskDiv.appendChild(expendBtn);
    taskDiv.appendChild(delButton);
    tasksDiv.appendChild(taskDiv);
  })
  
  // The add task button
  const addTaskDiv = document.createElement('div');
  addTaskDiv.classList.add('task');

  const titleInput = document.createElement('input');
  titleInput.classList.add('input') ;
  titleInput.placeholder = 'Task Name';
  addTaskDiv.appendChild(titleInput);

  const descInput = document.createElement('input');
  descInput.classList.add('input');
  descInput.placeholder = "Task Description";
  addTaskDiv.appendChild(descInput);

  const addTaskBtn = document.createElement('button');
  addTaskBtn.classList.add('addTaskBtn');
  addTaskBtn.innerHTML = '<i class="fas fa-plus"></i>';

  addTaskBtn.addEventListener('click', () => {
    const title = titleInput.value;
    const desc = descInput.value;
    if (!title || !desc) return;
    currentProject.addTask(new Task(title, desc, currentProject));
    storage.storeData(projects);
    refresh(projects, currentProject);
  });

  addTaskDiv.appendChild(addTaskBtn);
  tasksDiv.appendChild(addTaskDiv);
  return tasksDiv;
}

function renderTimers() {
  const timersDiv = document.createElement('div');
  timersDiv.classList.add('timers')

  const title = document.createElement('h2');
  title.textContent = "Timers";
  timersDiv.appendChild(title);

  return timersDiv;
}

function refresh(projects, currentProject) {
  const oldMainDiv = document.body.childNodes[2];
  const newMainDiv = renderInit(projects, currentProject);
  document.body.replaceChild(newMainDiv, oldMainDiv);
}

function renderInit(projects, currentProject) {
    const mainDiv = document.createElement('div');

    //Define header middle and footer
    const header = document.createElement('header');
    header.classList.add('top-nav');
    header.textContent = 'Project Manager';

    const flexContainer = document.createElement('div');
    flexContainer.classList.add('flex-container');

    const footer = document.createElement('footer');
    footer.classList.add('bottom-nav');
    footer.innerHTML = 'Made by Michael Tanguy <a href="https://github.com/MiKhai37" target="_blank"><i class="fab fa-github"></i></a>';
    
    flexContainer.appendChild(renderProjects(projects, currentProject));
    flexContainer.appendChild(renderTasks(projects, currentProject));
    flexContainer.appendChild(renderTimers());

    mainDiv.appendChild(header);
    mainDiv.appendChild(flexContainer);
    mainDiv.appendChild(footer);
    
    return mainDiv;
  }

  document.body.appendChild(renderInit(projects, currentProject));