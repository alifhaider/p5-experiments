let cells = [];
const WIDTH = 610;
const HEIGHT = 600;
const TILE_SIZE = 5;
let y = 0;

let startRule = 110;
let ruleSet;
let palette = [];

function setRules(ruleValue) {
  ruleSet = ruleValue.toString(2).padStart(8, "0");
}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  background(220);
  setRules(startRule);
  palette = [
    color(11, 106, 136),
    color(25, 297, 244),
    color(112, 50, 126),
    color(146, 83, 161),
    color(164, 41, 99),
    color(236, 1, 90),
    color(240, 99, 164),
    color(241, 97, 100),
    color(248, 158, 79),
  ];
  let total = width / TILE_SIZE;
  for (let i = 0; i < total; i++) {
    cells[i] = random(palette);
  }
  cells[floor(total / 2)] = 1;
}

function draw() {
  noStroke();
  for (let i = 0; i < cells.length; i++) {
    let x = i * TILE_SIZE;
    square(x, y, TILE_SIZE);
    fill(cells[i]);
  }
  y += TILE_SIZE;

  if (y > height) {
    background(220);
    y = 0;
    setRules(floor(random(256)));
  }

  let nextCells = [];
  let len = cells.length;
  for (let i = 0; i < len; i++) {
    let leftColor = cells[(i + len - 1) % len];
    let rightColor = cells[(i + len + 1) % len];
    let stateColor = cells[i];
    let left = brightness(leftColor) < 100 ? 1 : 0;
    let right = brightness(rightColor) < 100 ? 1 : 0;
    let state = brightness(stateColor) < 100 ? 1 : 0;
    let newState = calculateState(left, state, right);
    if (newState == 0) {
      nextCells[i] = color(255);
    } else {
      let options = [];
      if (left == 1) options.push(leftColor);
      if (right == 1) options.push(rightColor);
      if (state == 1) options.push(stateColor);
      if (options.length < 1) nextCells[i] = random(palette);
      else nextCells[i] = random(options);
    }
  }
  cells = nextCells;
}

function calculateState(a, b, c) {
  let neighborhood = "" + a + b + c;
  let value = 7 - parseInt(neighborhood, 2);
  return parseInt(ruleSet[value]);
}
