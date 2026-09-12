import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const MessDish3DCanvas = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 200;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3, 6);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambLight);

    const dirLight = new THREE.DirectionalLight(0xf59e0b, 2);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);

    // 3D Dining Plate (Cylinder)
    const plateGeo = new THREE.CylinderGeometry(2, 1.7, 0.2, 32);
    const plateMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.1, metalness: 0.8 });
    const plate = new THREE.Mesh(plateGeo, plateMat);
    scene.add(plate);

    // 3D Dish Bowl (Inner)
    const bowlGeo = new THREE.CylinderGeometry(1.2, 0.9, 0.5, 32);
    const bowlMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.3, metalness: 0.2 });
    const bowl = new THREE.Mesh(bowlGeo, bowlMat);
    bowl.position.y = 0.25;
    plate.add(bowl);

    // Floating Dish Garnish Spheres
    const p1Geo = new THREE.SphereGeometry(0.2, 16, 16);
    const p1Mat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const p1 = new THREE.Mesh(p1Geo, p1Mat);
    p1.position.set(0.3, 0.5, 0.2);
    plate.add(p1);

    const p2Mat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const p2 = new THREE.Mesh(p1Geo, p2Mat);
    p2.position.set(-0.3, 0.5, -0.2);
    plate.add(p2);

    let frameId;
    let clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      plate.rotation.y = t * 0.6;
      p1.position.y = 0.5 + Math.sin(t * 3) * 0.08;
      p2.position.y = 0.5 + Math.cos(t * 3) * 0.08;

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

  return <div ref={containerRef} className="w-full h-[180px]" />;
};

export default MessDish3DCanvas;
