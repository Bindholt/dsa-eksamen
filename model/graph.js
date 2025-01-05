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

    createEdge(nodeId, neighbourId) {
        let neighbours = this.edges.get(nodeId);
        if (!neighbours) {
            neighbours = []; 
            this.edges.set(nodeId, neighbours);
        }
        neighbours.push(neighbourId); 
    }
    
    getNode(x, y) {
        return this.nodes.get(`${x},${y}`);
    }

    getRandomNode() {
        const x = Math.floor(Math.random() * this.cols);
        const y = Math.floor(Math.random() * this.rows);
        return this.nodes.get(`${x},${y}`);
    }

    getNeighbourNodes(nodeId) {
        const neighbours = [];
        const connectedNodes = this.getNeighbourIDs(nodeId);
        if (connectedNodes) {
            for (const neighbourId of connectedNodes) {
                neighbours.push(this.nodes.get(neighbourId));
            }
        }
        return neighbours;
    }

    getNeighbourIDs(nodeId) {
        return this.edges.get(nodeId);
    }

    getRandomGridNeighbourNode(x, y) {
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

    getStartNode() {
        for (const node of this.nodes.values()) {
            if (node.start) return node;
        }
    }

    getGoalNode() {
        for (const node of this.nodes.values()) {
            if (node.goal) return node;
        }
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
    start;
    goal;
    //Wilsons Algorithm
    partOfWalk;
    partOfMaze;
    //A*/BFS Algorithm
    weight;
    gScore;
    fScore;
    partOfSearch;
    partOfPath;
    
    constructor(x, y) {
        this.id = `${x},${y}`;  
        this.x = x;
        this.y = y;
        this.start = false;
        this.goal = false;
        this.partOfWalk = false;
        this.partOfMaze = false;
        this.partOfSearch = false;
        this.partOfPath = false;
        this.weight = 1;
        this.gScore = Infinity;
        this.fScore = Infinity;
    }
}
