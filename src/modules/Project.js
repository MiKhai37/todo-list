export default class Project {
    constructor(title, description = 'No description') {
        this.title = title;
        this.description = description;
        this.tasks = [];
    }
    addTask(task) {
        this.tasks.push(task);
        task.project = this.title;
    }
    delTask(task) {
        const index = this.tasks.indexOf(task);
        if (index > -1) this.tasks.splice(index, 1);
    }
};