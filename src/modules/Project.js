export default class Project {
    constructor(title, description = '', main = false) {
        this.title = title;
        this.description = description;
        this.main = main;
        this.tasks = [];
    }
    addTask(Task) {
        this.tasks.push(Task);
    }
    delTask(Task) {

    }
};