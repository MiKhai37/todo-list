export default class Project {
    constructor(title, description = '', priority = '') {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.tasks = [];
    }
    addTask(Task) {
        this.tasks.push(Task);
        if (this.title != "All") {
        Task.project = this.title;
        }
    }
    delTask(Task) {

    }
};