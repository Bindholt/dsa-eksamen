import Graph from "./model/graph.js";
import Stack from "./model/stack.js";
import * as view from "./view.js";
window.addEventListener("load", main);

let graph;
const changedCells = new Set();

function main() {
    view.attatchEventListeners();
    window.wilsonsAlgorithm = wilsonsAlgorithm;
    window.graph = graph;
}

function initGraph(rows, cols) {
    graph = new Graph(rows, cols);
    view.renderMaze(graph);
    wilsonsAlgorithm();
}

/* ----------------- WILSONS ALGORITHM START --------------- */ 
async function wilsonsAlgorithm() {
    const start = graph.getRandomNode();
    start.partOfMaze = true;
    changedCells.add(start);

    let unvisited = new Set(graph.nodes.values());
    unvisited.delete(start);

    while(unvisited.size > 0) {
        let randomCell = getRandomElementFromSet(unvisited);
        let path = await performRandomWalk(randomCell);
        await finalizeWalk(path, unvisited);
    }
}

async function performRandomWalk(currentCell) {
    let pathStack = new Stack();

    while (!currentCell.partOfMaze) {
        if(currentCell.partOfWalk) {
            eraseLoop(currentCell, pathStack);
        } else {
            pathStack.push(currentCell);
            currentCell.partOfWalk = true;
            changedCells.add(currentCell);
        }

        updateMaze();

        currentCell = graph.getRandomNeighbour(currentCell.x, currentCell.y);
        await sleep(10);
    }

    pathStack.push(currentCell);

    return pathStack;
}

function eraseLoop(target, stack) {
    let current = stack.head;
    const originalSize = stack.size;
    while (current && current.data !== target) {
        current.data.partOfWalk = false;
        changedCells.add(current.data);
        current = current.next;
        stack.size--;
    }

    if(!current) {
        stack.size = originalSize;
        return;
    }

    stack.head = current;
    
}

async function finalizeWalk(path, unvisited) {
    let current = path.head;
    let previous = null;
    while (current) {
        const data = current.data;
        data.partOfWalk = false; 
        data.partOfMaze = true;   
        changedCells.add(data);
        unvisited.delete(data);  
        
        const nextNode = current.next ? current.next.data : null;
        if (nextNode) {
            graph.createEdge(data.id, nextNode.id);
        }
        
        if(previous) {
            graph.createEdge(data.id, previous.id);
        }
        
        previous = data;
        current = current.next;
        updateMaze();
        await sleep(30);
    }
}
/* ----------------- WILSONS ALGORITHM END --------------- */ 

/* ----------------- A* ALGORITHM START --------------- */
//todo: implement a* algorithm
/* ----------------- A* ALGORITHM END --------------- */

/* ----------------- BFS ALGORITHM START --------------- */
//todo: implement bfs algorithm
/* ----------------- BFS ALGORITHM END --------------- */

/* ----------------- HELPERS START --------------- */ 

function getRandomElementFromSet(set) {
    const length = set.size;
    const randomIndex = Math.floor(Math.random() * length);

    let i = 0;
    for (let element of set) {
        if (i == randomIndex) {
            return element;
        }
        i++;
    }
}

function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}

function updateMaze() {
    view.updateMaze(graph, changedCells);
    changedCells.clear();
}

/* ----------------- HELPERS END --------------- */

export {initGraph}