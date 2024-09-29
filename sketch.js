/**
 * Abstract lines and waves that can go to a blackout
 * Author: Namiko Dote
 * 
 * This program generates an abstract visual using Perlin noise.
 * User interactivity comes in with the noise and thickness of lines at play with the mouse
 * The visual alternates between smooth motion and complete blackout 
 * 
 * Controls:
 * - mouseX : Change the noise scale (affects movement complexity)
 * - mouseY : Change the line spacing (affects density of lines)
 * - Pressing the mouse : Changes the line spacing
 * 
 * Uses:
 * - p5.js
 * https://p5js.org
 */

let noiseScale = 0.01; // Controls the complexity of the movement
let lineSpacing = 15; // Spacing between lines
let blackout = false; // Boolean to track blackout state
let blackoutDuration = 100; // Frames for blackout duration
let movementDuration = 300; // Frames for movement duration
let timer = 0; // Frame counter to toggle between blackout and movement
let fadeAmount = 0; // Controls the fade effect
let fadeSpeed = 5; // Speed at which fade occurs

function setup() {
  createCanvas(800, 600);
  stroke(0);
  noFill();
}

function draw() {
  timer++;

  // Conditional: toggle between movement and blackout based on timer
  if (timer > movementDuration && !blackout) {
    blackout = true;
    timer = 0; // Reset timer after movement phase
  } else if (timer > blackoutDuration && blackout) {
    blackout = false;
    timer = 0; // Reset timer after blackout phase
  }

  // Apply smooth fade effect for blackout transition
  if (blackout) {
    fadeAmount = constrain(fadeAmount + fadeSpeed, 0, 255); // Increase fade to black
  } else {
    fadeAmount = constrain(fadeAmount - fadeSpeed, 0, 255); // Decrease fade to bring back movement
  }

  // Background fade effect to smooth transitions between frames
  background(255, 10);

  // Map mouseX to control noise scale for dynamic movement complexity
  noiseScale = map(mouseX, 0, width, 0.005, 0.02);

  // Map mouseY to control line spacing, allowing dynamic line density
  lineSpacing = map(mouseY, 0, height, 5, 30);

  // Draw abstract shapes with changing line spacing and noise scale
  for (let y = 0; y < height; y += lineSpacing) {
    beginShape();
    for (let x = 0; x < width; x += 10) {
      let noiseValue = noise(x * noiseScale, y * noiseScale + frameCount * 0.01);
      let yOffset = map(noiseValue, 0, 1, -50, 50); // Map noise to y offset for movement
      vertex(x, y + yOffset); // Create a vertex at each point along the line
    }
    endShape();
  }

  // Add an additional layer of thin lines for depth and texture
  strokeWeight(0.5);
  for (let y = 0; y < height; y += lineSpacing * 2) {
    beginShape();
    for (let x = 0; x < width; x += 5) {
      let noiseValue = noise(x * noiseScale * 1.5, y * noiseScale * 1.5 + frameCount * 0.02);
      let yOffset = map(noiseValue, 0, 1, -30, 30);
      vertex(x, y + yOffset); // Create finer lines for additional complexity
    }
    endShape();
  }

  // Draw a black rectangle with variable opacity for fade effect
  fill(0, fadeAmount);
  rect(0, 0, width, height);

  // Reset stroke weight for the next frame
  strokeWeight(1);

  // Interaction: Adjust line spacing when mouse is pressed
  if (mouseIsPressed) {
    lineSpacing = map(mouseY, 0, height, 5, 30);
  }
}
