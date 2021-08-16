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
        // Store all projects
        projects.forEach(project => {
            const jsonProject = JSON.stringify(project)
            localStorage.setItem(project.title, jsonProject);
            console.log(`${project.title} stored (${project.projectTasks.length} task)`)
        });
    }
    retrieveData() {

        

        console.log('Projects loaded')
        return projects
    }
}