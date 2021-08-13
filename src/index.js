import './style.css';
import Task from './modules/Task';'./modules/Task.js';
import Project from './modules/Project';'./modules/Project.js';

const mainProject = new Project('All', 'All Tasks', 'normal');
const secondProject = new Project('Second', 'some todos', 'normal');
const thirdProject = new Project('Third', 'some todos', 'normal');

const projectsArr = [mainProject, secondProject, thirdProject];

const task1 = new Task('task 1', 'task 1 description');
const task2 = new Task('task 2', 'task 2 description');
const task3 = new Task('task 3', 'task 3 description');
mainProject.addTask(task1);
mainProject.addTask(task2);
mainProject.addTask(task3);

const task4 = new Task('task 4', 'task 4 description');
const task5 = new Task('task 5', 'task 5 description');
secondProject.addTask(task4);
secondProject.addTask(task5);




let currentProject = mainProject;

function renderProjects(projectList, container) {
  container.textContent = ""

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
      renderTasks(currentProject, document.querySelector('.middle'));
    });

    container.appendChild(divProject);
  });
}

function renderTasks(project, container) {
  container.textContent = ""

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
      divTask.textContent = task.description;
    });
    divTask.addEventListener('mouseleave', (e) => {
      console.log(e)
      divTask.textContent = `${task.title} ${task.project}`;
    });

    container.appendChild(divTask);
  })
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
    todos.classList.add('middle');
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