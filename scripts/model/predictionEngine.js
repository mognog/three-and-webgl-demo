export function predictDigit(input, architecture) {
  // Simple heuristic to make predictions more realistic
  // Find the center of mass of the drawing
  let totalMass = 0;
  let centerX = 0;
  let centerY = 0;
  let topMass = 0;
  let bottomMass = 0;
  let leftMass = 0;
  let rightMass = 0;

  const size = Math.sqrt(input.length);

  for (let i = 0; i < input.length; i++) {
    const x = i % size;
    const y = Math.floor(i / size);
    const val = input[i];

    totalMass += val;
    centerX += x * val;
    centerY += y * val;

    // Top/bottom half
    if (y < size / 2) topMass += val;
    else bottomMass += val;

    // Left/right half
    if (x < size / 2) leftMass += val;
    else rightMass += val;
  }

  if (totalMass > 0) {
    centerX /= totalMass;
    centerY /= totalMass;
  }

  // Normalize to [0,1]
  centerX /= size;
  centerY /= size;

  // Calculate some features
  const topBottomRatio = topMass / (bottomMass + 0.1);
  const leftRightRatio = leftMass / (rightMass + 0.1);

  // Initialize predictions array with base probabilities
  const predictions = Array(10).fill(0.1);

  // Enhance certain digits based on features
  if (topBottomRatio > 1.5 && leftRightRatio < 1.2) {
    // Likely 7
    predictions[7] += 0.4;
  } else if (topBottomRatio < 0.8 && leftRightRatio < 0.8) {
    // Likely 8
    predictions[8] += 0.4;
  } else if (topBottomRatio > 1.2 && leftRightRatio > 1.2) {
    // Likely 4
    predictions[4] += 0.4;
  } else if (Math.abs(topBottomRatio - 1) < 0.3 && Math.abs(leftRightRatio - 1) < 0.3) {
    // Likely 0
    predictions[0] += 0.4;
  } else if (topBottomRatio < 0.7 && leftRightRatio > 1.3) {
    // Likely 2
    predictions[2] += 0.4;
  } else if (topBottomRatio < 0.7 && leftRightRatio < 0.7) {
    // Likely 3
    predictions[3] += 0.4;
  } else if (topBottomRatio > 1.3 && leftRightRatio > 0.7 && leftRightRatio < 1.3) {
    // Likely 1
    predictions[1] += 0.4;
  } else if (topBottomRatio < 0.8 && leftRightRatio > 0.8 && leftRightRatio < 1.2) {
    // Likely 5
    predictions[5] += 0.4;
  } else if (topBottomRatio > 0.8 && topBottomRatio < 1.2 && leftRightRatio > 1.2) {
    // Likely 6
    predictions[6] += 0.4;
  } else {
    // Likely 9
    predictions[9] += 0.4;
  }

  // Add some randomness
  predictions.forEach((p, i) => {
    predictions[i] = Math.min(1, p + Math.random() * 0.2);
  });

  // Normalize to sum to 1
  const sum = predictions.reduce((a, b) => a + b, 0);
  const normalizedPredictions = predictions.map(p => p / sum);

  return normalizedPredictions;
}

export function generateActivations(input, predictions, architecture) {
  const activations = [];

  // Input layer activations (normalized input values)
  activations.push(input.map(val => Math.max(0, Math.min(1, val))));

  // Hidden layer activations (simulated)
  for (let i = 1; i < architecture.length - 1; i++) {
    const layerActivations = [];
    for (let j = 0; j < architecture[i]; j++) {
      // Simulate activation based on previous layer
      const prevLayerSum = activations[i - 1].reduce((sum, val) => sum + val, 0);
      const avgActivation = prevLayerSum / activations[i - 1].length;
      const activation = Math.max(0, Math.min(1, avgActivation + (Math.random() * 0.4 - 0.2)));
      layerActivations.push(activation);
    }
    activations.push(layerActivations);
  }

  // Output layer activations (use our predictions)
  activations.push(predictions);

  return activations;
}

// Make functions available globally to avoid circular dependencies
window.predictionEngine = { predictDigit, generateActivations }; 