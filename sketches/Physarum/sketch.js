export default function (p5) {
  let molds = [];
  const NUM = 4000;
  let d, wD;

  class Mold {
    constructor() {
      this.x = p5.random(p5.width);
      this.y = p5.random(p5.height);
      this.r = 0.5;

      this.heading = p5.random(360);
      this.vx = 0;
      this.vy = 0;
      this.rotAngle = 45;
      this.sd = 5; // sensorDist
      this.sa = 45; // sensorAngle
      // no new Vector allocations per frame
      this.lx = this.ly = this.rx = this.ry = this.fx = this.fy = 0;
    }

    update() {
      // update velocity correctly
      this.vx = p5.cos(this.heading);
      this.vy = p5.sin(this.heading);

      // move
      this.x = (this.x + this.vx + p5.width) % p5.width;
      this.y = (this.y + this.vy + p5.height) % p5.height;

      // precompute cos/sin
      const h = this.heading,
        cH = p5.cos(h),
        sH = p5.sin(h),
        cHsa = p5.cos(h + this.sa),
        sHsa = p5.sin(h + this.sa),
        cHms = p5.cos(h - this.sa),
        sHms = p5.sin(h - this.sa);

      // inline sensor positions
      this.fx = (this.x + this.sd * cH + p5.width) % p5.width;
      this.fy = (this.y + this.sd * sH + p5.width) % p5.width;
      this.lx = (this.x + this.sd * cHsa + p5.width) % p5.width;
      this.ly = (this.y + this.sd * sHsa + p5.width) % p5.width;
      this.rx = (this.x + this.sd * cHms + p5.width) % p5.width;
      this.ry = (this.y + this.sd * sHms + p5.width) % p5.width;

      // fast pixel indexing
      const li = pixelIndex(this.lx, this.ly),
        ri = pixelIndex(this.rx, this.ry),
        fi = pixelIndex(this.fx, this.fy);

      const l = p5.pixels[li],
        r = p5.pixels[ri],
        f = p5.pixels[fi];

      // steering logic...
      if (f < 1 && f < r && p5.random(1) < 0.5) {
        this.heading += this.rotAngle;
      } else if (l > r) {
        this.heading += this.rotAngle;
      } else if (r > l) {
        this.heading -= this.rotAngle;
      }
    }

    display() {
      p5.noStroke();
      p5.fill(255);
      p5.ellipse(this.x, this.y, this.r * 2);
    }
  }

  function pixelIndex(x, y) {
    return 4 * (Math.floor(y * d) * wD + Math.floor(x * d));
  }

  p5.setup = () => {
    const { offsetWidth: w, offsetHeight: h } =
      document.getElementById("sketch");
    p5.createCanvas(w, h);
    p5.angleMode(p5.DEGREES);
    d = p5.pixelDensity();
    wD = p5.width * d;

    for (let i = 0; i < NUM; i++) molds.push(new Mold());
  };

  p5.draw = () => {
    p5.background(0, 5);
    p5.loadPixels();

    for (let m of molds) {
      m.update();
      m.display();
    }
  };
}
