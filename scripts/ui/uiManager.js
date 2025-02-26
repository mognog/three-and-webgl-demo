export class UIManager {
  constructor(outputContainer) {
    this.outputContainer = outputContainer;
    
    // Add a demo mode indicator to the page
    this.addDemoModeIndicator();
  }
  
  addDemoModeIndicator() {
    const demoIndicator = document.createElement('div');
    demoIndicator.className = 'demo-mode-indicator';
    demoIndicator.innerHTML = '🧪 Demo Mode: Using simulated neural network';
    document.body.appendChild(demoIndicator);
    
    // Add the necessary CSS
    const style = document.createElement('style');
    style.textContent = `
      .demo-mode-indicator {
        position: fixed;
        top: 10px;
        right: 10px;
        background-color: rgba(255, 193, 7, 0.9);
        color: #333;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: bold;
        z-index: 1000;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      }
    `;
    document.head.appendChild(style);
  }
  
  showLoading() {
    this.outputContainer.innerHTML = `
      <div class="loading-spinner">
        <div></div><div></div><div></div><div></div>
      </div>
    `;
  }
  
  showError(message) {
    this.outputContainer.innerHTML = `
      <div class="error-message">
        <p>${message}</p>
      </div>
    `;
  }
  
  showResults(predictions) {
    // Find the highest probability
    const maxIndex = predictions.indexOf(Math.max(...predictions));
    
    // Create the results HTML
    let resultsHTML = `
      <div class="prediction-summary">
        Predicted digit: <span class="predicted-digit">${maxIndex}</span>
      </div>
      <div class="probability-bars">
    `;
    
    // Add probability bars for each digit
    for (let i = 0; i < predictions.length; i++) {
      const probability = predictions[i];
      const percentage = Math.round(probability * 100);
      const isHighest = i === maxIndex;
      
      resultsHTML += `
        <div class="probability-item ${isHighest ? 'predicted' : ''}">
          <div class="digit-label">${i}</div>
          <div class="probability-bar">
            <div class="probability-fill" style="width: ${percentage}%"></div>
            <div class="probability-value">${percentage}%</div>
          </div>
        </div>
      `;
    }
    
    resultsHTML += `</div>`;
    this.outputContainer.innerHTML = resultsHTML;
  }
} 