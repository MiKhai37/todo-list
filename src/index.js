import './style.css';
import './overlayStyle.css';
import Task from './modules/Task';
import Project from './modules/Project';
import UI from './modules/UI'


const allProject = new Project('All Tasks', 'This is the default project, it contains all the tasks');
const firstProject = new Project('First', 'This is a test project');
const secondProject = new Project('Second', 'This is a test project');

const projectsArr = [allProject, firstProject, secondProject];

const task1 = new Task('task 1', 'This is the description of the first task');
const task2 = new Task('task 2', 'task 2 description');
const task3 = new Task('task 3', 'task 3 description');
firstProject.addTask(task1);
firstProject.addTask(task2);
firstProject.addTask(task3);
allProject.addTask(task1);
allProject.addTask(task2);
allProject.addTask(task3);

const task4 = new Task('task 4', 'task 4 description');
const task5 = new Task('task 5', 'task 5 description');
secondProject.addTask(task4);
secondProject.addTask(task5);
allProject.addTask(task4);
allProject.addTask(task5);

let currentProject = allProject;



function renderProjects(projectList, container) {
  container.innerHTML = ""
  
  const projectsTitle = document.createElement('div');
  projectsTitle.classList.add('title');
  projectsTitle.textContent = 'Projects';
  container.appendChild(projectsTitle);
  
  projectList.forEach(project => {
    const divProject = document.createElement('div');
    divProject.classList.add('project');
    divProject.textContent = project.title;

    if (project == currentProject) {
      divProject.style.backgroundColor = 'grey'
    }

    divProject.addEventListener('click', (e) => {
      console.log(e);

      currentProject = project;
      renderProjects(projectList, container);
      renderTasks(currentProject, document.querySelector('.tasks'));
    });

    container.appendChild(divProject);
  });
  const addProjectBtn = document.createElement('button');
  addProjectBtn.classList.add('task');
  addProjectBtn.textContent = '+';
  container.appendChild(addProjectBtn);
  addProjectBtn.addEventListener('click', (e) => {
    overlayOn()
  })
}

function divOverlayProject() {
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
    projectsArr.push(new Project(title, description));
    renderProjects(projectsArr,document.querySelector('.projects'));
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

function addProject(projectList) {
  projectList.push(new Project('New Project', 'some todos'))
}

function renderTasks(project, container) {
  container.innerHTML = ""

  const todosTitle = document.createElement('div');
  todosTitle.classList.add('title');
  todosTitle.textContent = "Tasks";
  container.appendChild(todosTitle);

  project.tasks.forEach(task => {
    const divTask = document.createElement('div');
    divTask.classList.add('task')
    divTask.textContent = `${task.title} ${task.project}`;

    divTask.addEventListener('mouseenter', (e) => {
      divTask.innerHTML= `${task.title}<br>${task.description}`;
    });
    divTask.addEventListener('mouseleave', (e) => {
      divTask.textContent = `${task.title} ${task.project}`;
    });

    container.appendChild(divTask);
  })
  const addTaskBtn = document.createElement('button');
  addTaskBtn.classList.add('task');
  addTaskBtn.textContent = '+';
  container.appendChild(addTaskBtn);
  addTaskBtn.addEventListener('click', () => {
    addTask('new task', 'description of the new task');
    renderTasks(project, container);
  })
}

function addTask(title, description) {
  const task = new Task(title, description, currentProject.title);
  currentProject.addTask(task);
  if (currentProject.title != 'All Tasks') {
    allProject.addTask(task);
  }
}

function initRender() {
    const element = document.createElement('div');

    //Define header middle and footer
    const header = document.createElement('header');
    header.classList.add('top-nav');
    header.textContent = 'ToDo App';

    const middle = document.createElement('div');
    middle.classList.add('flex-container');

    const footer = document.createElement('footer');
    footer.classList.add('bottom-nav');
    footer.textContent = 'Made by Michael Tanguy';

    //Projects
    const projects = document.createElement('div');
    projects.classList.add('projects');
    renderProjects(projectsArr, projects)

    // Todos
    const todos = document.createElement('div');
    todos.classList.add('tasks');
    renderTasks(currentProject, todos);

    const timers = document.createElement('div');
    timers.classList.add('timers');
    const timersTitle = document.createElement('div');
    timersTitle.classList.add('title');
    timersTitle.textContent = 'Timers'
    timers.appendChild(timersTitle)



    middle.appendChild(projects);
    middle.appendChild(todos);
    middle.appendChild(timers);
    

    element.appendChild(header);
    element.appendChild(middle);
    element.appendChild(footer);
    
    element.appendChild(divOverlayProject())
    //element.innerHTML = "<h1>ToDo App</h1>"
    return element;
  }
  
  document.body.appendChild(initRender());