import p5 from "p5";

export type VehicleOptions = {
  maxForce?: number,
  maxSpeed?: number,
  distanceForMaxSpeed?: number,
  distanceToTargetToReach?: number,
}
export const defaultVehicleOptions: VehicleOptions = {
  maxForce: 0.25,
  maxSpeed: 9,
  distanceForMaxSpeed: 100,
  distanceToTargetToReach: 50,
}


export class Vehicle {
  private p: p5;
  pos: p5.Vector;
  vel: p5.Vector;
  acc: p5.Vector;
  target: p5.Vector;
  options: VehicleOptions;

  constructor(sketchRef: p5, startPos: p5.Vector, startVel: p5.Vector, startTarget: p5.Vector, options?: VehicleOptions) {
    this.p = sketchRef;
    this.pos = startPos;
    this.vel = startVel;
    this.acc = this.p.createVector(0, 0);
    this.target = startTarget;

    // set options
    if (options !== undefined) {
      if (options.maxForce !== undefined) {
        this.options.maxForce
      } else {
        this.options.maxForce = defaultVehicleOptions.maxForce
      }
      if (options.maxSpeed !== undefined) {
        this.options.maxSpeed
      } else {
        this.options.maxSpeed = defaultVehicleOptions.maxSpeed
      }
      if (options.distanceForMaxSpeed !== undefined) {
        this.options.distanceForMaxSpeed
      } else {
        this.options.distanceForMaxSpeed = defaultVehicleOptions.distanceForMaxSpeed
      }

    } else {
      this.options = defaultVehicleOptions;
    }
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
      desiredVector.mag() > this.options.distanceForMaxSpeed ?
        this.options.maxSpeed :
        this.p.map(desiredVector.mag(), 0, 100, 0, this.options.maxSpeed)); // mapping from [0,100] to [0, maxSpeed]
    let steer = p5.Vector.sub(desiredVector, this.vel);
    steer.limit(this.options.maxForce);
    this.acc.add(steer);  // add steering force to acceleration
    this.pos.add(this.vel); // update position based on speed
    this.vel.add(this.acc); // apply acceleration
    this.acc.mult(0); // reset acceleration

    // check if target is reached
    if (this.pos.dist(this.target) < this.options.distanceToTargetToReach) {
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