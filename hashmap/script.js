class hashMap {
    constructor(capacity = 16, loadFactor = 0.75) {
        this.capacity = Math.max(1, Math.floor(capacity));
        this.loadFactor = loadFactor;
        this.buckets = Array.from({ length: this.capacity }, () => []);
        this.size = 0;
    }

    // Hash with modulo inside loop to avoid overflow for long keys
    hash(key) {
        if (typeof key !== 'string') throw new TypeError('Keys must be strings');
        const prime = 31;
        let hashCode = 0;
        for (let i = 0; i < key.length; i++) {
            hashCode = (prime * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }

    _resize() {
        const old = this.buckets;
        this.capacity *= 2;
        this.buckets = Array.from({ length: this.capacity }, () => []);
        this.size = 0;
        for (const bucket of old) {
            for (const [k, v] of bucket) {
                this.set(k, v);
            }
        }
    }

    set(key, value) {
        if (typeof key !== 'string') throw new TypeError('Keys must be strings');
        const idx = this.hash(key);
        const bucket = this.buckets[idx];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }
        bucket.push([key, value]);
        this.size++;
        if (this.size / this.capacity > this.loadFactor) this._resize();
    }

    // Return value for key or null if not found
    get(key) {
        if (typeof key !== 'string') return null;
        const idx = this.hash(key);
        const bucket = this.buckets[idx];
        if (!bucket) return null;
        for (const [k, v] of bucket) {
            if (k === key) return v;
        }
        return null;
    }

    has(key) {
        if (typeof key !== 'string') return false;
        const idx = this.hash(key);
        const bucket = this.buckets[idx];
        if (!bucket) return false;
        for (const [k] of bucket) if (k === key) return true;
        return false;
    }

    remove(key) {
        if (typeof key !== 'string') return false;
        const idx = this.hash(key);
        const bucket = this.buckets[idx];
        if (!bucket) return false;
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                this.size--;
                return true;
            }
        }
        return false;
    }

    length() {
        return this.size;
    }

    clear() {
        this.buckets = Array.from({ length: this.capacity }, () => []);
        this.size = 0;
    }

    keys() {
        const out = [];
        for (const b of this.buckets) for (const [k] of b) out.push(k);
        return out;
    }

    values() {
        const out = [];
        for (const b of this.buckets) for (const [, v] of b) out.push(v);
        return out;
    }

    entries() {
        const out = [];
        for (const b of this.buckets) for (const [k, v] of b) out.push([k, v]);
        return out;
    }
}

if (typeof module !== 'undefined' && module.exports) module.exports = hashMap;