import { addValueToEmptyCell, gridVals, init, slide } from './main';
import { Direction } from './types';

// get grid elements
const gridElements: Array<Array<Element>> = [];
const rows = document.getElementsByClassName("row");
let cell: Element | null;
for (let ii = 0; ii < rows.length; ii++) {
    gridElements.push([]);
    for (let kk = 0; kk < rows[ii].childElementCount; kk++) {
        cell = rows[ii].children.item(kk);
        if(!cell) {
            throw 'null element recieved';
        }
        gridElements[ii][kk] = cell;
    }
}

init();
draw();

function handleKey(event: KeyboardEvent) {
    // update game
    switch (event.key) {
        case 'ArrowLeft':
            slide(Direction.left);
            break;

        case 'ArrowRight':
            slide(Direction.right);
            break;

        case 'ArrowUp':
            slide(Direction.up);
            break;

        case 'ArrowDown':
            slide(Direction.down);
            break;

        default:
            return;
    }

    addValueToEmptyCell();
    draw();
};

function draw() {
    for (let row = 0; row < gridVals.length; row++) {
        for (let col = 0; col < gridVals[row].length; col++) {
            if (gridVals[row][col] === 0) {
                gridElements[row][col].textContent = '-';
            }
            else {
                gridElements[row][col].textContent = gridVals[row][col].toString();
            }
        }
        console.log('end');
    }
}

// handle input
window.addEventListener('keyup', handleKey);

