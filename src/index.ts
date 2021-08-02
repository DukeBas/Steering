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
        toggleFadingLines: Function,
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
    VehicleOptions : {
        maxForce: 0.25,
        maxSpeed: 9,
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