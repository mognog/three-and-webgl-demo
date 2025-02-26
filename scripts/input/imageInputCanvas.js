import { setupCanvas, createControls } from './canvasSetup.js';
import { processCanvasToModelInput } from './imageProcessor.js';

export class ImageInputCanvas {
  constructor(container, width, height) {
    this.container = container;
    this.width = width;
    this.height = height;
    
    // Setup canvas
    const { canvas, ctx } = setupCanvas(container, width, height);
    this.canvas = canvas;
    this.ctx = ctx;
    
    // Drawing state
    this.isDrawing = false;
    this.lastX = 0;
    this.lastY = 0;
    
    // Add controls
    this.addControls();
    
    // Add event listeners
    this.addEventListeners();
  }
  
  addControls() {
    createControls(
      this.container, 
      () => this.clear(),
      () => {
        try {
          const imageData = this.getImageData();
          if (this.onAnalyze) {
            this.onAnalyze(imageData);
          }
        } catch (error) {
          console.error('Error processing image:', error);
          if (this.onError) {
            this.onError(error);
          }
        }
      }
    );
  }
  
  addEventListeners() {
    this.canvas.addEventListener('mousedown', this.startDrawing.bind(this));
    this.canvas.addEventListener('mousemove', this.draw.bind(this));
    this.canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
    this.canvas.addEventListener('mouseout', this.stopDrawing.bind(this));
    
    // Touch support
    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.startDrawing(this.getTouchPos(e));
    });
    
    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      this.draw(this.getTouchPos(e));
    });
    
    this.canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.stopDrawing();
    });
  }
  
  getTouchPos(touchEvent) {
    const rect = this.canvas.getBoundingClientRect();
    const touch = touchEvent.touches[0];
    
    return {
      clientX: touch.clientX - rect.left,
      clientY: touch.clientY - rect.top
    };
  }
  
  startDrawing(e) {
    this.isDrawing = true;
    
    const pos = e.touches ? 
      { x: e.clientX, y: e.clientY } : 
      { x: e.offsetX, y: e.offsetY };
      
    this.lastX = pos.x;
    this.lastY = pos.y;
  }
  
  draw(e) {
    if (!this.isDrawing) return;
    
    const pos = e.touches ? 
      { x: e.clientX, y: e.clientY } : 
      { x: e.offsetX, y: e.offsetY };
    
    this.ctx.strokeStyle = 'white';
    this.ctx.lineWidth = 15;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(pos.x, pos.y);
    this.ctx.stroke();
    
    this.lastX = pos.x;
    this.lastY = pos.y;
  }
  
  stopDrawing() {
    this.isDrawing = false;
  }
  
  clear() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
  
  getImageData() {
    return processCanvasToModelInput(this.canvas);
  }
  
  setOnAnalyzeCallback(callback) {
    this.onAnalyze = callback;
  }
  
  setOnErrorCallback(callback) {
    this.onError = callback;
  }
} 