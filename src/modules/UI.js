import Project from "./Project";
import Task from "./Task";

export default class UI {
    constructor() {

    }
    createHeader() {
        const header = document.createElement('div');
        header.classList.add('top-nav');
        header.innerHTML = `<h1>Project Mangager</h1>`;
        return header;
    }
    createFooter() {
        const footer =  document.createElement('div');
        footer.classList.add('bottom-nav');
        footer.innerHTML = 'Made by Michael Tanguy <a href="https://github.com/MiKhai37" target="_blank"><i class="fa fa-github"></i></a>';
        return footer;
    }
}