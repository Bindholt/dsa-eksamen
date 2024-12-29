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

    createEdge(nodeId, neighbourId) {
        const neighbours = this.edges.get(nodeId);
        neighbours.push(neighbourId);
        this.edges.set(nodeId, neighbours);
    }
    
    getNode(x, y) {
        return this.nodes.get(`${x},${y}`);
    }

    getRandomNode() {
        const x = Math.floor(Math.random() * this.cols);
        const y = Math.floor(Math.random() * this.rows);
        return this.nodes.get(`${x},${y}`);
    }

    getNeighbours({x,y}) {
        const neighbours = [];
        const directions = {
            left: {dx: -1, dy: 0},
            right: {dx: 1, dy: 0},
            up: {dx: 0, dy: -1},
            down: {dx: 0, dy: 1}
        }

        for (const direction in directions) {
            const {dx, dy} = directions[direction];
            const x = x + dx;
            const y = y + dy;
            if (x >= 0 && x < this.cols && y >= 0 && y < this.rows) {
                neighbours.push(this.nodes.get(`${x},${y}`));
            }
        }

        return neighbours;
    }

    getRandomNeighbour({x,y}) {
        const directions = [
            {dx: -1, dy: 0},
            {dx: 1, dy: 0},
            {dx: 0, dy: -1},
            {dx: 0, dy: 1}
        ];

        const randomDirection = directions[Math.floor(Math.random() * directions.length)];
        const x = x + randomDirection.dx;
        const y = y + randomDirection.dy;

        if (x >= 0 && x < this.cols && y >= 0 && y < this.rows) {
            return this.nodes.get(`${x},${y}`);
        } else {
            return null;
        }
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
