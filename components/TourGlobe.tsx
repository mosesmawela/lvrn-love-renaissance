import React, { useRef, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TourDate } from '../constants';

interface TourGlobeProps {
  dates: TourDate[];
  selectedArtist: string | null;
  onSelectLocation: (date: TourDate) => void;
}

export const TourGlobe: React.FC<TourGlobeProps> = ({ dates, selectedArtist, onSelectLocation }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const globeRef = useRef<THREE.Mesh | null>(null);
  const markersRef = useRef<THREE.Group>(new THREE.Group());
  const requestRef = useRef<number>(0);

  // Filter dates based on selection
  const visibleDates = useMemo(() => {
    if (!selectedArtist || selectedArtist === 'All') return dates;
    return dates.filter(d => d.artist === selectedArtist);
  }, [dates, selectedArtist]);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    camera.position.z = 18;
    camera.position.y = 5;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.minDistance = 12;
    controls.maxDistance = 25;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.8;
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // Higher ambient for visibility
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xf97316, 2, 50); // Orange glow
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(-10, 10, 5);
    scene.add(dirLight);

    // --- Globe ---
    // Dark Marble Texture / Tech Look
    const geometry = new THREE.SphereGeometry(6, 64, 64);

    // Using optimized textures for better performance
    const textureLoader = new THREE.TextureLoader();
    // Use smaller textures for better performance while maintaining visual quality
    const earthMap = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg');
    const earthBump = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg');
    const earthSpec = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg');

    const material = new THREE.MeshStandardMaterial({ // More efficient than PhongMaterial
      map: earthMap,
      normalMap: earthBump,
      roughness: 0.8,
      metalness: 0.2,
      color: 0xaaaaaa
    });

    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);
    globeRef.current = globe;

    // Atmosphere Glow
    const atmosGeo = new THREE.SphereGeometry(6.2, 64, 64);
    const atmosMat = new THREE.ShaderMaterial({
      vertexShader: `
            varying vec3 vNormal;
            void main() {
                vNormal = normalize(normalMatrix * normal);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
      fragmentShader: `
            varying vec3 vNormal;
            void main() {
                float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 4.0);
                gl_FragColor = vec4(0.6, 0.3, 0.9, 1.0) * intensity;
            }
        `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true
    });
    const atmosphere = new THREE.Mesh(atmosGeo, atmosMat);
    scene.add(atmosphere);

    // Add Marker Group
    scene.add(markersRef.current);

    // Optimized Starfield Background with fewer stars and better distribution
    const starsGeo = new THREE.BufferGeometry();
    const starCount = 500; // Reduced from 1000 to 500 for better performance
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      // Distribute stars more evenly in 3D space
      starPos[i] = (Math.random() - 0.5) * 80;
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starsMat = new THREE.PointsMaterial({ 
      color: 0xffffff, 
      size: 0.08, // Slightly smaller stars
      transparent: true, 
      opacity: 0.4 // Reduced opacity for subtlety
    });
    const starField = new THREE.Points(starsGeo, starsMat);
    scene.add(starField);

    // --- Animation Loop with performance optimizations ---
    const animate = () => {
      requestRef.current = requestAnimationFrame(animate);
      controls.update();

      // Only render if controls have changed or animation is needed
      if (controls.enabled) {
        renderer.render(scene, camera);
      }
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(requestRef.current);
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      geometry.dispose();
      material.dispose();
    };
  }, []);

  // Update Markers when dates change
  useEffect(() => {
    if (!globeRef.current) return;

    // Clear old markers
    const group = markersRef.current;
    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }

    const GLOBE_RADIUS = 6;

    visibleDates.forEach(date => {
      // Convert Lat/Lng to Vector3
      const phi = (90 - date.coordinates.lat) * (Math.PI / 180);
      const theta = (date.coordinates.lng + 180) * (Math.PI / 180);

      const x = -(GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta));
      const z = (GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta));
      const y = (GLOBE_RADIUS * Math.cos(phi));

      const position = new THREE.Vector3(x, y, z);

      // Create Marker Mesh
      // Color based on status
      let color = 0xffffff;
      if (date.status === 'current') color = 0xfacc15; // Yellow/Gold
      else if (date.status === 'upcoming') color = 0xf97316; // Orange
      else if (date.status === 'past') color = 0x52525b; // Gray
      else if (date.status === 'announced') color = 0x3b82f6; // Blue

      // Outer Ring
      const ringGeo = new THREE.RingGeometry(0.12, 0.16, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.lookAt(position.clone().multiplyScalar(2)); // Face outward
      ring.position.copy(position.clone().multiplyScalar(1.01));

      // Inner Dot
      const dotGeo = new THREE.CircleGeometry(0.08, 16);
      const dotMat = new THREE.MeshBasicMaterial({ color: color });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.lookAt(position.clone().multiplyScalar(2));
      dot.position.copy(position.clone().multiplyScalar(1.01));

      // Beam (for current/upcoming)
      if (date.status === 'current' || date.status === 'upcoming') {
        const beamGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.5, 8);
        beamGeo.translate(0, 0.75, 0);
        beamGeo.rotateX(Math.PI / 2);
        const beamMat = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.4 });
        const beam = new THREE.Mesh(beamGeo, beamMat);
        beam.lookAt(position.clone().multiplyScalar(2));
        beam.position.copy(position);
        group.add(beam);
      }

      // Add User Data for Raycasting
      dot.userData = { date };
      ring.userData = { date };

      group.add(ring);
      group.add(dot);
    });

  }, [visibleDates]);

  // Click Interaction (Raycaster logic could be added here, but for simplicity we rely on list selection to rotate)
  // Auto-rotate to selected location if prop changes could be added.

  return (
    <div ref={containerRef} className="w-full h-full cursor-move" />
  );
};