export default class Project {
    constructor(title, description = '', priority = '') {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.tasks = [];
    }
    addTask(Task){
        this.tasks.push(Task);
        Task.project = this.title;
    }
};