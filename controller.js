import Graph from "./model/graph.js";
import Stack from "./model/stack.js";
import * as view from "./view.js";
import { getRandomElementFromSet } from "./helpers.js";
window.addEventListener("load", main);

let graph;
function main() {
    graph = new Graph(20,20);
    view.renderMaze(graph);

    window.wilsonsAlgorithm = wilsonsAlgorithm;
}

function wilsonsAlgorithm() {
    let visited = new Set();
    let unvisited = new Set(graph.nodes.keys());
    const start = graph.getRandomNode();
    visited.add(start.id);
    unvisited.delete(start.id);

    //while(unvisited) (this is commented as i want to do one step first.)

    let randomNode = getRandomElementFromSet(unvisited);
    let path = performRandomWalk(randomNode, visited);
}

function performRandomWalk(currentNode, visited) {
    let path = new Stack();

    while (!visited.has(currentNode)) {
        
    }


}