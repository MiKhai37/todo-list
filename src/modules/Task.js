export default class Task {
    constructor(title, description = 'No description', project = 'No project', dueDate='No date', priority = 'No priority') {
        this.title = title;
        this.description = description;
        this.project = project;
        this.dueDate = dueDate;
        this.priority = priority;
    }
};