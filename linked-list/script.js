class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
} // define node structure

class LinkedList { // linked list class with methods
    constructor(parent = document.body) { // allows you to store output in an element
        this.head = null; // initially null needs append to make the linked list
        this.output = document.createElement('pre'); // stores output
        parent.appendChild(this.output);
    }

    append(data) { 
        if (!this.head) {
            this.head = new Node(data); // if there isn't a linked list make one with a node
        } else {
            let ptr = this.head;
            while (ptr.next) {
                ptr = ptr.next;
            } // travel to end of list
            ptr.next = new Node(data); // add node at end of linked list
        }
        this.render(); // render method prints values
    }

    prepend(data) {
        this.head = new Node(data, this.head); // prepending a node is fast create new node and make the next pointer point to the head of linked list
        this.render();
    }

    size() {
        let count = 0;
        let ptr = this.head;
        while (ptr) {
            count++;
            ptr = ptr.next;
        }
        return count; // count variable can count number of nodes in linked list
    }

    print() {
        return this.toString();
    }

    headValue() {
        return this.head ? this.head.data : null;
    }

    tail() {
        if (!this.head) return null;
        let ptr = this.head;
        while (ptr.next) {
            ptr = ptr.next;
        }
        return ptr.data;
    }

    at(index) {
        let ptr = this.head;
        for (let i = 0; ptr && i < index; i++) { // indexing starts from 0 so the index must be position - 1 
            ptr = ptr.next;
        }
        return ptr ? ptr.data : null;
    }

    pop() {
        if (!this.head) return null; // if there is no list then there is no value to return
        if (!this.head.next) {
            const removed = this.head.data;
            this.head = null;
            this.render();
            return removed;
        } // to return first element

        let ptr = this.head;
        while (ptr.next.next) {
            ptr = ptr.next;
        } // go through list till last element
        const removed = ptr.next.data; // retrieve details of last element then remove
        ptr.next = null; 
        this.render();
        return removed;
    }

    contains(x) {
        for (let ptr = this.head; ptr != null; ptr = ptr.next) { // go through each element
            if (ptr.data === x) { // if match found return true
                return true;
            }
        }
        return false; // if no match found return false
    }

    findIndex(s) {
        let count = 0;
        for (let ptr = this.head; ptr != null; ptr = ptr.next) { // move through linked list
            if (s === ptr.data) { // if match found return count that will be the index
                return count;
            }
            count++;
        }
        return -1; // if no match found return -1
    }

    toString() {
        let str = ''; // start with empty string and add data of elements with an arrow if needed
        let ptr = this.head;
        while (ptr) {
            str += ptr.data;
            ptr = ptr.next;
            if (ptr) str += ' -> ';
        }
        return str;
    }

    insertAt(index, ...values) {
        if (index < 0 || index > this.size()) return; // invalid index return

        if (index === 0) {
            let currentHead = this.head;
            for (let i = values.length - 1; i >= 0; i--) {
                currentHead = new Node(values[i], currentHead);
            }
            this.head = currentHead; // add elements from last to first
        } else {
            let ptr = this.head;
            for (let i = 0; i < index - 1; i++) { // move pointer to 1 before index
                ptr = ptr.next;
            }

            let nextNode = ptr.next;
            for (let i = values.length - 1; i >= 0; i--) {
                nextNode = new Node(values[i], nextNode); // add elements in array from last to first
            }
            ptr.next = nextNode;
        }
        this.render();
    }

    removeAt(index) {
        if (index < 0 || index >= this.size()) return;

        if (index === 0) {
            this.head = this.head.next; // prepend if at beginning
        } else {
            let ptr = this.head;
            for (let i = 0; i < index - 1; i++) {
                ptr = ptr.next;
            } // go to index
            ptr.next = ptr.next.next; // change pointer to skip node
        }
        this.render();
    }

    render() {
        this.output.textContent = this.toString();
    }
}

const container = document.createElement('div');
document.body.appendChild(container);

const ll = new LinkedList(container);
ll.append(4);
ll.append(3);
ll.append(7);

const list = new LinkedList(container);
list.append('dog');
list.append('cat');
list.append('parrot');
list.append('hamster');
list.append('snake');
list.append('turtle');

console.log(ll.toString());
console.log(list.toString());