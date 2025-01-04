import Graph from "./model/graph.js";
import Stack from "./model/stack.js";
import Queue from "./model/queue.js";
import PriorityQueue from "./model/minheap.js";
import * as view from "./view.js";
window.addEventListener("load", main);

let graph;
const changedCells = new Set();

const animationManager = {
    isPaused: false,
    stepMode: false,
    resolveStep: null,
    delayMs: 50
}

function main() {
    view.attatchEventListeners();
    window.wilsonsAlgorithm = wilsonsAlgorithm;
    window.graph = graph;
}

async function initGraph(rows, cols) {
    graph = new Graph(rows, cols);
    view.renderMaze(graph);
    await wilsonsAlgorithm();
    setStartAndGoal();
    view.setButtonsDisabled(false);
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

        currentCell = graph.getRandomGridNeighbourNode(currentCell.x, currentCell.y);
        await sleep();
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
        await sleep();
    }
}
/* ----------------- WILSONS ALGORITHM END --------------- */ 

/* ----------------- A* ALGORITHM START --------------- */
async function solveAStar() {
    reset();
    const start = graph.getStartNode();
    const goal = graph.getGoalNode();
    await aStar(start, goal, manhattanDistance);
}

async function reconstructPath(cameFrom, current) {
    const path = new Stack();
    path.push(current);

    while (cameFrom.has(current)) {
        current = cameFrom.get(current);
        path.push(current);

        current.partOfPath = true;
        changedCells.add(current);
        updateMaze();

        await sleep();
    }

    return path;
}

async function aStar(start, goal, heuristic) {
    const openSet = new PriorityQueue();
    start.fScore = heuristic(start, goal);
    openSet.insert(start);

    const cameFrom = new Map();

    let cycles = 0;
    while(openSet.size > 0) {
        const current = openSet.remove();
        current.partOfSearch = true;
        changedCells.add(current);
        updateMaze();
        await sleep();

        cycles++;
        view.updateAStarCycles(cycles);

        if(current === goal) {
            return reconstructPath(cameFrom, current);
        }
        
        for(const neighbour of graph.getNeighbourNodes(current.id)) {
            const tentativeGScore = current.gScore + current.weight;
            
            if(tentativeGScore < neighbour.gScore) {
                cameFrom.set(neighbour, current);
                neighbour.gScore = tentativeGScore;
                neighbour.fScore = neighbour.gScore + heuristic(neighbour, goal);
                
                if(!openSet.contains(neighbour)) {
                    openSet.insert(neighbour);
                }
            }
        }
    }

    return null;

}

function manhattanDistance(node, goal) {
    return Math.abs(node.x - goal.x) + Math.abs(node.y - goal.y);
}

/* ----------------- A* ALGORITHM END --------------- */

/* ----------------- BFS ALGORITHM START --------------- */
//todo: implement bfs algorithm

async function solveBFS() {
    reset();
    const start = graph.getStartNode();
    const goal = graph.getGoalNode();
    await BFS(start, goal);
}

async function BFS(current, goal) {
    const queue = new Queue();
    queue.add(current);
    const cameFrom = new Map();

    let cycles = 0;
    while(queue.size() > 0) {
        current = queue.dequeue();
        current.partOfSearch = true;
        changedCells.add(current);
        updateMaze();
        await sleep();

        cycles++;
        view.updateBFSCycles(cycles);
        if(current === goal) {
            console.log("Goal found!");
            return reconstructPath(cameFrom, current);
        }

        for(const neighbour of graph.getNeighbourNodes(current.id)) {
            if(!cameFrom.has(neighbour)) {
                neighbour.partOfSearch = true;
                changedCells.add(neighbour);
                updateMaze();
                cameFrom.set(neighbour, current);
                queue.add(neighbour);
            }
        }
    }
}

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

async function sleep() {
    while (animationManager.isPaused && !animationManager.stepMode) {
        await new Promise((r) => setTimeout(r, 10)); 
    }

    if (animationManager.stepMode) {
        animationManager.resolveStep = new Promise((r) => {
            animationManager._resolve = r;
        });
        await animationManager.resolveStep;
        animationManager.stepMode = false; // Reset step mode after stepping
    }

    return new Promise((resolve) => setTimeout(resolve, animationManager.delayMs));
}



function updateMaze() {
    view.updateMaze(graph, changedCells);
    changedCells.clear();
}

function setStartAndGoal() {
    const start = graph.getNode(0,0);
    let goal;
    if (Math.random() < 0.5) {
        const goalRow = Math.floor(Math.random() * graph.rows);
        goal = graph.getNode(graph.cols - 1, goalRow);
    } else {
        const goalCol = Math.floor(Math.random() * graph.cols);
        goal = graph.getNode(goalCol, graph.rows - 1);
    }
    start.start = true;
    //for A* algorithm
    start.gScore = 0;
    goal.goal = true;
    changedCells.add(start);
    changedCells.add(goal);
    updateMaze();
}

function reset() {
    for (const node of graph.nodes.values()) {
        if(node.partOfPath || node.partOfSearch) {
            node.gScore = Infinity;
            node.fScore = Infinity;
            node.partOfSearch = false;
            node.partOfPath = false;
            if(node.start) node.gScore = 0;
            changedCells.add(node);
        }
    }
    updateMaze();
}

/* ----------------- HELPERS END --------------- */

export {initGraph, solveAStar, solveBFS};