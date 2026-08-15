import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Plus, Minus, Camera, X, Check, Eye, RotateCcw } from "lucide-react";

export default function CheckInMannequin3D({
  onCommit,
  initialPain = 4,
  initialTemp = 37.2,
  className = ""
}) {
  const containerRef = useRef(null);
  const [painLevel, setPainLevel] = useState(initialPain);
  const [temperature, setTemperature] = useState(initialTemp);
  const [isCelsius, setIsCelsius] = useState(true);
  const [selectedZones, setSelectedZones] = useState(["Head"]);
  const [photoMode, setPhotoMode] = useState(false);
  const [framePos, setFramePos] = useState({ x: 0, y: 0 });
  const [photos, setPhotos] = useState([]);
  const [isDraggingFrame, setIsDraggingFrame] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, initialX: 0, initialY: 0 });

  const rotationRef = useRef({ y: 0, targetY: 0, isDragging: false, lastX: 0 });
  const mixerRef = useRef(null);

  const zonesList = [
    "Head",
    "Neck",
    "Shoulders",
    "Chest",
    "Back",
    "Abdomen",
    "Arms",
    "Hands",
    "Legs",
    "Feet"
  ];

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0e1c19);

    // Camera (matching Sceneview in CheckInScreen.kt)
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 5.8);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, preserveDrawingBuffer: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    if (THREE.SRGBColorSpace) {
      renderer.outputColorSpace = THREE.SRGBColorSpace;
    }
    container.appendChild(renderer.domElement);

    // Lighting (matching Android Sceneview)
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x1d3b34, 0.85);
    scene.add(hemiLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.8);
    mainLight.position.set(1.5, 4.0, 3.5);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x3ddc84, 0.35);
    fillLight.position.set(-2, 1, -2);
    scene.add(fillLight);

    // Floor glow circle
    const floorGeo = new THREE.CircleGeometry(1.6, 32);
    const floorMat = new THREE.MeshBasicMaterial({ color: 0x162c26 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.25;
    scene.add(floor);

    let mannequinGroup = new THREE.Group();
    scene.add(mannequinGroup);

    // Load mannequin_pbr.glb
    const loader = new GLTFLoader();
    loader.load(
      "/mannequin_pbr.glb",
      (gltf) => {
        const model = gltf.scene;
        // Scale to fit viewport perfectly
        model.scale.set(0.34, 0.34, 0.34);
        model.position.set(0, -1.25, 0);

        mannequinGroup.add(model);

        // Play animations if available
        if (gltf.animations && gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(model);
          mixerRef.current = mixer;
          const action = mixer.clipAction(gltf.animations[0]);
          action.setEffectiveTimeScale(0.3);
          action.play();
        }
      },
      undefined,
      (err) => {
        console.warn("Could not load mannequin_pbr.glb, rendering geometric mannequin fallback", err);
        // Fallback procedural robot mannequin if GLB path requires fallback
        const geom = new THREE.CapsuleGeometry(0.35, 1.2, 8, 16);
        const mat = new THREE.MeshStandardMaterial({ color: 0x24433a, roughness: 0.4 });
        const mesh = new THREE.Mesh(geom, mat);
        mesh.position.y = 0;
        mannequinGroup.add(mesh);
      }
    );

    // Resize handler
    function handleResize() {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener("resize", handleResize);

    // Animation Loop
    const clock = new THREE.Clock();
    let reqId;
    function animate() {
      reqId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      if (mixerRef.current) {
        mixerRef.current.update(delta);
      }

      // Smooth rotation interpolation
      rotationRef.current.y += (rotationRef.current.targetY - rotationRef.current.y) * 0.12;
      mannequinGroup.rotation.y = rotationRef.current.y;

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Drag-to-spin controls for 3D model
  function handlePointerDown(e) {
    if (photoMode) return;
    rotationRef.current.isDragging = true;
    rotationRef.current.lastX = e.clientX;
  }

  function handlePointerMove(e) {
    if (!rotationRef.current.isDragging || photoMode) return;
    const deltaX = e.clientX - rotationRef.current.lastX;
    rotationRef.current.lastX = e.clientX;
    rotationRef.current.targetY += deltaX * 0.015;
  }

  function handlePointerUp() {
    rotationRef.current.isDragging = false;
  }

  // Draggable photo frame controls
  function handleFrameMouseDown(e) {
    e.stopPropagation();
    setIsDraggingFrame(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      initialX: framePos.x,
      initialY: framePos.y
    };
  }

  function handleFrameMouseMove(e) {
    if (!isDraggingFrame) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setFramePos({
      x: dragStartRef.current.initialX + dx,
      y: dragStartRef.current.initialY + dy
    });
  }

  function handleFrameMouseUp() {
    setIsDraggingFrame(false);
  }

  function toggleZone(zone) {
    if (selectedZones.includes(zone)) {
      setSelectedZones(selectedZones.filter((z) => z !== zone));
    } else {
      setSelectedZones([...selectedZones, zone]);
    }
  }

  function handleAddPhotoConfirm() {
    const newPhoto = {
      id: Date.now(),
      x: framePos.x,
      y: framePos.y,
      zone: selectedZones[0] || "Target"
    };
    setPhotos([...photos, newPhoto]);
    setPhotoMode(false);
    setFramePos({ x: 0, y: 0 });
  }

  function handleCommit() {
    if (onCommit) {
      onCommit({
        pain: painLevel,
        temp: isCelsius ? temperature : ((temperature - 32) * 5) / 9,
        zones: selectedZones,
        photosCount: photos.length
      });
    }
  }

  const displayTemp = isCelsius ? temperature.toFixed(1) : ((temperature * 9) / 5 + 32).toFixed(1);

  return (
    <div
      className={`relative w-full overflow-hidden rounded-3xl border-2 border-sage/40 bg-[#0E1C19] text-white shadow-2xl select-none ${className}`}
      style={{ minHeight: "580px" }}
      onPointerDown={handlePointerDown}
      onPointerMove={(e) => {
        handlePointerMove(e);
        handleFrameMouseMove(e);
      }}
      onPointerUp={() => {
        handlePointerUp();
        handleFrameMouseUp();
      }}
    >
      {/* 3D Scene Viewport Canvas */}
      <div ref={containerRef} className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing" />

      {/* Grid Lines HUD Layer */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3DDC8408_1px,transparent_1px),linear-gradient(to_bottom,#3DDC8408_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

      {/* ── PHOTO MODE OVERLAY (Matching CheckInScreen.kt) ── */}
      {photoMode && (
        <div className="absolute inset-0 z-30 bg-black/40 flex flex-col justify-between p-6">
          <div className="mx-auto rounded-xl bg-black/80 backdrop-blur px-4 py-2 text-xs font-bold text-white border border-white/20 shadow-lg">
            Drag reticle frame to target anatomical area
          </div>

          {/* Draggable Frame */}
          <div
            onMouseDown={handleFrameMouseDown}
            style={{
              transform: `translate(${framePos.x}px, ${framePos.y}px)`
            }}
            className="absolute top-1/2 left-1/2 -ml-8 -mt-8 h-16 w-16 rounded-xl border-2 border-white bg-white/10 backdrop-blur-sm cursor-move shadow-[0_0_20px_rgba(255,255,255,0.4)] flex items-center justify-center"
          >
            <div className="h-2 w-2 rounded-full bg-white animate-ping" />
          </div>

          {/* Cancel / Confirm actions */}
          <div className="flex justify-center gap-3 mb-24">
            <button
              onClick={() => setPhotoMode(false)}
              className="rounded-xl border border-white/30 bg-black/60 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white/80 hover:bg-black/90 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleAddPhotoConfirm}
              className="rounded-xl bg-white px-5 py-2 text-xs font-bold uppercase tracking-wider text-black shadow-lg hover:bg-gray-100 transition"
            >
              Confirm Target
            </button>
          </div>
        </div>
      )}

      {/* ── FLOATING HUD CONTROLS (Exact Jetpack Compose Spatial Layout) ── */}
      <div className="relative z-10 flex h-full flex-col justify-between p-6 pointer-events-none">
        {/* Top View Bar */}
        <div className="flex justify-between items-center pointer-events-auto">
          <span className="rounded-full bg-black/60 backdrop-blur border border-white/10 px-3 py-1 text-[11px] font-bold text-mint uppercase tracking-wider flex items-center gap-1.5 shadow-md">
            <Eye size={12} /> 3D Anatomical Spatial HUD
          </span>
          <button
            onClick={() => {
              rotationRef.current.targetY += Math.PI;
            }}
            className="rounded-full bg-black/60 backdrop-blur border border-white/10 px-3 py-1 text-xs font-bold text-white/80 hover:text-white transition flex items-center gap-1 shadow-md"
          >
            <RotateCcw size={13} /> Turn 180°
          </button>
        </div>

        {/* Center Spatial Gadgets: PAIN / PHOTO / TEMP (Matching GadgetReadout in Jetpack Compose) */}
        <div className="my-auto grid grid-cols-3 items-end gap-2 text-center pointer-events-auto pb-4">
          {/* Left Gadget: PAIN LADDER */}
          <div className="flex flex-col items-center">
            <span className="text-[11px] font-bold uppercase tracking-widest text-white/50">PAIN</span>
            <span className="text-3xl sm:text-4xl font-black text-white drop-shadow-md">
              {painLevel}
            </span>
            <span className="text-[11px] font-bold text-white/50">/ 10</span>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => setPainLevel(Math.max(0, painLevel - 1))}
                className="grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-white/10 text-white font-bold text-base hover:bg-white/20 active:scale-95 transition"
              >
                <Minus size={14} />
              </button>
              <button
                onClick={() => setPainLevel(Math.min(10, painLevel + 1))}
                className="grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-white/10 text-white font-bold text-base hover:bg-white/20 active:scale-95 transition"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Center Gadget: PHOTO SHUTTER */}
          <div className="flex flex-col items-center">
            <span className="text-[11px] font-bold uppercase tracking-widest text-white/50">PHOTO</span>
            <button
              onClick={() => setPhotoMode(true)}
              className="mt-2 grid h-14 w-14 place-items-center rounded-full border border-white/30 bg-white/10 text-white shadow-xl hover:bg-white/20 active:scale-95 transition backdrop-blur-md"
              title="Add anatomical photo"
            >
              <div className="grid h-9 w-9 place-items-center rounded-full border border-white/60">
                <Camera size={18} />
              </div>
            </button>
            <span className="mt-1 text-[10px] text-mint font-semibold">
              {photos.length > 0 ? `${photos.length} Captured` : "Tap to aim"}
            </span>
          </div>

          {/* Right Gadget: TEMPERATURE */}
          <div className="flex flex-col items-center">
            <span className="text-[11px] font-bold uppercase tracking-widest text-white/50">TEMP</span>
            <span className="text-3xl sm:text-4xl font-black text-white drop-shadow-md">
              {displayTemp}
            </span>
            <button
              onClick={() => setIsCelsius(!isCelsius)}
              className="rounded px-1.5 py-0.5 text-[11px] font-bold text-white/60 hover:text-white bg-white/5"
            >
              {isCelsius ? "°C" : "°F"}
            </button>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => setTemperature(Math.max(35.0, Number((temperature - 0.2).toFixed(1))))}
                className="grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-white/10 text-white font-bold text-base hover:bg-white/20 active:scale-95 transition"
              >
                <Minus size={14} />
              </button>
              <button
                onClick={() => setTemperature(Math.min(41.0, Number((temperature + 0.2).toFixed(1))))}
                className="grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-white/10 text-white font-bold text-base hover:bg-white/20 active:scale-95 transition"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section: Zone Badges & Save Button (Matching CheckInScreen.kt) */}
        <div className="space-y-3 pointer-events-auto">
          {/* Zone Badges Pill Carousel */}
          <div className="flex flex-wrap justify-center gap-1.5 max-h-24 overflow-y-auto py-1">
            {zonesList.map((zone) => {
              const isSelected = selectedZones.includes(zone);
              return (
                <button
                  key={zone}
                  onClick={() => toggleZone(zone)}
                  className={`rounded-xl px-2.5 py-1 text-xs font-bold transition-all shadow-sm ${
                    isSelected
                      ? "bg-mint text-mint-dark ring-2 ring-mint/50 scale-105"
                      : "bg-black/50 text-white/70 border border-white/15 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {zone} {isSelected && "✓"}
                </button>
              );
            })}
          </div>

          {/* Commit Action Button */}
          <button
            onClick={handleCommit}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-sage py-3.5 text-sm font-black uppercase tracking-widest text-white shadow-xl hover:bg-sage-dark active:scale-[0.99] transition border border-mint/20"
          >
            <Check size={18} /> Commit to Living Timeline
          </button>
        </div>
      </div>
    </div>
  );
}
