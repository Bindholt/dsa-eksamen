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

function attatchEventListeners() {
    document.querySelector("#generate").addEventListener("click", () => {
        const rows = document.querySelector("#rows").value;
        const cols = document.querySelector("#cols").value;
        controller.initGraph(rows, cols);
    });
}

export { renderMaze, updateMaze, attatchEventListeners };
