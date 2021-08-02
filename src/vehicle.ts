import p5 from "p5";

export class Vehicle {
  private p: p5;
  pos: p5.Vector;
  vel: p5.Vector;
  acc: p5.Vector;
  target: p5.Vector;

  constructor(sketchRef: p5, startPos: p5.Vector, startVel: p5.Vector, startTarget: p5.Vector) {
    this.p = sketchRef;
    this.pos = startPos;
    this.vel = startVel;
    this.acc = this.p.createVector(0, 0);
    this.target = startTarget;
  }

  get x() {
    return this.pos.x;
  }
  get y() {
    return this.pos.y;
  }

  // vehicle seeks it's target
  move() {
    const desiredVector = p5.Vector.sub(this.target, this.pos);
    desiredVector.setMag(
      desiredVector.mag() > window.settings.VehicleOptions.distanceForMaxSpeed ?
      window.settings.VehicleOptions.maxSpeed :
        this.p.map(desiredVector.mag(), 0, 100, 0, window.settings.VehicleOptions.maxSpeed)); // mapping from [0,100] to [0, maxSpeed]
    let steer = p5.Vector.sub(desiredVector, this.vel);
    steer.limit(window.settings.VehicleOptions.maxForce);
    this.acc.add(steer);  // add steering force to acceleration
    this.pos.add(this.vel); // update position based on speed
    this.vel.add(this.acc); // apply acceleration
    this.acc.mult(0); // reset acceleration

    // check if target is reached
    if (this.pos.dist(this.target) < window.settings.VehicleOptions.distanceToTargetToReach) {
      this.target = randomPoint(this.p);
    }
  }
}

export function randomPoint(p: p5) {
  return p.createVector(
    Math.round(Math.random() * p.width),
    Math.round(Math.random() * p.height),
  );
}