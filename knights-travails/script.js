/*
1. Find next move
2. Check if move is valid
3. add move to moves array
4. if landed on target stop
5. Back to step 1
*/
function toKey(position) {
    return `${position[0]},${position[1]}`;
}
function isInsideBoard(x, y) {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
}
toKey([3,5]);
const validMoves = [
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
    [-2, 1],
    [-1, 2],
];
function getKnightMoves(position) {
    const[x, y] = position;
    const moves = [];

    for (const [dx, dy] of validMoves) {
        const nextX = x + dx;
        const nextY = y + dy;

        if(isInsideBoard(nextX, nextY)) {
            moves.push([nextX, nextY]);
        }
    }
    return moves;
}
function buildPath(parentMap, start, end) {
    const path = [end];
    let current = end;
}
