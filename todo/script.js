class Todo {
    constructor(name, description, completed, priority, dueDate) {
        this.name = name;
        this.description = description;
        this.completed = completed;
        this.id = crypto.randomUUID();
        this.priority = priority;
        this.dueDate = dueDate;
    }
    info() {
        return `${this.name} : ${this.description}, is ${this.completed ? true : false}`
    }
}
let todo1 = new Todo("wash clothes", "description", false, 1, new Date('2026-03-06'));
let todo2 = new Todo("have lunch", "description", false, 1, new Date("2026-03-06"));
let todoList = [];
todoList.push(todo1);
todoList.push(todo2);
for (let todo of todoList) {
    let p = document.createElement('p');
    p.innerText = todo.name;
    let desc = document.createElement('p');
    desc.innerText = todo.description;
    desc.style.display = 'none';
    let detailsButton = document.createElement('button');
    detailsButton.innerText = 'See details';
    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete todo'
    document.body.appendChild(p);
    document.body.appendChild(desc);
    document.body.appendChild(detailsButton);
    document.body.appendChild(deleteButton);
    deleteButton.addEventListener('click', () => {
        p.remove();
        desc.remove();
        deleteButton.remove();
        detailsButton.remove();
    })
    detailsButton.addEventListener('click', () => {
        desc.style.display = desc.style.display === 'none' ? 'block' : 'none';
    })
}