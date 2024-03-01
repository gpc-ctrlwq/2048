import { addCell, gridVals, init, slide } from './main';
import { Direction } from './types';

// TODO get grid elements

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

    draw();
    addCell();
};

function draw() {
    for (let row = 0; row < gridVals.length; row++) {
        for (let col = 0; col < gridVals[row].length; col++) {
            console.log(gridVals[row][col]);
            //if (gridVals[row][col] > 0) {
            // TODO draw number here
            //}
        }
        console.log('end');
    }
}

// handle input
window.addEventListener('keyup', handleKey);


