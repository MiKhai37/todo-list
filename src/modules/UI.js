import Project from "./Project";
import Task from "./Task";

export default class UI {
    constructor() {

    }
    generateHeader() {
        const header = document.createElement('div');
        header.classList.add('top-nav');
        header.innerHTML = `<h1>Project Mangager</h1>`;
        return header;
    }
    generateFooter() {
        const footer =  document.createElement('div');
        footer.classList.add('bottom-nav');
        footer.innerHTML = 'Made by Michael Tanguy <a href="https://github.com/MiKhai37" target="_blank"><i class="fa fa-github"></i></a>';
        return footer;
    }
    generateFlexContainer() {
        const flexContainer = document.createElement('div');
        flexContainer.classList.add('flex-container');
        return flexContainer;
    }
    generateBtn(btnClass, icon) {
        const btn = document.createElement('button');
        btn.classList.add(btnClass);
        btn.innerHTML = `<i class="fa fa-${icon}"></i>`;
        return btn;
    }
    generateProjects(projects) {
        const projectsContainer = document.createElement('div');
        projectsContainer.classList.add('projects');
        
        const title = document.createElement('h3');
        title.textContent = 'Projects';
        projectsContainer.appendChild(title);
        
        projects.forEach(project => {
            const projectDiv = document.createElement('div');
            projectDiv.classList.add('project')
            projectDiv.textContent = project.title;
            if (!project.perm) {
                // The button logic is managed by index.js
                const deleteBtn = this.generateBtn('del-btn', 'times');
                projectDiv.appendChild(deleteBtn);
            }
            projectsContainer.appendChild(projectDiv);
        });

        return projectsContainer;
    }
    generateTasks(tasks) {
        const tasksContainer = document.createElement('div');
        tasksContainer.classList.add('tasks');
        
        const title = document.createElement('h3');
        title.textContent = 'Tasks';
        tasksContainer.appendChild(title);

        tasks.forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task');
            taskDiv.textContent = task.title;

            const checkBtn = this.generateBtn('check-btn', 'check');
            const deleteBtn = this.generateBtn('del-btn', 'times');
            taskDiv.appendChild(checkBtn);
            taskDiv.appendChild(deleteBtn);

            tasksContainer.appendChild(taskDiv);
        })


        return tasksContainer;
    }
    generateTimers() {
        const timersContainer = document.createElement('div');
        timersContainer.classList.add('timers');

        const title = document.createElement('h3');
        title.textContent = 'Timers';
        timersContainer.appendChild(title);

        return timersContainer;
    }
}