import Project from './Project';
import Task from './Task';

export default class Storage {
    constructor() {
        // Check if storage is available
        if (typeof(Storage) !== "undefined") {
            console.log('Storage is available')
            this.isStorage = true;
          } else {
            console.log('Storage isn\'t availble, please use a modern browser')
            this.isStorage = false;
          }
    }
    storeProjects(projects) {
        const projectsJsonStr = JSON.stringify(projects)
        localStorage.setItem('projects', projectsJsonStr) 
    }
    retrieveProjects() {
        const projectsJsonStr = localStorage.getItem('projects');
        const projectsObject = JSON.parse(projectsJsonStr);
        const projects = projectsObject.map(project => Object.setPrototypeOf(project,Project.prototype));
        projects.forEach(project => {
            project.tasks.forEach(task => {
                Object.setPrototypeOf(task,Task.prototype)
            });
        });
        return projects;
    }
}