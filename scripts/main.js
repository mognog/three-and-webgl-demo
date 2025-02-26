import { NetworkVisualizer } from './visualization/networkVisualizer.js';
import { ModelInterface } from './model/modelInterface.js';
import { ImageInputCanvas } from './input/imageInputCanvas.js';
import { UIManager } from './ui/uiManager.js';

document.addEventListener('DOMContentLoaded', async () => {
  console.log("DOM loaded, initializing application");
  
  try {
    // Initialize UI components
    const networkContainer = document.getElementById('network-container');
    const inputContainer = document.getElementById('input-container');
    const outputContainer = document.getElementById('output-container');
    
    if (!networkContainer || !inputContainer || !outputContainer) {
      throw new Error('Required DOM elements not found');
    }
    
    console.log("Network container found:", networkContainer);
    console.log("Container dimensions:", networkContainer.clientWidth, "x", networkContainer.clientHeight);
    
    // Create UI manager
    const uiManager = new UIManager(outputContainer);
    
    // Create network visualizer
    const visualizer = new NetworkVisualizer(networkContainer);
    console.log("NetworkVisualizer initialized");
    
    // Create model interface
    const model = new ModelInterface();
    
    // Show loading indicator
    uiManager.showLoading();
    
    try {
      await model.loadModel('./models/classifier.json');
    } catch (modelError) {
      console.error('Error loading model:', modelError);
      uiManager.showError('Failed to load the neural network model. Using fallback data.');
    }
    
    // Create input canvas
    const inputCanvas = new ImageInputCanvas(inputContainer, 280, 280);
    
    // Set up the neural network visualization with the model architecture
    visualizer.createNetwork(model.getArchitecture());
    
    // Set up the analyze callback
    inputCanvas.setOnAnalyzeCallback(async (imageData) => {
      try {
        // Show loading state
        uiManager.showLoading();
        
        // Get prediction
        const { prediction, activations } = await model.predict(imageData);
        
        // Update visualization
        visualizer.animateDataFlow(imageData, activations);
        
        // Show results
        uiManager.showResults(prediction);
      } catch (error) {
        console.error('Error during prediction:', error);
        uiManager.showError(error.message || 'An error occurred during prediction');
      }
    });
    
    // Set up error callback
    inputCanvas.setOnErrorCallback((error) => {
      uiManager.showError(error.message || 'An error occurred');
    });
    
  } catch (error) {
    console.error('Application initialization error:', error);
    document.body.innerHTML = `
      <div class="error-message" style="margin: 2rem;">
        <h2>Application Error</h2>
        <p>${error.message || 'An unknown error occurred'}</p>
      </div>
    `;
  }
});