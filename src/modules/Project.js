export default class Project {
    constructor(title, description = 'No description') {
        this.title = title;
        this.description = description;
        this.projectTasks = [];
    }
    addTask(task) {
        this.projectTasks.push(task);
        task.project = this.title;
    }
    delTask(task) {
        const index = this.projectTasks.indexOf(task);
        if (index > -1) this.projectTasks.splice(index, 1);
    }
};