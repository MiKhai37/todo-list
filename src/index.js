import './style.css';
import './overlayStyle.css';
import Task from './modules/Task';
import Project from './modules/Project';
import Storage from './modules/Storage';
import UI from './modules/UI'

const storage = new Storage();
const projects = [];

if (localStorage.length == 0) {
  projects.push(new Project('First Project', 'This is the first project'));
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
    //overlayOn();
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
    taskDiv.addEventListener('click', () => {
      if (!taskDiv.classList.contains('open')) {
        taskDiv.classList.add('open');
        taskDiv.innerHTML = `${task.title}<br>${task.description}`;
      } else {
        taskDiv.classList.remove('open');
        taskDiv.innerHTML = `${task.title}`;
      };
      taskDiv.appendChild(delButton);
    });
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
    currentProject.addTask(new Task(title, desc, currentProject, 'normal'));
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

function renderOverlayProject() {
  const overlay = document.createElement('div');
  overlay.classList.add('project-overlay');

  const formContainer = document.createElement('div');
  formContainer.classList.add('form-container');
  overlay.appendChild(formContainer);

  const form = document.createElement('form');
  form.classList.add('form');
  formContainer.appendChild(form);

  const formTitle = document.createElement('h2');
  formTitle.textContent = 'Add New Project'
  formTitle.style.color = 'white'
  form.appendChild(formTitle);

  const inputContainer = document.createElement('div');
  inputContainer.classList.add('input-container')
  form.appendChild(inputContainer);

  const titleInput = document.createElement('input');
  titleInput.classList.add('title-input');
  titleInput.type = 'text'
  titleInput.placeholder = 'Project Name';
  inputContainer.appendChild(titleInput);

  const descriptionInput = document.createElement('input');
  descriptionInput.classList.add('description-input');
  descriptionInput.type = 'text'
  descriptionInput.placeholder = 'Project Description';
  inputContainer.appendChild(descriptionInput);

  const addBtn = document.createElement('button');
  addBtn.classList.add('button');
  addBtn.type = 'button';
  addBtn.textContent = "Add New Project";
  inputContainer.appendChild(addBtn);

  addBtn.addEventListener('click', (e) => {
    const title = document.querySelector('.title-input').value;
    const description = document.querySelector('.description-input').value;
    projects.push(new Project(title, description));
    renderProjects(projects, currentProject)
    overlayOff();
  })

  return overlay;
}

function overlayOn() {
  document.querySelector('.project-overlay').style.display = 'block';
}

function overlayOff() {
  document.querySelector('.project-overlay').style.display = 'none';
}

function refresh(projects, currentProject) {
  const oldMainDiv = document.body.childNodes[2]
  const newMainDiv = renderInit(projects, currentProject)
  document.body.replaceChild(newMainDiv, oldMainDiv)
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
    footer.innerHTML = 'Made by Michael Tanguy <a href="https://github.com/MiKhai37" target="_blank">Github</a>';
    
    flexContainer.appendChild(renderProjects(projects, currentProject));
    flexContainer.appendChild(renderTasks(projects, currentProject));
    flexContainer.appendChild(renderTimers());

    mainDiv.appendChild(header);
    mainDiv.appendChild(flexContainer);
    mainDiv.appendChild(footer);
    
    //element.appendChild(renderOverlayProject())
    return mainDiv;
  }

  document.body.appendChild(renderInit(projects, currentProject));