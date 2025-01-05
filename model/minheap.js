export default class MinHeap {
    heap;
    indexMap;

    constructor() {
        this.heap = [];
        this.indexMap = new Map();
    }
    
    insert(data) {
        this.heap.push(data);
        this.indexMap.set(data.id, this.heap.length-1);
        this.heapifyUp();
    }

    remove() {
        if (this.heap.length === 0) return null;

        if (this.heap.length === 1) {
            const data = this.heap.pop();
            this.indexMap.delete(data.id);
            return data;
        }

        const root = this.heap[0]; //save our root (min value) to return later
        this.heap[0] = this.heap.pop(); //replace root node with last node, to maintain complete tree
        this.indexMap.delete(root.id); 
        if(this.heap.length > 0) {
            this.heapifyDown();
        }
        return root;
    }

    peek() {
        return this.heap[0];
    }

    size() {
        return this.heap.length;
    }

    contains(data) {
        return this.indexMap.has(data.id);
    }

    heapifyUp() {
        let current = this.heap.length-1;
        let parent = this.parentIndex(current);

        while(current > 0 && this.heap[current].priority < this.heap[parent].priority) {
            this.swap(current, parent);
            current = parent;
            parent = this.parentIndex(current);
        }
    }

    heapifyDown() {
        let current = 0;
        let leftChild = this.leftChildIndex(current);
        let rightChild = this.rightChildIndex(current);

        while(leftChild < this.heap.length) {
            let smallestChild;

            if(rightChild < this.heap.length && this.heap[rightChild].priority < this.heap[leftChild].priority) {
                smallestChild = rightChild;
            } else {
                smallestChild = leftChild;
            }

            if(this.heap[smallestChild].priority < this.heap[current].priority) {
                this.swap(smallestChild, current);
                current = smallestChild;
                leftChild = this.leftChildIndex(current);
                rightChild = this.rightChildIndex(current);
            } else {
                break;
            }
        }
    }
    
    parentIndex(index) {
        return Math.floor((index - 1) / 2);
    }

    leftChildIndex(index) {
        return 2 * index + 1;
    }

    rightChildIndex(index) {
        return 2 * index + 2;
    }

    swap(i, j) {
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;

        this.indexMap.set(this.heap[i].id, i);
        this.indexMap.set(this.heap[j].id, j);
    }

} 