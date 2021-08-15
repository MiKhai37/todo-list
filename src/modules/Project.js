export default class Project {
    constructor(title, description = '') {
        this.title = title;
        this.description = description;
        this.tasks = [];
    }
    addTask(Task) {
        this.tasks.push(Task);
    }
    delTask(Task) {

    }
};