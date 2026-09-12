import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const Hostel3DCanvas = () => {
  const containerRef = useRef(null);
  const [selectedBlock, setSelectedBlock] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 350;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x021526, 0.03);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 10, 18);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    dirLight.position.set(10, 20, 10);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xa855f7, 2, 30);
    pointLight.position.set(-8, 6, -5);
    scene.add(pointLight);

    // 3D Hostel Blocks
    const blocksGroup = new THREE.Group();

    const blockData = [
      { id: 'BH-1', name: 'Boys Hostel BH-1', color: 0x3b82f6, pos: [-6, 0, 0], scale: [3, 5, 3], status: '95.5% SLA' },
      { id: 'BH-2', name: 'Boys Hostel BH-2', color: 0x06b6d4, pos: [-2, 0, -3], scale: [3, 6, 3], status: '91.2% SLA' },
      { id: 'GH-1', name: 'Girls Hostel GH-1', color: 0xec4899, pos: [2, 0, -2], scale: [3.5, 4.5, 3.5], status: '88.5% SLA' },
      { id: 'Mess Alpha', name: 'Mess Alpha Hall', color: 0x10b981, pos: [6, 0, 2], scale: [5, 2.5, 4], status: '98.2% SLA' },
    ];

    const meshMap = [];

    blockData.forEach((data) => {
      // Main Building Mesh
      const geometry = new THREE.BoxGeometry(...data.scale);
      const material = new THREE.MeshStandardMaterial({
        color: data.color,
        roughness: 0.3,
        metalness: 0.4,
        wireframe: false,
        emissive: data.color,
        emissiveIntensity: 0.15
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...data.pos);
      mesh.position.y = data.scale[1] / 2;
      mesh.userData = data;

      // Roof Accent Mesh
      const roofGeo = new THREE.BoxGeometry(data.scale[0] * 1.05, 0.3, data.scale[2] * 1.05);
      const roofMat = new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.8, transparent: true });
      const roof = new THREE.Mesh(roofGeo, roofMat);
      roof.position.y = data.scale[1] / 2 + 0.15;
      mesh.add(roof);

      // Glowing Status Beacon Sphere on Roof
      const beaconGeo = new THREE.SphereGeometry(0.3, 16, 16);
      const beaconMat = new THREE.MeshBasicMaterial({
        color: data.status.includes('95%') || data.status.includes('98%') ? 0x10b981 : 0xf59e0b
      });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.y = data.scale[1] / 2 + 0.6;
      mesh.add(beacon);

      blocksGroup.add(mesh);
      meshMap.push(mesh);
    });

    // Floor Grid Surface
    const gridHelper = new THREE.GridHelper(30, 30, 0x38bdf8, 0x1e293b);
    gridHelper.position.y = 0;
    scene.add(gridHelper);

    scene.add(blocksGroup);

    // Mouse Raycasting
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(meshMap);

      if (intersects.length > 0) {
        document.body.style.cursor = 'pointer';
        const hit = intersects[0].object;
        setSelectedBlock(hit.userData);
      } else {
        document.body.style.cursor = 'default';
      }
    };

    renderer.domElement.addEventListener('pointermove', onPointerMove);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle rotation of 3D scene
      blocksGroup.rotation.y = Math.sin(elapsedTime * 0.3) * 0.15;
      
      // Floating animation for beacons
      meshMap.forEach((mesh, idx) => {
        mesh.position.y = mesh.userData.scale[1] / 2 + Math.sin(elapsedTime * 2 + idx) * 0.08;
      });

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
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        renderer.domElement.removeEventListener('pointermove', onPointerMove);
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[360px] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-sky-950/40 to-slate-950/80 backdrop-blur-md p-4">
      {/* 3D Title Overlay */}
      <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/10 text-xs font-mono text-white flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
        <span>Interactive 3D Campus Inspector (Hover/Touch Blocks)</span>
      </div>

      {/* Selected Block Tooltip */}
      {selectedBlock && (
        <div className="absolute bottom-4 right-4 z-10 bg-black/80 backdrop-blur-xl border border-sky-500/40 p-3 rounded-xl shadow-2xl text-xs text-white max-w-xs animate-fade-rise">
          <div className="font-bold text-sky-400 text-sm">{selectedBlock.name}</div>
          <div className="mt-1 text-neutral-300">Live Status: <strong className="text-emerald-400">{selectedBlock.status}</strong></div>
          <div className="text-[10px] text-neutral-400 mt-1">Pushed to central SLA breach visualizer</div>
        </div>
      )}

      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};

export default Hostel3DCanvas;
