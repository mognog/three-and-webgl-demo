import * as THREE from 'three';

export class ParticleSystem {
  constructor(scene, maxParticles = 100) {
    this.scene = scene;
    this.maxParticles = maxParticles;
    this.particlePool = [];
    this.activeParticles = [];
    
    this.initParticlePool();
  }
  
  initParticlePool() {
    // Create a reusable pool of particles
    const particleGeometry = new THREE.SphereGeometry(0.15, 8, 8);
    const particleMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffff00,
      transparent: true,
      opacity: 0.8
    });
    
    for (let i = 0; i < this.maxParticles; i++) {
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      particle.visible = false;
      this.scene.add(particle);
      this.particlePool.push({
        mesh: particle,
        inUse: false,
        path: null,
        progress: 0,
        speed: 0
      });
    }
  }
  
  getParticleFromPool() {
    for (let i = 0; i < this.particlePool.length; i++) {
      if (!this.particlePool[i].inUse) {
        this.particlePool[i].inUse = true;
        this.particlePool[i].mesh.visible = true;
        return this.particlePool[i];
      }
    }
    return null;
  }
  
  updateParticles(deltaTime) {
    for (let i = this.activeParticles.length - 1; i >= 0; i--) {
      const particle = this.activeParticles[i];
      
      if (particle.path && particle.path.length > 0) {
        const currentPathSegment = Math.floor(particle.progress);
        
        if (currentPathSegment < particle.path.length) {
          const segmentProgress = particle.progress - currentPathSegment;
          const currentPath = particle.path[currentPathSegment];
          
          particle.mesh.position.lerpVectors(
            currentPath.start,
            currentPath.end,
            segmentProgress
          );
          
          particle.progress += particle.speed;
        } else {
          particle.inUse = false;
          particle.mesh.visible = false;
          this.activeParticles.splice(i, 1);
        }
      }
    }
  }
  
  addParticle(position, path, speed) {
    const particle = this.getParticleFromPool();
    if (particle) {
      particle.mesh.position.copy(position);
      particle.path = path;
      particle.progress = 0;
      particle.speed = speed;
      
      this.activeParticles.push(particle);
      return particle;
    }
    return null;
  }
  
  clearParticles() {
    this.activeParticles.forEach(particle => {
      particle.inUse = false;
      particle.mesh.visible = false;
    });
    
    this.activeParticles = [];
  }
} 