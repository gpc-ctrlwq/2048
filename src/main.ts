import { Direction } from "./types";

const gridSize = 4;
const gridVals: Array<Array<number>> = []; // [row][col], (0,0) is top left

export function init(): void {
    // init arrays
    gridVals.length = gridSize;
    gridVals.forEach(arr => {
        arr.length = gridSize;
        arr.fill(0);
    });

    // place starting cell values
    addCell();
    addCell();
}

export function slide(dir: Direction): void {
    switch (dir) {
        case Direction.left:
            // for each row
            for (let y = 0; y < gridSize; ++y) {
                // start at second left-most cell and work backwards along row
                for (let x = 1; x < gridSize; ++x) {
                    // skip empty cells
                    if (gridVals[y][x] === 0) {
                        continue;
                    }

                    let iter = x - 1;
                    while (iter >= 0) {
                        // if cell infront is empty, move current into it
                        if (gridVals[y][iter] === 0) {
                            gridVals[y][iter] = gridVals[y][iter + 1];
                            gridVals[y][iter + 1] = 0;
                            iter -= 1;
                            continue;
                        }
                        // if cell infront is same, sum them and empty current
                        else if (gridVals[y][iter] === gridVals[y][iter + 1]) {
                            gridVals[y][iter] *= 2;
                            gridVals[y][iter + 1] = 0;
                            break;
                        }
                        // else cell can't progress any further
                        break;
                    }
                }
            }
            break;

        case Direction.right:
            // for each row
            for (let y = 0; y < gridSize; ++y) {
                // start at second right-most cell and work backwards along row
                for (let x = gridSize - 2; x >= 0; --x) {
                    // skip empty cells
                    if (gridVals[y][x] === 0) {
                        continue;
                    }

                    let iter = x + 1;
                    while (iter < gridSize) {
                        // if cell infront is empty, move current into it
                        if (gridVals[y][iter] === 0) {
                            gridVals[y][iter] = gridVals[y][iter - 1];
                            gridVals[y][iter - 1] = 0;
                            iter += 1;
                            continue;
                        }
                        // if cell infront is same, sum them and empty current
                        else if (gridVals[y][iter] === gridVals[y][iter - 1]) {
                            gridVals[y][iter] *= 2;
                            gridVals[y][iter - 1] = 0;
                            break;
                        }
                        // else cell can't progress any further
                        break;
                    }
                }
            }
            break;

        case Direction.up:
            // for each col
            for (let x = 0; x < gridSize; ++x) {
                // start at second top-most cell and work backwards along col
                for (let y = 1; y < gridSize; ++y) {
                    // skip empty cells
                    if (gridVals[y][x] === 0) {
                        continue;
                    }
                    let iter = y - 1;
                    while (iter >= 0) {
                        // if cell infront is empty, move current into it
                        if (gridVals[iter][x] === 0) {
                            gridVals[iter][x] = gridVals[iter + 1][x];
                            gridVals[iter + 1][x] = 0;
                            iter -= 1;
                            continue;
                        }
                        // if cell infront is same, sum them and empty current
                        else if (gridVals[iter][x] === gridVals[iter + 1][x]) {
                            gridVals[iter][x] *= 2;
                            gridVals[iter + 1][x] = 0;
                            break;
                        }
                        // else cell can't progress any further
                        break;
                    }
                }
            }
            break;

        case Direction.down:
            // for each col
            for (let x = 0; x < gridSize; ++x) {
                // start at second bottom-most cell and work backwards along col
                for (let y = gridSize - 2; y >= 0; --y) {
                    // skip empty cells
                    if (gridVals[y][x] === 0) {
                        continue;
                    }
                    let iter = y + 1;
                    while (iter < gridSize) {
                        // if cell infront is empty, move current into it
                        if (gridVals[iter][x] === 0) {
                            gridVals[iter][x] = gridVals[iter - 1][x];
                            gridVals[iter - 1][x] = 0;
                            iter += 1;
                            continue;
                        }
                        // if cell infront is same, sum them and empty current
                        else if (gridVals[iter][x] === gridVals[iter - 1][x]) {
                            gridVals[iter][x] *= 2;
                            gridVals[iter - 1][x] = 0;
                            break;
                        }
                        // else cell can't progress any further
                        break;
                    }
                }
            }
            break;

        default:
            (function assertNever(val: any): never { throw 'Default reached with: ' + val; })(dir);
    }
}

export function addCell() {
    // get empty positions
    const empty: Array<[y: number, x: number]> = [];
    for (let y = 0; y < gridSize; ++y) {
        for (let x = 0; x < gridSize; ++x) {
            if (gridVals[y][x] === 0) {
                empty.push([x, y]);
            }
        }
    }

    if (empty.length === 0) {
        return;
    }

    const cell = Math.floor(Math.random() * empty.length);
    gridVals[empty[cell][0]][empty[cell][1]] = 2;
}
