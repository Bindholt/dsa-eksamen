export default class MinHeap {
    heap;
    size;

    constructor() {
        this.heap = [];
        this.size = 0;
    }
    
    insert(data) {
        this.heap.push(data);
        this.size++;
        this.heapifyUp();
    }

    remove() {
        if (this.size === 0) {
            return null;
        }

        if (this.size === 1) {
            this.size--;
            return this.heap.pop();
        }

        const root = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.size--;
        this.heapifyDown();
        return root;
    }

    peek() {
        return this.heap[0];
    }

    contains(data) {
        return this.heap.includes(data);
    }

    heapifyUp() {
        let current = this.size-1;
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

        while(leftChild < this.size) {
            let smallestChild;

            if(rightChild < this.size && this.heap[rightChild].priority < this.heap[leftChild].priority) {
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
    }

} 