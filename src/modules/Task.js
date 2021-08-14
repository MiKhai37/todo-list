export default class Task {
    constructor(title, description = '', project = 'normal') {
        this.title = title;
        this.description = description;
        this.project = project;
    }
};