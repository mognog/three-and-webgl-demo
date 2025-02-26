import * as THREE from 'three';
import { setupScene } from './sceneSetup.js';
import { ParticleSystem } from './particleSystem.js';
import { NetworkBuilder } from './networkBuilder.js';

export class NetworkVisualizer {
    constructor(container) {
        console.log("NetworkVisualizer constructor called");

        // Store the container reference
        this.container = container;

        // Save the original container content to restore later
        this.originalContent = container.innerHTML;

        // Setup Three.js scene
        const { scene, camera, renderer, controls, canvas } = setupScene(container);
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.controls = controls;
        this.canvas = canvas;

        // Create network builder
        this.networkBuilder = new NetworkBuilder(this.scene);

        // Create particle system
        this.particleSystem = new ParticleSystem(this.scene);

        // Animation properties
        this.clock = new THREE.Clock();

        // Frame rate control
        this.lastTime = 0;
        this.frameRateLimit = 60;

        // Handle window resize
        window.addEventListener('resize', this.onWindowResize.bind(this));

        // Start animation loop
        this.animate();

        // Flag to track if the visualizer is currently displayed
        this.isDisplayed = false;
    }

    // Method to display the visualizer
    display() {
        if (!this.isDisplayed) {
            // Clear the container and add our canvas
            this.container.innerHTML = '';
            this.container.appendChild(this.canvas);
            this.isDisplayed = true;

            // Trigger a resize to ensure correct dimensions
            this.onWindowResize();
        }
    }

    createNetwork(architecture) {
        // Make sure we're displayed
        this.display();

        console.log("Creating network with architecture:", architecture);

        // Use the network builder to create the network
        this.networkLayers = this.networkBuilder.createNetwork(architecture);
    }

    animateDataFlow(inputData, activations) {
        // Make sure we're displayed
        this.display();

        // Create particles that flow through the network based on activations
        for (let i = 0; i < this.networkLayers[0].children.length; i++) {
            if (inputData[i] > 0.5) {
                const startNode = this.networkLayers[0].children[i];
                const startPosition = new THREE.Vector3().copy(startNode.position);
                startPosition.x += this.networkLayers[0].position.x;

                const path = this.networkBuilder.generateRandomPath();
                const speed = 0.01 + Math.random() * 0.02;

                this.particleSystem.addParticle(startPosition, path, speed);
            }
        }

        // Update node colors based on activations
        this.networkBuilder.updateNodeActivations(activations);
    }

    clearNetwork() {
        this.networkBuilder.clearNetwork();
        this.particleSystem.clearParticles();
    }

    onWindowResize() {
        if (!this.container || !this.isDisplayed) return;

        const containerWidth = this.container.clientWidth;
        const containerHeight = this.container.clientHeight;
        
        this.camera.aspect = containerWidth / containerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(containerWidth, containerHeight);
    }

    animate(time) {
        requestAnimationFrame(this.animate.bind(this));

        // Only render if we're displayed
        if (!this.isDisplayed) return;

        // Limit frame rate
        if (time && this.frameRateLimit) {
            if (time - this.lastTime < 1000 / this.frameRateLimit) {
                return;
            }
            this.lastTime = time;
        }

        // Update controls
        this.controls.update();

        // Update particle animations
        const deltaTime = this.clock.getDelta();
        this.particleSystem.updateParticles(deltaTime);

        // Render scene
        this.renderer.render(this.scene, this.camera);
    }
} 