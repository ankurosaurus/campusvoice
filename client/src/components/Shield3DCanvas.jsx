import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Shield3DCanvas = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 250;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambLight);

    const light1 = new THREE.PointLight(0x38bdf8, 3, 20);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x10b981, 2, 20);
    light2.position.set(-5, -5, 5);
    scene.add(light2);

    // 3D Shield Shape Geometry
    const shape = new THREE.Shape();
    shape.moveTo(0, 1.8);
    shape.quadraticCurveTo(1.5, 1.8, 1.8, 1.2);
    shape.quadraticCurveTo(1.8, -0.4, 0, -2.0);
    shape.quadraticCurveTo(-1.8, -0.4, -1.8, 1.2);
    shape.quadraticCurveTo(-1.5, 1.8, 0, 1.8);

    const extrudeSettings = {
      steps: 2,
      depth: 0.4,
      bevelEnabled: true,
      bevelThickness: 0.15,
      bevelSize: 0.15,
      bevelSegments: 5
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.center();

    const material = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.2,
      metalness: 0.95,
      emissive: 0x0284c7,
      emissiveIntensity: 0.2
    });

    const shieldMesh = new THREE.Mesh(geometry, material);
    scene.add(shieldMesh);

    // Outer Orbiting Rings
    const ringGeo = new THREE.TorusGeometry(2.4, 0.03, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, opacity: 0.6, transparent: true });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    scene.add(ring);

    const ringGeo2 = new THREE.TorusGeometry(2.8, 0.02, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true, opacity: 0.4, transparent: true });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = Math.PI / 4;
    scene.add(ring2);

    let frameId;
    let clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      shieldMesh.rotation.y = Math.sin(t * 0.8) * 0.4;
      shieldMesh.rotation.x = Math.cos(t * 0.6) * 0.15;

      ring.rotation.z = t * 0.5;
      ring2.rotation.y = -t * 0.4;

      renderer.render(scene, camera);
    };

    animate();

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
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-[220px]" />;
};

export default Shield3DCanvas;
