import "./sidebar";
import "./sketch";
import "./style.scss";

// File used for global declaration

declare global {
  interface Window {
    openSidebar: Function,
    closeSidebar: Function,
    saveCanvas: Function,
    windowResized: Function,
    settings: typeof settings,
    initialLoad: Function, // called when the body loads, to update values based on previously saved settings
    toggleFadingLines: Function,
    changeColor: Function,
  }
}

// global settings
const settings = {
  fadingLines: true,  // whether lines fade over time
  lineLifetime: parseInt((document.getElementById('lifetime-slider') as HTMLInputElement).value),  // how many frames lines are drawn for
  color: {
    r: 255,
    g: 0,
    b: 0,
  },
  VehicleOptions: {
    maxForce: parseInt((document.getElementById('max-force-slider') as HTMLInputElement).value) / 100,
    maxSpeed: parseInt((document.getElementById('max-speed-slider') as HTMLInputElement).value),
    distanceForMaxSpeed: 100,
    distanceToTargetToReach: 50,
  }
}
window.settings = settings;

// Fading lines toggle button
function toggleFadingLines() {
  settings.fadingLines = !settings.fadingLines;
}
window.toggleFadingLines = toggleFadingLines;

// Updating color
function changeColor(col: string) { // input color as DOMString, in sevencharacter hexadecimal notation
  const values = col.substring(1) // remove '#'
    .split(/(.{2})/)    // split into chunks of 2 for each of the components
    .filter(p => p);    // remove empty parts created by split
  window.settings.color.r = parseInt(values[0], 16);
  window.settings.color.g = parseInt(values[1], 16);
  window.settings.color.b = parseInt(values[2], 16);
}
window.changeColor = changeColor;

// updating based on previous values
function initialLoad() {
  document.getElementById('lifetime-value').innerHTML = (document.getElementById('lifetime-slider') as HTMLInputElement).value
  document.getElementById('max-force-value').innerHTML = (document.getElementById('max-force-slider') as HTMLInputElement).value
  document.getElementById('max-speed-value').innerHTML = (document.getElementById('max-speed-slider') as HTMLInputElement).value
  changeColor((document.getElementById('color-picker') as HTMLInputElement).value);
}
window.initialLoad = initialLoad;