export default function (p5) {
  let points = [];
  let radius;
  let mult, r1, r2, g1, g2, b1, b2;

  p5.setup = () => {
    const container = document.getElementById("sketch");
    const { offsetWidth: w, offsetHeight: h } = container;
    const canvas = p5.createCanvas(w, h);
    canvas.parent(container); // Attach canvas to the container

    p5.background(10);
    p5.angleMode(p5.DEGREES);
    p5.noiseDetail(10);

    radius = p5.max(p5.width / 2, p5.height / 2);

    let density = 200;
    let space = p5.width / density;

    for (let x = 0; x < p5.width; x += space) {
      for (let y = 0; y < p5.height; y += space) {
        let p = p5.createVector(x + p5.random(-10, 10), y + p5.random(-10, 10));
        points.push(p);
      }
    }

    p5.shuffle(points, true);

    r1 = p5.random(255);
    r2 = p5.random(255);
    g1 = p5.random(255);
    g2 = p5.random(255);
    b1 = p5.random(255);
    b2 = p5.random(255);

    mult = p5.random(0.002, 0.01);
  };

  p5.draw = () => {
    p5.noStroke();
    let max;

    if (p5.frameCount * 5 <= points.length) {
      max = p5.frameCount * 5;
    } else {
      max = points.length;
    }

    for (let i = 0; i < max; i++) {
      let r = p5.map(points[i].x, 0, p5.width, r1, r2);
      let g = p5.map(points[i].y, 0, p5.height, g1, g2);
      let b = p5.map(points[i].x, 0, p5.width, b1, b2);
      let alpha = p5.map(
        p5.dist(p5.width / 2, p5.height / 2, points[i].x, points[i].y),
        0,
        radius,
        255,
        0
      );

      p5.fill(r, g, b, alpha);

      let angle = p5.map(
        p5.noise(points[i].x * mult, points[i].y * mult),
        0,
        1,
        0,
        720
      );

      points[i].add(p5.createVector(p5.cos(angle), p5.sin(angle)));

      if (p5.dist(p5.width / 2, p5.height / 2, points[i].x, points[i].y) < radius) {
        p5.ellipse(points[i].x, points[i].y, 1);
      }
    }
  };

  p5.windowResized = () => {
    // Resize canvas on window/container change
    const { offsetWidth: w, offsetHeight: h } =
      document.getElementById("sketch");
    p5.resizeCanvas(w, h);
  };
}
