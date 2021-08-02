import p5 from 'p5';
import { Vehicle, randomPoint } from './vehicle';

class Line {
  start: p5.Vector;
  end: p5.Vector;
  life: number;

  constructor(
    start: p5.Vector,
    end: p5.Vector,
    life = 200, // amount of frames a line is drawn
  ) {
    this.start = start;
    this.end = end;
    this.life = life;
  }

  draw(p: p5) {
    if (window.settings.fadingLines) {
      p.stroke(p.map(this.life, 0, window.settings.lineLifetime, 0, 255), 0, 0);
    } else {
      p.stroke(255, 0, 0);
    }
    
    p.line(
      this.start.x,
      this.start.y,
      this.end.x,
      this.end.y,
    )
    this.life--;
  }

  get valid() {
    return this.life > 0;
  }
}

export class Tracer {
  vehicles: Vehicle[] = [];
  lines: Line[] = [];
  private p: p5;

  constructor(sketchReference: p5, n: number) {
    this.p = sketchReference;
    for (let i = 0; i < n; i++) {
      this.vehicles.push(new Vehicle(
        this.p,
        randomPoint(this.p),
        this.p.createVector(0, 0),
        randomPoint(this.p),
      ));
    }
  }

  // draw lines between the vehicles to the screen
  draw() {
    // add new lines
      for (let i = 0; i < this.vehicles.length; i++) {
        const next = i + 1 >= this.vehicles.length ? 0 : i + 1 // index for the end part of the line, might need to loop
        this.lines.push(new Line(this.vehicles[i].pos.copy(), this.vehicles[next].pos.copy()));
      }


    // draw the lines
    this.p.push();
    this.p.strokeWeight(0.5);
    this.lines.forEach((l,i) => {
      l.draw(this.p);
      if (!l.valid){
        this.lines.splice(i, 1);
      }
    });
    this.p.pop();
  }

  // move all vehicles
  updatePositions() {
    this.vehicles.forEach(v => v.move())
  }
}

