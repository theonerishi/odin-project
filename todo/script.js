// Todo class: holds the data for a single todo item
class Todo {
    // name: string, description: string, completed: boolean,
    // priority: number, dueDate: Date|null
    constructor(name, description, completed, priority, dueDate) {
        this.name = name;
        this.description = description;
        this.completed = completed;
        // unique id to allow deletion and comparisons
        this.id = crypto.randomUUID();
        this.priority = priority;
        this.dueDate = dueDate;
    }

    // Convenience method to return a readable info string
    info() {
        return `${this.name} : ${this.description}, is ${this.completed ? true : false}`;
    }
}

// Sample todos used when there is no saved data
let todo1 = new Todo("wash clothes", "Use detergent and dryer", false, 1, new Date('2026-03-06'));
let todo2 = new Todo("have lunch", "Try the new cafe", false, 1, new Date("2026-03-06"));
let todoList = [todo1, todo2]; // default project with two todos

// UI/project state variables
let projectCounter = 0; // tracks last project index
let currentProjectIndex = 0; // index to display array within the projects array
let projects = [];
projects.push(todoList); // push default sample project

// Load persisted projects from localStorage (JSON), if present
const storedProjects = localStorage.getItem('projects');
if (storedProjects) {
    try {
        const parsed = JSON.parse(storedProjects); // parse JSON string into array
        // Use parsed value only when it's an array; otherwise keep defaults
        projects = Array.isArray(parsed) ? parsed : projects;
    } catch (error) {
        // If parsing fails, leave `projects` as the default and warn in console
        console.warn('Failed to parse saved projects, using defaults.', error);
    }
} else {
    // No saved projects yet: save the default `projects` to localStorage
    localStorage.setItem('projects', JSON.stringify(projects));
}

// Container element for app UI; falls back to document.body when element missing
const container = document.getElementById('todoContainer') || document.body;

const form = document.createElement('div');
form.id = 'todoForm';

const addProjectButton = document.createElement('button');
addProjectButton.innerText = 'New Project';
addProjectButton.style.display = 'block'; // new project button

let projectdisplay = document.createElement('p');
projectdisplay.style.fontSize = '14px';
projectdisplay.innerText = 'Project 1'; // displays project number

const projectSelect = document.createElement('select'); // project selector
function updateProjectSelect() {
    projectSelect.innerHTML = '';
    for (let i = 0; i < projects.length; i++) { // loops through projects array to list and select projects
        const opt = document.createElement('option');
        opt.value = i;
        opt.innerText = `Project ${i + 1}`;
        if (i === currentProjectIndex) opt.selected = true;
        projectSelect.appendChild(opt);
    }
}
updateProjectSelect();

addProjectButton.addEventListener('click', (e) => {
    e.preventDefault();
    projects.push([]); // adds new array to projects
    projectCounter = projects.length - 1;
    currentProjectIndex = projectCounter;
    projectdisplay.innerText = `Project ${currentProjectIndex + 1}`; // displays current project number
    updateProjectSelect(); // updates select
    renderTodos(); // render todos in current project
});

projectSelect.addEventListener('change', () => {
    currentProjectIndex = parseInt(projectSelect.value, 10);
    projectdisplay.innerText = `Project ${currentProjectIndex + 1}`;
    renderTodos();// if select changes set index to project index and rerender todos
});

container.appendChild(projectdisplay);
container.appendChild(addProjectButton);
container.appendChild(projectSelect);
container.appendChild(form);

const nameInput = document.createElement('input');
nameInput.type = 'text';
nameInput.placeholder = 'Todo name';
nameInput.required = true;
form.appendChild(nameInput);

const descInput = document.createElement('input');
descInput.type = 'text';
descInput.placeholder = 'Todo description';
form.appendChild(descInput);

const completedLabel = document.createElement('label');
const completedCheckbox = document.createElement('input');
completedCheckbox.type = 'checkbox';
completedLabel.appendChild(completedCheckbox);
completedLabel.appendChild(document.createTextNode(' Completed'));
form.appendChild(completedLabel);

const prioritySelect = document.createElement('select');
for (let i = 1; i <= 3; i++) {
    const opt = document.createElement('option');
    opt.value = i;
    opt.innerText = `Priority ${i}`;
    prioritySelect.appendChild(opt); // todo has three priority levels
}
form.appendChild(prioritySelect);



const dueDateInput = document.createElement('input');
dueDateInput.type = 'date';
form.appendChild(dueDateInput); // input type date to use a date selector

const addButton = document.createElement('button');
addButton.type = 'button';
addButton.innerText = 'Add Todo';
form.appendChild(addButton); 

container.appendChild(form);

const listDiv = document.createElement('div');
listDiv.id = 'todoList';
container.appendChild(listDiv);

function formatDate(d) {
    if (!d) return '';
    const dt = new Date(d);
    if (isNaN(dt)) return '';
    return dt.toLocaleDateString();
}

// save projects in local storage
function saveProjects() {
    localStorage.setItem('projects', JSON.stringify(projects));
}


function renderTodos() {
    listDiv.innerHTML = '';
    const currentTodos = projects[currentProjectIndex] || []; // only selects todos in the current project
    for (const todo of currentTodos) {
        const wrapper = document.createElement('div');
        wrapper.className = 'todoItem';

        const title = document.createElement('p');
        title.innerText = todo.name;
        wrapper.appendChild(title);

        const details = document.createElement('div');
        details.style.display = 'none';

        const desc = document.createElement('p');
        desc.innerText = todo.description || '';
        details.appendChild(desc);

        const due = document.createElement('p');
        due.innerText = todo.dueDate ? `Due: ${formatDate(todo.dueDate)}` : '';
        details.appendChild(due);

        const detailsButton = document.createElement('button');
        detailsButton.innerText = 'See details';
        detailsButton.addEventListener('click', () => {
            details.style.display = details.style.display === 'none' ? 'block' : 'none'; // toggle display
        });

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete todo';
        deleteButton.addEventListener('click', () => {
            projects[currentProjectIndex] = projects[currentProjectIndex].filter(t => t.id !== todo.id); // keeps todo if id not equal to that of deleted todo
            saveProjects();
            renderTodos();
        });

        wrapper.appendChild(detailsButton);
        wrapper.appendChild(deleteButton);
        wrapper.appendChild(details);

        listDiv.appendChild(wrapper);
    }
    saveProjects();
}

// add todo button- trims input and pushes to array
addButton.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (!name) {
        alert('Please enter a todo name');
        return;
    }
    const description = descInput.value.trim();
    const completed = completedCheckbox.checked;
    const priority = parseInt(prioritySelect.value, 10) || 1;
    const dueDate = dueDateInput.value ? new Date(dueDateInput.value) : null;

    const newTodo = new Todo(name, description, completed, priority, dueDate);
    projects[currentProjectIndex].push(newTodo);
    nameInput.value = '';
    descInput.value = '';
    completedCheckbox.checked = false;
    prioritySelect.selectedIndex = 0;
    dueDateInput.value = '';
    renderTodos();
});

// Initial render to display todos when the page loads
renderTodos();