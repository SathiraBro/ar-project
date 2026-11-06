// ======================================
// GROUP 30 - AR MINI MUSEUM
// STAGE 6 - INTERACTIVE COMPONENTS
// ======================================

// INTERACTION 1: Change ball colour
AFRAME.registerComponent("museum-color-change", {
  init: function () {
    // Available colours
    this.colors = ["#FF0000", "#0000FF", "#00FF00", "#FFD700", "#FF00FF"];

    // Current colour index
    this.currentColor = 0;

    // Listen for clicks
    this.el.addEventListener("click", () => {
      // Move to next colour
      this.currentColor++;

      // Restart after the last colour
      if (this.currentColor >= this.colors.length) {
        this.currentColor = 0;
      }

      // Apply new colour
      this.el.setAttribute("color", this.colors[this.currentColor]);

      console.log("Ball colour changed!");
    });
  },
});

// INTERACTION 2: Grow and shrink statue
AFRAME.registerComponent("museum-grow", {
  init: function () {
    // Store original size
    this.originalScale = this.el.object3D.scale.clone();

    // Track current state
    this.isGrown = false;

    // Listen for clicks
    this.el.addEventListener("click", () => {
      if (this.isGrown) {
        // Return to original size
        this.el.setAttribute("scale", {
          x: this.originalScale.x,
          y: this.originalScale.y,
          z: this.originalScale.z,
        });

        this.isGrown = false;

        console.log("Statue returned to original size!");
      } else {
        // Increase size by 50%
        this.el.setAttribute("scale", {
          x: this.originalScale.x * 1.5,
          y: this.originalScale.y * 1.5,
          z: this.originalScale.z * 1.5,
        });

        this.isGrown = true;

        console.log("Statue grew!");
      }
    });
  },
});

// ======================================
// GROUP 30 - MARKER STATUS DETECTION
// ======================================

window.addEventListener("DOMContentLoaded", () => {
  // Get HTML elements
  const marker = document.querySelector("a-marker");

  const banner = document.getElementById("status-banner");

  const title = document.getElementById("status-title");

  const message = document.getElementById("status-message");

  // Check whether elements exist
  if (!marker || !banner || !title || !message) {
    console.error("Museum status elements not found!");
    return;
  }

  // FUNCTION: Marker detected
  marker.addEventListener("markerFound", () => {
    console.log("Hiro marker detected!");

    // Change banner colour
    banner.classList.remove("lost");
    banner.classList.add("found");

    // Change banner text
    title.textContent = "MUSEUM FOUND!";

    message.textContent = "Hiro marker detected. Welcome to our museum.";
  });

  // FUNCTION: Marker lost
  marker.addEventListener("markerLost", () => {
    console.log("Hiro marker lost!");

    // Change banner colour
    banner.classList.remove("found");
    banner.classList.add("lost");

    // Change banner text
    title.textContent = "MUSEUM NOT FOUND!";

    message.textContent = "Please show the Hiro marker to your camera.";
  });
});
