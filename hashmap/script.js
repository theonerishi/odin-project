class Node {
    constructor(key, value = null, count = 1, next = null) {
        if (arguments.length === 1 || arguments.length === 2) {
            this.data = key;
            this.next = value || null;
        } else {
            this.key = key;
            this.value = value;
            this.count = count;
            this.next = next;
        }
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
class HashMap {
    constructor(capacity = 16, loadFactor = 0.75, isHashSet = false) {
        this.capacity = capacity;
        this.loadFactor = loadFactor;
        this.isHashSet = isHashSet;
        this.buckets = [];
        this.size = 0;
        this.clear();
    }

    hash(key) {
        if (typeof key !== 'string') throw new TypeError('Keys must be strings');
        const prime = 27;
        let hashCode = 0;
        for (let i = 0; i < key.length; i++) {
            hashCode = (prime * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }

    set(key, value) {
        if (typeof key !== 'string') throw new TypeError('Keys must be strings');
        const idx = this.hash(key);
        let bucket = this.buckets[idx];

        for (let ptr = bucket; ptr != null; ptr = ptr.next) {
            if (ptr.key === key) {
                if (ptr.value === value) {
                    ptr.count++;
                } else {
                    ptr.value = value;
                    ptr.count = 1;
                }
                return;
            }
        }

        const newNode = this.isHashSet
            ? new Node(key, null, 1, bucket)
            : new Node(key, value, 1, bucket);
        this.buckets[idx] = newNode;
        this.size++;

        if (this.size > this.capacity * this.loadFactor) {
            const oldBuckets = this.buckets;
            this.capacity *= 2;
            this.buckets = new Array(this.capacity).fill(null);

            for (const bucket of oldBuckets) {
                let ptr = bucket;
                while (ptr) {
                    const next = ptr.next;
                    const newIdx = this.hash(ptr.key);
                    ptr.next = this.buckets[newIdx];
                    this.buckets[newIdx] = ptr;
                    ptr = next;
                }
            }
        }
    }

    get(key) {
        if (typeof key !== 'string') return null;
        if (this.isHashSet) return null;
        const idx = this.hash(key);
        for (let ptr = this.buckets[idx]; ptr != null; ptr = ptr.next) {
            if (ptr.key === key) return ptr.value;
        }
        return null;
    }

    has(key) {
        if (typeof key !== 'string') return false;
        const idx = this.hash(key);
        for (let ptr = this.buckets[idx]; ptr != null; ptr = ptr.next) {
            if (ptr.key === key) return true;
        }
        return false;
    }

    remove(key) {
        if (typeof key !== 'string') return false;
        const idx = this.hash(key);
        let ptr = this.buckets[idx];

        if (!ptr) return false;
        if (ptr.key === key) {
            this.buckets[idx] = ptr.next;
            this.size--;
            return true;
        }

        while (ptr.next) {
            if (ptr.next.key === key) {
                ptr.next = ptr.next.next;
                this.size--;
                return true;
            }
            ptr = ptr.next;
        }

        return false;
    }

    length() {
        return this.size;
    }

    clear() {
        this.buckets = new Array(this.capacity).fill(null);
        this.size = 0;
    }

    keys() {
        const out = [];
        for (const bucket of this.buckets) {
            for (let ptr = bucket; ptr != null; ptr = ptr.next) {
                out.push(ptr.key);
            }
        }
        return out;
    }

    values() {
        const out = [];
        for (const bucket of this.buckets) {
            for (let ptr = bucket; ptr != null; ptr = ptr.next) {
                out.push(ptr.value);
            }
        }
        return out;
    }

    entries() {
        const out = [];
        for (const bucket of this.buckets) {
            for (let ptr = bucket; ptr != null; ptr = ptr.next) {
                out.push([ptr.key, ptr.value]);
            }
        }
        return out;
    }
    findCapacity() {
        return this.capacity;
    }
}
let pre = document.createElement('pre');
document.body.appendChild(pre);
let test = new HashMap();
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
pre.textContent += test.findCapacity() + '\n';
for (const entry of test.entries()) {
    pre.textContent += entry + '\n';    
}
test.set('moon', 'silver');
pre.textContent += test.findCapacity();

