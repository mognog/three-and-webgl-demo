export class UIManager {
  constructor(outputContainer) {
    this.outputContainer = outputContainer;
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