import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Stars, Line } from '@react-three/drei';
import * as THREE from 'three';

export default function AbstractNodes() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[2.5, 1]} />
          <meshStandardMaterial 
            color="#00f5ff" 
            wireframe 
            transparent 
            opacity={0.3}
            emissive="#00f5ff"
            emissiveIntensity={0.8}
          />
        </mesh>
      </Float>
      
      {/* Subtle floating particles behind */}
      <Stars radius={10} depth={50} count={500} factor={4} saturation={0} fade speed={1} />
    </>
  );
}
