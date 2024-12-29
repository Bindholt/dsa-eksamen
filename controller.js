import Graph from "./model/Graph.js";
import * as view from "./view.js";
window.addEventListener("load", main);

function main() {
    const graph = new Graph(20,20);
    view.renderMaze(graph);
}

