export default class Task {
    constructor(title, description = '', dueDate = '', priority = '', project = '') {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
    }
    get title() {
        return this.title;
    }
    set title(title) {
        this.title = title
    }
    get description() {
        return this.description;
    }
    set description(description) {
        this.description = description
    }
    get dueDate() {
        return this.dueDate;
    }
    set dueDate(dueDate) {
        this.dueDate = dueDate
    }
    get priority() {
        return this.priority;
    }
    set priority(priority) {
        this.priority = priority
    }
    get project() {
        return this.project;
    }
    set project(project) {
        this.project = project;
    }
};