import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Stars, Line } from '@react-three/drei';
import * as THREE from 'three';

export default function AbstractNodes() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.05;
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <>
      <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[2.5, 1]} />
          <meshStandardMaterial 
            color="#CFA85E" 
            wireframe 
            transparent 
            opacity={0.15}
            emissive="#CFA85E"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>
      
      {/* Subtle floating particles behind */}
      <Stars radius={10} depth={50} count={500} factor={4} saturation={0} fade speed={1} />
    </>
  );
}
