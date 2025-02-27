# Neural Network Visualizer

A web-based interactive demonstration that visualizes neural network inference in real-time using Three.js, WebGL, and Canvas APIs.

## Overview

This project is an educational tool that allows users to draw digits on a canvas and see how a neural network processes the input through an animated 3D visualization. It demonstrates the integration of modern web technologies including:

- **3D Graphics** with Three.js and WebGL
- **Interactive Drawing** with HTML5 Canvas
- **Neural Network Visualization** with particle animations
- **Responsive Design** for various screen sizes

> **Note:** This is a demonstration/simulation that uses a simplified model to visualize neural network concepts. It does not use a fully trained TensorFlow.js model for inference. The predictions are simulated for educational purposes.

## Features

- ✅ **Interactive Drawing Canvas**: Draw digits (0-9) using mouse or touch input
- ✅ **3D Neural Network Visualization**: See the network architecture and data flow in 3D
- ✅ **Real-time Animation**: Watch particles flow through the network as it processes your input
- ✅ **Probability Display**: View the network's confidence in its prediction
- ✅ **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- **Three.js**: For 3D rendering of the neural network
- **WebGL**: Hardware-accelerated graphics rendering
- **HTML5 Canvas**: For the drawing interface
- **JavaScript (ES6+)**: Modern JavaScript with modular architecture
- **CSS3**: Responsive styling with flexbox and grid layouts

## How It Works

1. The user draws a digit on the canvas
2. The drawing is processed and converted to the format expected by the neural network
3. The network processes the input and generates predictions
4. The 3D visualization shows the data flowing through the network
5. The UI displays the prediction results with probability bars

> **Important:** The neural network in this demo uses a simplified simulation model rather than a fully trained TensorFlow.js model. The predictions are approximated for demonstration purposes.

## Project Structure

The codebase is organized into several modules:

- **Visualization**: 3D rendering of the neural network
- **Input**: Canvas drawing and image processing
- **Model**: Neural network interface and prediction logic
- **UI**: User interface components and result display

## Performance Optimizations

This project implements several performance optimizations:

- **Object Pooling**: Reuses particle objects to reduce garbage collection
- **Frame Rate Limiting**: Controls animation frame rate for battery conservation
- **Efficient Rendering**: Uses shared geometries and materials
- **Canvas Optimization**: Sets `willReadFrequently: true` for better performance
- **Responsive Resizing**: Adjusts rendering resolution based on viewport size

## Browser Compatibility

The application works best in modern browsers that support WebGL and Canvas APIs:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Example

![image](https://github.com/user-attachments/assets/0ed73f36-23b9-40e7-9980-1713254009bf)


## Local Development

To run this project locally:

1. Clone the repository
   ```
   git clone https://github.com/yourusername/neural-network-visualizer.git
   ```

2. Navigate to the project directory
   ```
   cd neural-network-visualizer
   ```

3. Serve the files using a local server
   ```
   # Using Python
   python -m http.server
   
   # Or using Node.js with http-server
   npx http-server
   ```

4. Open your browser and navigate to `http://localhost:8000`

## Future Improvements

### Implementing True AI Functionality

To transform this demonstration into a fully functional neural network with real inference capabilities, the following improvements would be needed:

1. **TensorFlow.js Integration**: 
   - Implement proper TensorFlow.js model loading and inference
   - Host a trained MNIST model locally with the application
   - Add proper tensor processing for input images

2. **Model Training Pipeline**:
   - Add capability to train models directly in the browser
   - Implement a dataset loader for MNIST or similar datasets
   - Create a training interface with hyperparameter controls

3. **Advanced Visualization Features**:
   - Visualize actual neuron activations rather than simulated values
   - Show weight matrices between layers
   - Implement heat maps for feature visualization

4. **Performance Optimizations**:
   - Optimize tensor operations for mobile devices
   - Implement WebGL accelerated computations where possible
   - Add worker threads for background processing

These enhancements would transform the demonstration into a fully functional educational tool with real neural network capabilities while maintaining the intuitive visualization aspects.

## License

MIT License

## Acknowledgments

- Three.js community for the excellent 3D rendering library
- The open-source community for inspiration and resources

---

*This project is for educational purposes and demonstrates the integration of modern web technologies for interactive visualizations.*
