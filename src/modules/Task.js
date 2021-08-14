export default class Task {
    constructor(title, description = '', project = '') {
        this.title = title;
        this.description = description;
        this.project = project;
    }
};