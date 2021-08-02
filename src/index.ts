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
    }
}

// global settings
const settings = {
    fadingLines: true,  // whether lines fade over time
    lineLifetime: 255,  // how many frames lines are drawn for
    color: {
        r: 255,
        g: 0,
        b: 0,
    }
}
window.settings = settings;