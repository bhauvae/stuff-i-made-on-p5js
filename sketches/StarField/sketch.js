export default function (p5) {
  p5.setup = () => {
    const container = document.getElementById("sketch");
    const { offsetWidth: w, offsetHeight: h } = container;
    const canvas = p5.createCanvas(w, h);
    canvas.parent(container); // Attach canvas to the container
    p5.background(255);
  };

  p5.draw = () => {

  };

  p5.windowResized = () => {
    // Resize canvas on window/container change
    const { offsetWidth: w, offsetHeight: h } =
      document.getElementById("sketch");
    p5.resizeCanvas(w, h);
  };
}
