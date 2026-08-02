import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import AbstractNodes from './AbstractNodes';

export default function Hero3D() {
  return (
    <div className="absolute inset-[-100px] z-0 pointer-events-auto opacity-70">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#00f5ff" />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#7c3aed" />
          <AbstractNodes />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.8} 
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
