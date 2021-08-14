export default class UI {
    constructor() {

    }
    initRender() {
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
        
        element.appendChild(divOverlayProject())
        //element.innerHTML = "<h1>ToDo App</h1>"
        return element;
      }

}