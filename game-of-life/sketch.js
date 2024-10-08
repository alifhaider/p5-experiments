let grid;
const WIDTH = 800;
const HEIGHT = 800;
const TILE_SIZE = 10;
const rows = HEIGHT / TILE_SIZE;
const cols = WIDTH / TILE_SIZE;

// creates a 2D array with random [0 or 1]
function create2DArray(rows, cols) {
  let arr = new Array(rows);
  for (let i = 0; i < rows; i++) {
    arr[i] = new Array(cols);
    for (let j = 0; j < cols; j++) {
      arr[i][j] = floor(random(2));
    }
  }
  return arr;
}

function setup() {
  grid = create2DArray(rows, cols);
  createCanvas(WIDTH, HEIGHT);

  let button = createButton("Start again");
  button.position(0, HEIGHT + 10);

  button.mousePressed(reDraw);
}

function reDraw() {
  grid = create2DArray(rows, cols);
}

function draw() {
  background(220);
  // gives color
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = j * TILE_SIZE;
      let y = i * TILE_SIZE;
      if (grid[i][j] === 1) {
        fill(0);
        rect(x, y, TILE_SIZE, TILE_SIZE);
      }
    }
  }

  const next = create2DArray(rows, cols);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const state = grid[i][j];
      const neighbors = countNeighbors(grid, i, j);
      if (state === 0 && neighbors === 3) {
        next[i][j] = 1;
      } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }
    }
  }
  grid = next;
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      const row = (x + i + rows) % rows;
      const col = (y + j + cols) % cols;
      sum += grid[row][col];
    }
  }
  sum -= grid[x][y];
  return sum;
}
