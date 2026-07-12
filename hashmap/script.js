let div = document.createElement('div');
class hashMap {
    constructor(capacity, loadFactor) {
        this.capacity = capacity;
        this.loadFactor = loadFactor;
        this.buckets = [];
        clear();
    }
    hash(key) {
        let hashCode;
        let primeNumber = 27;
        for (let i = 0; i < key.length; i++) {
            hashcode = primeNumber * hashCode + key.charCodeAt(i);
        }
        hashCode %= this.capacity;
        return hashCode;
    }
    set(key, value) {
        let hashCode = hash(key);
        let tmp = [];
        tmp.push(value);
        this.buckets[hashCode].push(tmp);
    }
    get(key) {
        if (key >= this.buckets.length || key < 0) return;
        return this.buckets[key];
    }
    has(key) {
        if(get(key)) {
            return true;
        } else {
            return false;
        }
    }
    length() {
        return this.buckets.length;
    }
    clear() {
        this.buckets = [];
        for (let i = 0; i < capacity; i++) {
            this.buckets.push([]);
        }
    }
    keys() {
        for (let i = 0; i < capacity; i++) {
            div.innerText += `${this.buckets[i]}\n`;
        }
    }
    values() {
        keys();
    }
    
}