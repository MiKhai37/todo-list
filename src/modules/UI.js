import Project from "./Project";
import Task from "./Task";
import Storage from "./Storage";

export default class UI {
    constructor() {
        this.storage = new Storage();
    }
    generateHeader() {
        const header = document.createElement('div');
        header.classList.add('top-nav');
        header.innerHTML = `<h2>Projectdoro</h2>`;
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
    generateProjects(projects, current) {
        const projectsContainer = document.createElement('div');
        projectsContainer.classList.add('projects');
        
        const title = document.createElement('h3');
        title.textContent = 'Projects';
        projectsContainer.appendChild(title);
        
        projects.forEach(project => {
            const projectDiv = document.createElement('div');
            projectDiv.addEventListener('click', () => {
                current = project;
                this.refreshUI(projects, current);
            });
            projectDiv.classList.add('project')
            projectDiv.textContent = project.title;
            if (!project.perm) {
                const deleteBtn = this.generateBtn('del-btn', 'times');
                if (project == current) {deleteBtn.classList.toggle('current')};
                deleteBtn.addEventListener('click', () => {
                    const index = projects.indexOf(project);
                    if (index > -1) projects.splice(index, 1);
                    this.storage.storeProjects(projects);
                    this.refreshUI(projects, current);
                });
                projectDiv.appendChild(deleteBtn);
            }
            if (project == current) {projectDiv.classList.toggle('current')};
            projectsContainer.appendChild(projectDiv);
        });

        const addProjectDiv = document.createElement('div');
        addProjectDiv.classList.add('task');

        const titleInput = document.createElement('input');
        titleInput.id = 'new-project-title';
        titleInput.classList.add('input');
        titleInput.placeholder = 'New Project Name';
        titleInput.required = true;
        addProjectDiv.appendChild(titleInput);

        const descriptionInput = document.createElement('input');
        descriptionInput.id = 'new-project-desc';
        descriptionInput.classList.add('input');
        descriptionInput.placeholder = 'Task Desciption';
        addProjectDiv.appendChild(descriptionInput);

        const projectAddBtn = this.generateBtn('add-btn', 'folder-plus');
        projectAddBtn.id = 'add-project-btn';
        projectAddBtn.addEventListener('click', () => {
            if (titleInput.validity.valueMissing) {
                alert('Please enter a project name');
                return;
            };
            const newProject = new Project(titleInput.value, descriptionInput.value);
            projects.push(newProject);
            this.storage.storeProjects(projects);
            this.refreshUI(projects, newProject);
        });
        addProjectDiv.appendChild(projectAddBtn)

        projectsContainer.appendChild(addProjectDiv);

        return projectsContainer;
    }
    generateTasks(projects, current) {
        const tasksContainer = document.createElement('div');
        tasksContainer.classList.add('tasks');
        
        const title = document.createElement('h3');
        title.textContent = 'Tasks';
        tasksContainer.appendChild(title);

        current.tasks.forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task');
            taskDiv.textContent = task.title;

            const infoDiv = document.createElement('div');
            infoDiv.classList.add('info');
            const descDiv = document.createElement('div');
            descDiv.textContent = task.description;
            const deadlineDiv = document.createElement('div');
            deadlineDiv.textContent = task.deadline;
            const priorityDiv = document.createElement('div');
            priorityDiv.textContent = task.priority;
            infoDiv.appendChild(descDiv);
            infoDiv.appendChild(deadlineDiv);
            infoDiv.appendChild(priorityDiv);

            const expandBtn = this.generateBtn('expand-btn', 'arrow-down');
            expandBtn.addEventListener('click', () => {
                infoDiv.classList.toggle('open');
                if (infoDiv.classList.contains('open')) {
                    expandBtn.innerHTML = `<i class="fa fa-arrow-up"></i>`;
                } else {
                    expandBtn.innerHTML = '<i class="fa fa-arrow-down"></i>';
                }
            });
            const checkBtn = this.generateBtn('check-btn', 'check');
            if (task.isDone) {
                checkBtn.classList.add('checked')
            }
            checkBtn.addEventListener('click', () => {
                checkBtn.classList.toggle('checked');
                task.toggleIsDone();
                this.storage.storeProjects(projects);
                this.refreshUI(projects, current);
            });
            const deleteBtn = this.generateBtn('del-btn', 'times');
            deleteBtn.addEventListener('click', () => {
                current.delTask(task);
                this.storage.storeProjects(projects);
                this.refreshUI(projects, current);
            });
            taskDiv.appendChild(infoDiv);
            taskDiv.appendChild(expandBtn);
            taskDiv.appendChild(checkBtn);
            taskDiv.appendChild(deleteBtn);

            tasksContainer.appendChild(taskDiv);
        })

        const addTaskDiv = document.createElement('div');
        addTaskDiv.classList.add('task');

        const titleInput = document.createElement('input');
        titleInput.id = 'new-task-title';
        titleInput.classList.add('input');
        titleInput.placeholder = 'New Task Name';
        titleInput.required = true;
        addTaskDiv.appendChild(titleInput);

        const descriptionInput = document.createElement('input');
        descriptionInput.id = 'new-task-desc';
        descriptionInput.classList.add('input');
        descriptionInput.placeholder = 'Task Desciption';
        addTaskDiv.appendChild(descriptionInput);

        const taskAddBtn = this.generateBtn('add-btn', 'plus');
        taskAddBtn.id = 'add-task-btn';
        taskAddBtn.addEventListener('click', () => {
            if (titleInput.validity.valueMissing) {
                alert('Please enter a task name');
                return;
            };
            current.addTask(new Task(titleInput.value, descriptionInput.value))
            this.storage.storeProjects(projects);
            this.refreshUI(projects, current);
        })
        addTaskDiv.appendChild(taskAddBtn)

        tasksContainer.appendChild(addTaskDiv);

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
    generateMain(projects, current) {
        const mainDiv = document.createElement('div')
        mainDiv.id = 'main'
        
        const header = this.generateHeader();
        const footer = this.generateFooter();
        const flexContainer = this.generateFlexContainer();

        flexContainer.appendChild(this.generateProjects(projects, current))
        flexContainer.appendChild(this.generateTasks(projects, current))
        flexContainer.appendChild(this.generateTimers())

        mainDiv.appendChild(header);
        mainDiv.appendChild(flexContainer);
        mainDiv.appendChild(footer);

        return mainDiv
    }
    refreshUI(projects, current) {
        const oldMainDiv = document.getElementById("main");
        const newMainDiv = this.generateMain(projects, current);
        document.body.replaceChild(newMainDiv, oldMainDiv);
    }
}