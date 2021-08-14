export default class Project {
    constructor(title, description = '') {
        this.title = title;
        this.description = description;
        this.tasks = [];
    }
    addTask(Task) {
        this.tasks.push(Task);
        if (this.title != "All Tasks") {
        Task.project = this.title;
        }
    }
    delTask(Task) {

    }
};