import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function setupScene(container) {
  // Setup Three.js scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1a1a2e);
  
  // Setup camera
  const camera = new THREE.PerspectiveCamera(
    75, 
    container.clientWidth / container.clientHeight, 
    0.1, 
    1000
  );
  camera.position.z = 15;
  
  // Create renderer
  const canvas = document.createElement('canvas');
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';
  
  const renderer = new THREE.WebGLRenderer({ 
    canvas: canvas,
    antialias: true 
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  
  // Add controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  
  // Setup lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  scene.add(directionalLight);
  
  return {
    scene,
    camera,
    renderer,
    controls,
    canvas
  };
} 