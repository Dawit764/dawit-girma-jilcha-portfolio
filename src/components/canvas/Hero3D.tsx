import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import AbstractNodes from './AbstractNodes';

export default function Hero3D() {
  return (
    <div className="absolute inset-[-100px] z-0 pointer-events-none opacity-50">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#CFA85E" />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#E07A5F" />
          <AbstractNodes />
        </Suspense>
      </Canvas>
    </div>
  );
}
