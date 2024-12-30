export default class Stack {
    head = null;
    size = 0;

    constructor(){

    }

    push(data) {
        const node = new Node(data)
        if(this.head) {
            node.next = this.head
        }

        this.head = node;
        this.size++;
    }

    pop() {
        if(!this.head) {
            return null;
        }
        const node = this.head;
        this.head = this.head.next;
        this.size--;
        return node.data;
    }

    eraseWalkLoop(target) {
        let current = this.head;
        const originalSize = this.size;
        while (current && current.data !== target) {
            current = current.next;
            this.size--;
        }

        if(!current) {
            this.size = originalSize;
            return;
        }

        this.head = current;
    }

    getSize() {
        return this.size;
    }

    peek() {
        return this.head.data;
    }

    clear() {
        this.head = null;
        this.size = 0;
    }


    dumpList(){
        if(this.head) {
            let current = this.head;
            let dump = "";
            while(current) {
                dump += current.data + " ";
                current = current.next;
            }
            return dump;
        }
    }
}

class Node {
    next = null;
    data = null;

    constructor(data, next) {
        this.data = data;
        this.next = next;
    }
}