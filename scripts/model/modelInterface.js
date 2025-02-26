import { loadModel } from './modelLoader.js';
import { predictDigit, generateActivations } from './predictionEngine.js';

export class ModelInterface {
  constructor() {
    this.model = null;
    this.isLoaded = false;
    this.inputDimension = 0;
    this.outputDimension = 0;
    this.architecture = [];
  }

  async loadModel(modelUrl) {
    const modelData = await loadModel(modelUrl);
    
    this.isLoaded = modelData.isLoaded;
    this.inputDimension = modelData.inputDimension;
    this.outputDimension = modelData.outputDimension;
    this.architecture = modelData.architecture;
    
    console.log('Model loaded successfully');
    return true;
  }

  async predict(input) {
    if (!this.isLoaded) {
      throw new Error('Model not loaded');
    }

    // Get predictions
    const prediction = predictDigit(input, this.architecture);
    
    // Generate activations for visualization
    const activations = generateActivations(input, prediction, this.architecture);

    // Return both the output predictions and all layer activations for visualization
    return {
      prediction,
      activations
    };
  }

  getArchitecture() {
    return this.architecture;
  }
} 