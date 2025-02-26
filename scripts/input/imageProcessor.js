export function processCanvasToModelInput(canvas, modelInputSize = 28) {
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  
  // Check if the canvas is empty
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;
  
  // Check if the canvas is mostly empty (black)
  let nonEmptyPixels = 0;
  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i] > 10) { // If red channel is > 10, consider it non-empty
      nonEmptyPixels++;
    }
  }
  
  // If less than 1% of pixels are non-empty, consider it empty
  if (nonEmptyPixels < (canvas.width * canvas.height * 0.01)) {
    throw new Error('Please draw a digit before analyzing');
  }
  
  // Resize to model input size (e.g., 28x28 for MNIST)
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = modelInputSize;
  tempCanvas.height = modelInputSize;
  const tempCtx = tempCanvas.getContext('2d');
  
  // Draw the original canvas content onto the smaller canvas
  tempCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 
                  0, 0, modelInputSize, modelInputSize);
  
  // Get pixel data
  const resizedImageData = tempCtx.getImageData(0, 0, modelInputSize, modelInputSize);
  
  // Convert to grayscale array normalized to [0,1]
  const grayscaleData = [];
  for (let i = 0; i < resizedImageData.data.length; i += 4) {
    // Just use the red channel since it's grayscale
    grayscaleData.push(resizedImageData.data[i] / 255);
  }
  
  return grayscaleData;
} 