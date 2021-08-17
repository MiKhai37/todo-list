export default class Task {
    constructor(title, description = 'No description', project = 'No project', deadline='No deadline', isDone = false, priority = 'Normal') {
        this.title = title;
        this.description = description;
        this.project = project;
        this.deadline = deadline;
        this.isDone = isDone;
        this.priority = priority;
    }
};