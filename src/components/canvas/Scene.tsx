import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// A simple particle system for fireflies/pollen
function Fireflies({ count = 100 }) {
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 40; // x
      p[i * 3 + 1] = (Math.random() - 0.5) * 40; // y
      p[i * 3 + 2] = (Math.random() - 0.5) * 40; // z
    }
    return p;
  }, [count]);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#a4d1a2"
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Camera controller that follows a path based on scroll
function CameraRig() {
  const { camera, mouse, size } = useThree();
  const scrollRef = useRef(0);
  
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 5, 20),
      new THREE.Vector3(-10, 2, 10),
      new THREE.Vector3(5, -2, 0),
      new THREE.Vector3(0, 0, -15),
      new THREE.Vector3(-5, -5, -30),
    ]);
  }, []);

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        scrollRef.current = self.progress;
      }
    });
    return () => st.kill();
  }, []);

  useFrame((state, delta) => {
    // Current scroll progress (0 to 1)
    const t = scrollRef.current;
    
    // Get position on curve
    const pos = curve.getPointAt(Math.max(0.001, Math.min(0.999, t)));
    // Get point slightly ahead to look at
    const target = curve.getPointAt(Math.max(0.001, Math.min(0.999, t + 0.05)));
    
    // Smoothly interpolate camera position
    camera.position.lerp(pos, 0.05);
    
    // Base rotation from curve
    const dummy = new THREE.Object3D();
    dummy.position.copy(camera.position);
    dummy.lookAt(target);
    
    // Add parallax based on mouse
    const parallaxX = (mouse.x * size.width) / 10000;
    const parallaxY = (mouse.y * size.height) / 10000;
    
    dummy.rotation.y += parallaxX;
    dummy.rotation.x -= parallaxY;
    
    camera.quaternion.slerp(dummy.quaternion, 0.05);
  });

  return null;
}

// Lighting that changes based on scroll
function DynamicLights() {
  const dirLight = useRef<THREE.DirectionalLight>(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        scrollRef.current = self.progress;
      }
    });
    return () => st.kill();
  }, []);

  useFrame(() => {
    if (!dirLight.current) return;
    const t = scrollRef.current;
    
    // Morning -> Golden Hour -> Night
    const color = new THREE.Color();
    if (t < 0.5) {
      color.lerpColors(new THREE.Color('#e0f2fe'), new THREE.Color('#f59e0b'), t * 2);
    } else {
      color.lerpColors(new THREE.Color('#f59e0b'), new THREE.Color('#1e3a8a'), (t - 0.5) * 2);
    }
    
    dirLight.current.color.copy(color);
    dirLight.current.intensity = THREE.MathUtils.lerp(1.5, 0.5, t);
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight ref={dirLight} position={[10, 20, 5]} castShadow />
    </>
  );
}

export default function Scene() {
  return (
    <div className="fixed inset-0 z-0 bg-[#0f1714] pointer-events-none">
      <Canvas
        camera={{ position: [0, 5, 20], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', function(e) {
            e.preventDefault();
            gl.domElement.style.opacity = '0';
          }, false);
          gl.domElement.addEventListener('webglcontextrestored', function(e) {
            gl.domElement.style.opacity = '1';
          }, false);
        }}
      >
        <fog attach="fog" args={['#0f1714', 10, 40]} />
        <CameraRig />
        <DynamicLights />
        <Fireflies count={250} />
        <Environment preset="forest" />
      </Canvas>
    </div>
  );
}
