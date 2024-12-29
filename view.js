import * as controller from './controller.js';
function renderMaze(graph) {
    const { rows, cols } = graph;
    const mazeDiv = document.querySelector("#maze");
    const directions = [
        { name: 'north', x: 0, y: -1 },
        { name: 'south', x: 0, y: 1 },
        { name: 'west', x: -1, y: 0 },
        { name: 'east', x: 1, y: 0 }
    ];
    mazeDiv.innerHTML = "";

    for (let row = 0; row < rows; row++) {
        const rowDiv = document.createElement("div");

        for (let col = 0; col < cols; col++) {
            const cellDiv = document.createElement("div");
            cellDiv.classList.add("cell");
            
            const cell = graph.getNode(col, row);
            const cellEdges = graph.edges.get(cell.id);

            if (!cellEdges) {
                cellDiv.classList.add(...directions.map(d => d.name));
            } else {
                for (const d of directions) {
                    const neighborCol = col + d.x;
                    const neighborRow = row + d.y;
                    
                    if (neighborCol >= 0 && neighborCol < cols && 
                        neighborRow >= 0 && neighborRow < rows) {
                        const neighbor = graph.getNode(neighborCol, neighborRow);
                        if (!cellEdges.includes(neighbor)) {
                            cellDiv.classList.add(d.name);
                        }
                    } else {
                        cellDiv.classList.add(d.name);
                    }
                };
            }

            rowDiv.appendChild(cellDiv);
        }
        mazeDiv.appendChild(rowDiv);
    }
}

function updateCell(cell, cellEdges) {
    const directions = [
        { name: 'north', x: 0, y: -1 },
        { name: 'south', x: 0, y: 1 },
        { name: 'west', x: -1, y: 0 },
        { name: 'east', x: 1, y: 0 }
    ];
    const { col, row } = cell;

    if (!cellEdges) {
        cellDiv.classList.add(...directions.map(d => d.name));
    } else {
        for (const d of directions) {
            const neighborCol = col + d.x;
            const neighborRow = row + d.y;
            
            if (neighborCol >= 0 && neighborCol < cols && 
                neighborRow >= 0 && neighborRow < rows) {
                const neighbor = graph.getNode(neighborCol, neighborRow);
                if (!cellEdges.includes(neighbor)) {
                    cellDiv.classList.add(d.name);
                }
            } else {
                cellDiv.classList.add(d.name);
            }
        };
    }

    
}

export  { renderMaze };
