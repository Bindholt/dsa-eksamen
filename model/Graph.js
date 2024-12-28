export default class Lattice2DGraph {
    nodes;
    edges;
    rows;
    cols;

    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.nodes = new Map();
        this.edges = new Map();
        this.createNodes();
        this.createEdges();
    }

    createNodes() {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                const node = new Node(x, y);
                this.nodes.set(node.id, node);
            }
        }
    }

    createEdges() {
        for(const node of this.nodes.values()) {
            const neighbours = this.getNeighbours(node);
            this.edges.set(node.id, neighbours);
        }
    }
    

    getNeighbours(node) {
        const neighbours = [];
        const directions = {
            left: [-1,0],
            right: [1,0],
            up: [0,-1],
            down: [0,1]
        }

        for (const direction in directions) {
            const [dx, dy] = directions[direction];
            const x = node.x + dx;
            const y = node.y + dy;
            if (x >= 0 && x < this.cols && y >= 0 && y < this.rows) {
                neighbours.push(this.nodes.get(`${x},${y}`));
            }
        }

        return neighbours;
    }

    getNodeNeighbors(nodeId) {
        return this.edges.get(nodeId);
    }

    dumpNodes() {
        for (const node of this.nodes.values()) {
            console.log(node);
        }
    }

    dumpEdges() {
        for (const [node, neighbours] of this.edges.entries()) {
            console.log(node, neighbours);
        }
    }


}

class Node {
    id;
    x;
    y;
    constructor(x, y) {
        this.id = `${x},${y}`;  
        this.x = x;
        this.y = y;
    }
}
