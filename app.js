const DEBUG = true;

const WIDTH = 1000;
const HEIGHT = 1000;

class Turtle {
  constructor(pos = { x: 0, y: 0 }, size = 1) {
    this.pos = pos;
    this.size = size;
  }

  angleToMouse() {
    const [x, y] = [this.pos.x, this.pos.y];
    const rise_over_run = (mouseY - y) / (mouseX - x);
    return Math.atan(rise_over_run) + (mouseX < x ? 3.14 : 0);
  }

  el(x, y, w, h) {
    ellipse(
      2 * x * this.size,
      2 * y * this.size,
      2 * w * this.size,
      2 * h * this.size || undefined
    );
  }

  draw() {
    const [x, y] = [this.pos.x, this.pos.y];
    push();

    translate(createVector(x, y));
    rotate(this.angleToMouse()); // rotate in direction d

    if (DEBUG) {
      stroke("lightgray");
      this.el(0, 0, 1); // bubble
      stroke("black");
    }

    this.el(-0.21, 0.28, 0.28); // back right foot
    this.el(-0.21, -0.28, 0.28); // back left foot
    this.el(0.21, 0.28, 0.28); // front right foot
    this.el(0.21, -0.28, 0.28); // front left foot
    this.el(0, 0, 0.63); // body
    this.el(0.36, 0, 0.29); // head
    this.el(0, 0, 0.1); // spot

    pop(); // undoes the translate and rotate
  }

  dash(dist = 1) {
    const r = this.angleToMouse();
    this.pos.x += Math.cos(r) * dist * this.size * 0.1;
    this.pos.y += Math.sin(r) * dist * this.size * 0.1;
  }
}

const things = [
  new Turtle({ x: WIDTH / 2, y: HEIGHT / 2 }, 25),
  new Turtle({ x: WIDTH, y: HEIGHT }, 20),
  new Turtle({ x: 1, y: 1 }, 28)
];

function setup() {
  createCanvas(WIDTH, HEIGHT);
}

function draw() {
  background("white");
  things.forEach(t => t.draw());
}

function mouseClicked() {
  things.forEach(t => {
    t.dash(30);
  });
}

setInterval(() => {
  things.forEach(t => {
    t.dash(0.5);
  });
}, 50);
