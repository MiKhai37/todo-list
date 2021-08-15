import './style.css';
import './overlayStyle.css';
import Task from './modules/Task';
import Project from './modules/Project';
//import UI from './modules/UI'


const firstProject = new Project('First', 'This is a test project');
const secondProject = new Project('Second', 'This is a test project');

const projects = [firstProject, secondProject];

const task1 = new Task('task 1', 'This is the description of the first task');
const task2 = new Task('task 2', 'task 2 description');
const task3 = new Task('task 3', 'task 3 description');
firstProject.addTask(task1);
firstProject.addTask(task2);
firstProject.addTask(task3);

const task4 = new Task('task 4', 'This is the description of the first task');
const task5 = new Task('task 5', 'task 5 description');
const task6 = new Task('task 6', 'task 6 description');
secondProject.addTask(task4);
secondProject.addTask(task5);
secondProject.addTask(task6);

var currentProject = secondProject;

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
      document.body.replaceChild(renderInit(projects, currentProject), document.body.childNodes[2]);
    });
    projectsDiv.appendChild(projectDiv);
  });

  const addProjectBtn = document.createElement('button');
    addProjectBtn.classList.add('project');
    addProjectBtn.textContent = '+';
    addProjectBtn.addEventListener('click', (e) => {
      console.log(e)
      //overlayOn();
      projects.push(new Project('New', 'This is a test project'));

      document.body.replaceChild(renderInit(projects, currentProject), document.body.childNodes[2]);
  });
  projectsDiv.appendChild(addProjectBtn);
  return projectsDiv;
}

function renderTasks(currentProject) {
  const tasksDiv = document.createElement('div');
  tasksDiv.classList.add('tasks');

  const title = document.createElement('h2');
  title.textContent = 'Tasks'
  tasksDiv.appendChild(title)

  currentProject.tasks.forEach(task => {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    taskDiv.textContent = `${task.title} ${task.project.title}`;

    taskDiv.addEventListener('mouseenter', () => {
      taskDiv.innerHTML= `${task.title}<br>${task.description}`;
    });
    taskDiv.addEventListener('mouseleave', () => {
      taskDiv.innerHTML= `${task.title} ${task.project.title}`;
    });

    tasksDiv.appendChild(taskDiv);
  })
  
  const addTaskBtn = document.createElement('button');
  addTaskBtn.classList.add('task');
  addTaskBtn.textContent = '+';
  
  addTaskBtn.addEventListener('click', () => {
    currentProject.addTask(new Task('title', 'description', currentProject, 'normal'));
    document.body.replaceChild(renderInit(projects, currentProject), document.body.childNodes[2]);
  })
  tasksDiv.appendChild(addTaskBtn);
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

function renderInit(projects, currentProject) {
    const div = document.createElement('div');

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
    flexContainer.appendChild(renderTasks(currentProject));
    flexContainer.appendChild(renderTimers());

    div.appendChild(header);
    div.appendChild(flexContainer);
    div.appendChild(footer);
    
    //element.appendChild(renderOverlayProject())
    return div;
  }

  document.body.appendChild(renderInit(projects, currentProject));