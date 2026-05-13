import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, Float, MeshDistortMaterial } from '@react-three/drei';

const SiteModel = () => {
  return (
    <group>
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>

      {/* Abstract Building Blocks representing the site */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[2, 4, 2]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.2} />
        </mesh>
      </Float>

      <mesh position={[3, 0.5, -2]}>
        <boxGeometry args={[1.5, 3, 1.5]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>

      <mesh position={[-3, 0.25, 2]}>
        <boxGeometry args={[2, 2.5, 2]} />
        <meshStandardMaterial color="#6366f1" />
      </mesh>

      {/* Decorative elements */}
      <mesh position={[5, 0, 5]}>
        <cylinderGeometry args={[0.1, 0.1, 5, 32]} />
        <meshStandardMaterial color="#475569" />
      </mesh>
      
      <Environment preset="city" />
      <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={20} blur={2.4} far={4.5} />
    </group>
  );
};

const ThreeDViewer = () => {
  return (
    <div className="h-full w-full glass-panel overflow-hidden relative group">
      <div className="absolute top-4 left-4 z-10">
        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/30 backdrop-blur-md">
          3D SITE VIEW (BETA)
        </span>
      </div>
      
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[10, 10, 10]} fov={50} />
        <Suspense fallback={null}>
          <SiteModel />
        </Suspense>
        <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={0.5} />
      </Canvas>

      <div className="absolute bottom-4 right-4 text-text-muted text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
};

export default ThreeDViewer;
