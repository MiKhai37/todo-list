import './style.css';

function component() {
    const element = document.createElement('div');
    
    
    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = "<h1>ToDo App</h1>"
    return element;
  }
  
  document.body.appendChild(component());