function generateHeader() {
  const header = document.createElement('div');
  header.id = 'header'
  header.classList.add('top-nav');
  header.innerHTML = `<h2>Projectdoro</h2>`;
  return header;
}

function generateFooter() {
  const footer =  document.createElement('div');
  footer.id = 'footer'
  footer.classList.add('bottom-nav');
  footer.innerHTML = 'Made by Michael Tanguy <a href="https://github.com/MiKhai37" target="_blank"><i class="fa fa-github"></i></a>';
  return footer;
}

function generateBtn(btnId, icon) {
  const btn = document.createElement('button');
  btn.id = btnId;
  btn.classList.add('btn');
  btn.innerHTML = `<i class="fa fa-${icon}"></i>`;
  return btn;
}

function generateTitleInput(id) {
  const titleInput = document.createElement('input');
  titleInput.id = `${id}-title-input`;
  titleInput.classList.add('input');
  titleInput.placeholder = 'New Task Name';
  titleInput.required = true;
  return titleInput
}

function generateDescInput(id) {
  const descInput = document.createElement('input');
  descInput.id = `${id}-desc-input`;
  descInput.classList.add('input');
  descInput.placeholder = 'Task Description';
  return descInput
}

function generateDateinput(id) {
  const dateInput = document.createElement('input');
  dateInput.id = `${id}-date-input`;
  dateInput.classList.add('input');
  dateInput.type = 'date';
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;
  let today = `${year}-${month}-${day}`;
  dateInput.value = today;
  return dateInput;
}

function generateProject() {
  const projectsContainer = document.createElement('div');
  projectsContainer.id = 'projects-container';

  const title = document.createElement('div');
  title.id = 'projects-title';
  title.textContent = 'project';

  const projectsDiv = document.createElement('div');
  projectsDiv.id = 'projects-div';

  const addProjectDiv = document.createElement('div');
  addProjectDiv.id = 'add-project-div';
  addProjectDiv.classList.add('project');

  const titleInput = generateTitleInput('project');
  const descInput = generateDescInput('project');
  const projectAddBtn = generateBtn('project-add', 'folder-plus');

  addProjectDiv.appendChild(titleInput);
  addProjectDiv.appendChild(descInput);
  addProjectDiv.appendChild(projectAddBtn);

  projectsContainer.appendChild(title);
  projectsContainer.appendChild(projectsDiv);
  projectsContainer.appendChild(addProjectDiv);

  return projectsContainer;
}

function generateTask() {
  const tasksContainer = document.createElement('div');
  tasksContainer.id = 'tasks-container'

  const title = document.createElement('div');
  title.id = 'tasks-title';
  title.textContent = 'Tasks';

  const tasksDiv = document.createElement('div');
  tasksDiv.id = 'tasks-div';
  tasksDiv.classList.add('tasks');

  const addTaskDiv = document.createElement('div');
  addTaskDiv.id = 'add-task-div';
  addTaskDiv.classList.add('task');

  const titleInput = generateTitleInput('task');
  const descInput = generateDescInput('task')
  const dateInput = generateDateinput('task')
  const addTaskBtn =  generateBtn('task-add', 'plus');

  addTaskDiv.appendChild(titleInput);
  addTaskDiv.appendChild(descInput);
  addTaskDiv.appendChild(dateInput);
  addTaskDiv.appendChild(addTaskBtn);

  tasksContainer.appendChild(title);
  tasksContainer.appendChild(tasksDiv);
  tasksContainer.appendChild(addTaskDiv);

  return tasksContainer;
}

function generateTimers() {
  const timersContainer = document.createElement('div');
  timersContainer.id = 'time-container'
  timersContainer.classList.add('timers');

  const title = document.createElement('div');
  title.textContent = 'Timers';

  timersContainer.appendChild(title);

  return timersContainer;
}

function generateFlex() {
  const flexContainer = document.createElement('div');
  flexContainer.id = 'flex-container';
  flexContainer.classList.add('flex');

  flexContainer.appendChild(generateProject());
  flexContainer.appendChild(generateTask());
  flexContainer.appendChild(generateTimers());

  return flexContainer;
}

export function renderUI() {
  const UIDiv = document.createElement('div');
  UIDiv.id = 'UI';

  UIDiv.appendChild(generateHeader());
  UIDiv.appendChild(generateFlex());
  UIDiv.appendChild(generateFooter());

  return UIDiv;
}
