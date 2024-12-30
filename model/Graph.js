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
        let neighbours = this.edges.get(nodeId);
        if (!neighbours) {
            neighbours = [];  // Initialize as an empty array if no neighbors exist.
            this.edges.set(nodeId, neighbours);
        }
        neighbours.push(neighbourId);  // Add the neighbor to the array.
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
            const neighbourX = x + dx;
            const neighbourY = y + dy;
            if (neighbourX >= 0 && neighbourX < this.cols && neighbourY >= 0 && neighbourY < this.rows) {
                neighbours.push(this.nodes.get(`${neighbourX},${neighbourY}`));
            }
        }

        return neighbours;
    }

    getRandomNeighbour(x, y) {
        const directions = [
            {dx: -1, dy: 0},
            {dx: 1, dy: 0},
            {dx: 0, dy: -1},
            {dx: 0, dy: 1}
        ];
    
        const validDirections = directions.filter(({dx, dy}) => {
            const neighbourX = x + dx;
            const neighbourY = y + dy;
            return neighbourX >= 0 && neighbourX < this.cols && neighbourY >= 0 && neighbourY < this.rows;
        });
    
        const randomDirection = validDirections[Math.floor(Math.random() * validDirections.length)];
        const neighbourX = x + randomDirection.dx;
        const neighbourY = y + randomDirection.dy;
    
        return this.nodes.get(`${neighbourX},${neighbourY}`);
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
    partOfWalk;
    partOfMaze;
    constructor(x, y) {
        this.id = `${x},${y}`;  
        this.x = x;
        this.y = y;
        this.partOfWalk = false;
        this.partOfMaze = false;
    }
}
