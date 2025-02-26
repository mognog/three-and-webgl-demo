import * as THREE from 'three';

export class NetworkBuilder {
  constructor(scene) {
    this.scene = scene;
    this.networkLayers = [];
    this.connections = null;
    
    // Shared geometries and materials
    this.nodeGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    this.nodeMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x0088ff,
      emissive: 0x003366,
      specular: 0xffffff
    });
  }
  
  createNetwork(architecture) {
    // Clear existing network
    this.clearNetwork();
    
    const layerSpacing = 5;
    const nodeSpacing = 1.5;
    
    // Create layers
    architecture.forEach((nodeCount, layerIndex) => {
      const layer = new THREE.Group();
      layer.position.x = layerIndex * layerSpacing - (architecture.length - 1) * layerSpacing / 2;
      
      // Create nodes for this layer
      for (let i = 0; i < nodeCount; i++) {
        const node = new THREE.Mesh(this.nodeGeometry, this.nodeMaterial.clone());
        node.position.y = i * nodeSpacing - (nodeCount - 1) * nodeSpacing / 2;
        layer.add(node);
      }
      
      this.scene.add(layer);
      this.networkLayers.push(layer);
    });
    
    // Create all connections as a single LineSegments object
    this.createConnections();
    
    return this.networkLayers;
  }
  
  createConnections() {
    if (this.networkLayers.length < 2) return;
    
    const positions = [];
    
    for (let layerIndex = 1; layerIndex < this.networkLayers.length; layerIndex++) {
      const layer = this.networkLayers[layerIndex];
      const prevLayer = this.networkLayers[layerIndex - 1];
      
      for (let i = 0; i < layer.children.length; i++) {
        for (let j = 0; j < prevLayer.children.length; j++) {
          const startPoint = new THREE.Vector3().copy(prevLayer.children[j].position);
          startPoint.x += prevLayer.position.x;
          
          const endPoint = new THREE.Vector3().copy(layer.children[i].position);
          endPoint.x += layer.position.x;
          
          positions.push(startPoint.x, startPoint.y, startPoint.z);
          positions.push(endPoint.x, endPoint.y, endPoint.z);
        }
      }
    }
    
    const connectionGeometry = new THREE.BufferGeometry();
    connectionGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    
    const connectionMaterial = new THREE.LineBasicMaterial({ 
      color: 0x0066cc,
      transparent: true,
      opacity: 0.5
    });
    
    this.connections = new THREE.LineSegments(connectionGeometry, connectionMaterial);
    this.scene.add(this.connections);
    
    return this.connections;
  }
  
  clearNetwork() {
    this.networkLayers.forEach(layer => {
      this.scene.remove(layer);
    });
    
    if (this.connections) {
      this.scene.remove(this.connections);
      this.connections = null;
    }
    
    this.networkLayers = [];
  }
  
  updateNodeActivations(activations) {
    for (let l = 0; l < this.networkLayers.length; l++) {
      if (activations[l]) {
        for (let n = 0; n < this.networkLayers[l].children.length; n++) {
          if (activations[l][n]) {
            const node = this.networkLayers[l].children[n];
            const activation = activations[l][n];
            
            node.material.emissive.setRGB(
              activation * 0.5,
              activation * 0.1,
              activation * 0.8
            );
            
            const scale = 1 + activation * 0.5;
            node.scale.set(scale, scale, scale);
          }
        }
      }
    }
  }
  
  generateRandomPath() {
    const path = [];
    let currentLayer = 0;
    
    while (currentLayer < this.networkLayers.length - 1) {
      const sourceNode = Math.floor(Math.random() * this.networkLayers[currentLayer].children.length);
      const targetNode = Math.floor(Math.random() * this.networkLayers[currentLayer + 1].children.length);
      
      const start = new THREE.Vector3()
        .copy(this.networkLayers[currentLayer].children[sourceNode].position)
        .add(this.networkLayers[currentLayer].position);
        
      const end = new THREE.Vector3()
        .copy(this.networkLayers[currentLayer + 1].children[targetNode].position)
        .add(this.networkLayers[currentLayer + 1].position);
      
      path.push({ start, end });
      currentLayer++;
    }
    
    return path;
  }
} 