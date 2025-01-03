export default class DoublyLinkedList {
    head = null;
    tail = null;

    constructor(...nodes) {
        if (nodes.length > 0) {
            this.head = nodes[0]
            this.tail = nodes[0]
            for (let i = 1; i < nodes.length; i++) {
                nodes[i].prev = this.tail;
                this.tail.next = nodes[i];
                this.tail = nodes[i];
            }
        }
    }

    addNodeLast(node) {
        if(!!this.head) {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        } else {
            this.head = node;
            this.tail = node;
        }

    }

    addLast(data) {
        const node = new Node(data);
        this.addNodeLast(node);
    }

    removeLast() {
        if (!this.tail) return;

        const removed = this.tail.data;

        if (this.head === this.tail) {
            this.clear();
        } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
        }
    
        return removed;
    }

    addNodeFirst(node) {
        if(!!this.head) {
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
        } else {
            this.head = node;
            this.tail = node;
        }

    }

    addFirst(data) {
        const node = new Node(data);
        this.addNodeFirst(node);
    }

    removeFirst() {
        if(!this.head) return;

        const removed = this.head.data;

        if(this.head === this.tail) {
            this.clear();
        } else {
            this.head = this.head.next;
            this.head.prev = null;
        }
        return removed;
    }

    insertBeforeNode(nodeNew, nodeAfter) {
        nodeNew.next = nodeAfter;
        if(this.head == nodeAfter) {
            this.head = nodeNew;
        } else {
            nodeNew.prev = nodeAfter.prev;
            nodeAfter.prev.next = nodeNew;
        }
    }

    insertAfterNode(nodeNew, nodeBefore) {
        nodeNew.prev = nodeBefore;
        nodeNew.next = nodeBefore.next;
        if(!nodeBefore.next) {
            this.tail = nodeNew;
        } else {
            nodeBefore.next.prev = nodeNew;
        }
        nodeBefore.next = nodeNew;
    }

    insertAfter(index, data) {
        const node = new Node(data);
        const nodeBefore = this.nodeAt(index);
        if(!!nodeBefore) {
            this.insertAfterNode(node, nodeBefore);
        }
    }

    insertBefore(index, data) {
        const node = new Node(data);
        const nodeAfter = this.nodeAt(index);
        if(!!nodeAfter) {
            this.insertBeforeNode(node, nodeAfter);
        }
    }
    
    first() {
        return this.head.data;
    }

    last() {
        return this.tail.data;
    }

    remove(data) {
        let node = this.head;
        while(!!node) {
            if(node.data === data) {
                this.removeNode(node);
                return true;
            }
            node = node.next;
        }

        return false;
    }

    removeIndex(index) {
        let node = this.nodeAt(index);
        if(!!node) {
            this.removeNode(node);
            return true;
        }

        return false;
    }

    removeFirst() {
        if (this.head === this.tail) {
            this.clear();
            return;
        }

        this.head = this.head.next;
        this.head.prev = null;
    }

    removeLast() {
        if (this.head === this.tail) {
            this.clear();
            return;
        }

        this.tail = this.tail.prev;
        this.tail.next = null;
    }
    
    clear() {
        this.head = null;
        this.tail = null;
    }

    removeNode(node) {
        const prev = node.prev;
        const next = node.next;

        if(!!prev) {
            prev.next = next;
        } else {
            this.head = next;
        }

        if(!!next) {
            next.prev = prev;
        } else {
            this.tail = prev;
        }
    }

    swapNodes(node1, node2) {
        const dataNode1 = node1.data
        node1.data = node2.data;
        node2.data = dataNode1;
    }

    size() {
        let length = 0;
        let node = this.head;
        while (!!node) {
            length++;
            node = node.next;
        }

        return length;
    }

    nodeAt(index) {
        let node = this.head;
        for (let i = 0; i < index; i++) {
            if(node == null) return;
            node = node.next;
        }

        return node;
    }

    get(index) {
        const node = this.nodeAt(index);
        return node.data;
    }

    indexOf(data) {
        let index = 0;
        let node = this.head;
        while (!!node) {
            if (node.data === data) {
                return index;
            }
            index++;
            node = node.next;
        }

        return -1;
    }

    dumpList() {
        let node = this.head;
        let listDump = (!!node) ? `Data: ${node.data}, prev: ${(node.prev) ? node.prev.data : ""}, next: ${(node.next) ? node.next.data : ""}\n` : "Nothing to see here!" 
        while(!!node) {
            if (node != this.head) {
                listDump += `Data: ${node.data}, prev: ${(node.prev) ? node.prev.data : ""}, next: ${(node.next) ? node.next.data : ""}\n`
            }
            node = node.next;
        }
        console.log(listDump);
    }
}

class Node {
    prev = null;
    next = null;
    data;

    constructor(data) {
        this.data = data;
    }
}