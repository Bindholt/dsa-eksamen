import * as controller from './controller.js';

function renderMaze(graph) {
    const { rows, cols } = graph;
    const mazeDiv = document.querySelector("#maze");
    mazeDiv.innerHTML = "";

    for (let row = 0; row < rows; row++) {
        const rowDiv = document.createElement("div");
        for (let col = 0; col < cols; col++) {
            const cellDiv = document.createElement("div");
            const cell = graph.getNode(col, row); 
            cellDiv.id = "id" + cell.id.replace(",", "-");
            cellDiv.addEventListener("click", () => {
                controller.changeWeight(cell);
            });
            const cellWeight = document.createElement("div");
            cellWeight.textContent = cell.weight;
            cellWeight.className = "cell-weight";
            cellDiv.appendChild(cellWeight);
            updateCell(graph, cell, cellDiv);
            rowDiv.appendChild(cellDiv);
        }
        mazeDiv.appendChild(rowDiv);
    }
}

function updateMaze(graph, updatedCells) {
    for (const { y:row, x:col } of updatedCells) {
        const cell = graph.getNode(col, row); 
        const cellDiv = document.querySelector("#id" + cell.id.replace(",", "-")); 
        if (cellDiv) {
            updateCell(graph, cell, cellDiv);
        }
    }
}

function updateWeight(node) {
    const cellDiv = document.querySelector("#id" + node.id.replace(",", "-"));
    cellDiv.querySelector(".cell-weight").textContent = node.weight;
}

function updateAStarExplorationCost(explorationCost) {
    document.querySelector("#a-star-exploration-cost").textContent = "Exploration cost: " + explorationCost;
}

function updateBFSExplorationCost(explorationCost) {
    document.querySelector("#bfs-exploration-cost").textContent = "Exploration cot: " + explorationCost;
}

function updateCell(graph, cell, cellDiv) {
    const directions = [
        { name: 'north', col: 0, row: -1 },
        { name: 'south', col: 0, row: 1 },
        { name: 'west', col: -1, row: 0 },
        { name: 'east', col: 1, row: 0 }
    ];

    const { x: col, y: row, id: cellId } = cell;
    const cellEdges = graph.edges.get(cellId);

    cellDiv.className = "cell";

    if(cell.partOfMaze) cellDiv.classList.add("partOfMaze");
    if(cell.partOfWalk) cellDiv.classList.add("partOfWalk");
    if(cell.partOfSearch) cellDiv.classList.add("partOfSearch");
    if(cell.partOfPath) cellDiv.classList.add("partOfPath");
    if(cell.start) cellDiv.classList.add("start");
    if(cell.goal) cellDiv.classList.add("goal");

    if (!cellEdges) {
        cellDiv.classList.add(...directions.map(d => d.name));
    } else {
        for (const d of directions) {
            const neighborCol = col + d.col;
            const neighborRow = row + d.row;

            if (neighborCol >= 0 && neighborCol < graph.cols && 
                neighborRow >= 0 && neighborRow < graph.rows) {
                const neighbor = graph.getNode(neighborCol, neighborRow);
                if (!cellEdges.includes(neighbor.id)) {
                    cellDiv.classList.add(d.name);
                }
            } else {
                cellDiv.classList.add(d.name);
            }
        }
    }
}

function init() {
    document.querySelector("#generate").addEventListener("click", () => {
        setButtonsDisabled(true);
        const rows = document.querySelector("#rows").value;
        const cols = document.querySelector("#cols").value;
        controller.initGraph(rows, cols);
    });
    document.querySelector("#solve-a-star").addEventListener("click", () => {
        controller.solveAStar();
    });

    document.querySelector("#solve-bfs").addEventListener("click", () => {
        controller.solveBFS();
    });

    document.querySelector("#toggle-play").addEventListener("click", () => {
        controller.togglePlay();
    });

    document.querySelector("#reduce-delay").addEventListener("click", () => {
        document.querySelector("#speed").textContent = controller.reduceDelay();
    }); 

    document.querySelector("#increase-delay").addEventListener("click", () => {
        document.querySelector("#speed").textContent = controller.increaseDelay();
    });

    document.querySelector("#single-step").addEventListener("click", () => {
        controller.singleStep();
    });

    document.querySelector("#rows").select();
}

function setButtonsDisabled(bool) {
    document.querySelector("#solve-bfs").disabled = bool;
    document.querySelector("#solve-a-star").disabled = bool;
}

function toggleStepByStepButton(bool) {
    document.querySelector("#single-step").disabled = bool;
}

function displayHiddenElements() {
    document.querySelectorAll(".hidden").forEach((element) => {
        element.classList.remove("hidden");
    });
}

export { renderMaze, updateMaze, init, setButtonsDisabled, updateAStarExplorationCost, updateBFSExplorationCost, updateWeight, toggleStepByStepButton, displayHiddenElements };
