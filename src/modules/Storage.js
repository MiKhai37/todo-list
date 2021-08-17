import Project from './Project';

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
    storeData(projects) {
        localStorage.clear()
        // Store all projects
        projects.forEach(project => {
            const jsonProject = JSON.stringify(project)
            localStorage.setItem(project.title, jsonProject);
            console.log(`${project.title} stored (${project.projectTasks.length} task)`)
        });
    }
    retrieveData() {
        const projects = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const obj = JSON.parse(localStorage.getItem(key));
        
            // Re-add Project Prototype
            Object.setPrototypeOf(obj,Project.prototype);
            projects.push(obj);
        return projects;
        }

    }
}