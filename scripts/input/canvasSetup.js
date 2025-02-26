export function setupCanvas(container, width, height) {
  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  canvas.classList.add('input-canvas');
  container.appendChild(canvas);
  
  // Setup context with willReadFrequently set to true
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);
  
  return { canvas, ctx };
}

export function createControls(container, onClear, onAnalyze) {
  const controlsDiv = document.createElement('div');
  controlsDiv.classList.add('canvas-controls');
  
  // Clear button
  const clearBtn = document.createElement('button');
  clearBtn.textContent = 'Clear';
  clearBtn.addEventListener('click', onClear);
  
  // Analyze button
  const analyzeBtn = document.createElement('button');
  analyzeBtn.textContent = 'Analyze';
  analyzeBtn.addEventListener('click', onAnalyze);
  
  controlsDiv.appendChild(clearBtn);
  controlsDiv.appendChild(analyzeBtn);
  container.appendChild(controlsDiv);
  
  return controlsDiv;
} 