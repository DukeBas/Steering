import p5 from 'p5';
import { Tracer } from './tracer';

const sketch = (p: p5) => {
  let tracer: Tracer;

  p.setup = () => {
    const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    p.disableFriendlyErrors = true; // disable friendly errors for increased performance
    canvas.position(0, 0);  // make canvas start in top-left corner
    canvas.style('z-index', '-1');  // set canvas as background
    p.frameRate(60);  // target framerate

    tracer = new Tracer(p, 3);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = () => {
    p.background(0);
    tracer.draw();
    tracer.updatePositions();
  }

  // set functions as global functions
  window.saveCanvas = () => p.saveCanvas('canvas', 'png');
  window.windowResized = p.windowResized;
};

const sketchP = new p5(sketch);
