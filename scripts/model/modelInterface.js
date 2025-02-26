import { generateActivations } from './predictionEngine.js';

export class ModelInterface {
  constructor() {
    this.model = null;
    this.isLoaded = false;
    this.inputDimension = 784; // 28x28
    this.outputDimension = 10;
    this.architecture = [784, 128, 64, 10];
  }

  async loadModel(modelUrl) {
    try {
      // Since TensorFlow.js hosted models are no longer available, we'll skip this attempt
      // and log a more informative message instead of an error
      console.log('Using simulation mode - no TensorFlow.js model available');
      
      // Fall back to the existing model loading
      try {
        const modelData = await fetch(modelUrl);
        const data = await modelData.json();
        
        this.isLoaded = true;
        this.inputDimension = data.inputDimension;
        this.outputDimension = data.outputDimension;
        this.architecture = data.layers;
        
        console.log('Demo model loaded successfully');
        return true;
      } catch (fallbackError) {
        console.log('Using default architecture for demo mode');
        
        // Use default architecture if all else fails
        this.isLoaded = true;
        return true;
      }
    } catch (error) {
      console.log('Falling back to demo mode');
      this.isLoaded = true;
      return true;
    }
  }

  async predict(input) {
    if (!this.isLoaded) {
      throw new Error('Model not loaded');
    }

    let prediction;
    
    if (this.model) {
      try {
        // Reshape input to match what the model expects
        const tensor = tf.tensor(input).reshape([1, 28, 28, 1]);
        
        // Run prediction
        const result = this.model.predict(tensor);
        prediction = Array.from(await result.data());
        
        // Clean up tensors to prevent memory leaks
        tensor.dispose();
        result.dispose();
      } catch (error) {
        console.error('Error during TensorFlow prediction:', error);
        // Fall back to the existing prediction method
        prediction = this.fallbackPredict(input);
      }
    } else {
      // Use fallback prediction if no TensorFlow model
      prediction = this.fallbackPredict(input);
    }
    
    // Generate activations for visualization
    const activations = generateActivations(input, prediction, this.architecture);
    
    return {
      prediction,
      activations
    };
  }
  
  fallbackPredict(input) {
    // Import the predictDigit function directly
    const { predictDigit } = window.predictionEngine || {};
    
    if (typeof predictDigit === 'function') {
      return predictDigit(input, this.architecture);
    }
    
    // Very simple fallback if predictDigit isn't available
    const predictions = Array(10).fill(0.1);
    return predictions;
  }

  getArchitecture() {
    return this.architecture;
  }
}