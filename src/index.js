import './style.css';
import Task from './modules/Task';'./modules/Task.js';
import Project from './modules/Project';'./modules/Project.js';

const allProject = new Project('All', 'All Tasks', 'normal');
const firstProject = new Project('First', 'some todos', 'normal');
const secondProject = new Project('Second', 'some todos', 'normal');

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
  projectsTitle.textContent = 'Projects'
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
      renderProjects(projectList, container)
      renderTasks(currentProject, document.querySelector('.tasks'));
    });

    container.appendChild(divProject);
  });
  const addProjectBtn = document.createElement('button');
  addProjectBtn.classList.add('task');
  addProjectBtn.textContent = '+';
  container.appendChild(addProjectBtn)
  addProjectBtn.addEventListener('click', (e) => {
    console.log(e);
    addProject(projectsArr)
    renderProjects(projectList, container)
  })
}

function addProject(projectList) {
  projectList.push(new Project('New Project', 'some todos', 'normal'))
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
      console.log(e)
      divTask.innerHTML= `${task.title}<br>${task.description}`;
    });
    divTask.addEventListener('mouseleave', (e) => {
      console.log(e)
      divTask.textContent = `${task.title} ${task.project}`;
    });

    container.appendChild(divTask);
  })
  const addTaskBtn = document.createElement('button');
  addTaskBtn.classList.add('task');
  addTaskBtn.textContent = '+';
  container.appendChild(addTaskBtn)
  addTaskBtn.addEventListener('click', () => {
    addTask('new task', 'description of the new task')
    renderTasks(project, container)
  })
}

function addTask(title, description) {
  const task = new Task(title, description, currentProject.title)
  currentProject.addTask(task)
  allProject.addTask(task)
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
    projects.classList.add('left');
    renderProjects(projectsArr, projects)

    // Todos
    const todos = document.createElement('div');
    todos.classList.add('tasks');
    renderTasks(currentProject, todos);

    const timers = document.createElement('div');
    timers.classList.add('right');
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
    
    //element.innerHTML = "<h1>ToDo App</h1>"
    return element;
  }
  
  document.body.appendChild(initRender());