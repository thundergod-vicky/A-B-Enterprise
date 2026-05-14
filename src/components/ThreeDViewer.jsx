import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  ContactShadows, 
  Grid,
  MeshReflectorMaterial,
  Html,
  Float,
  useGLTF
} from '@react-three/drei';
import * as THREE from 'three';

// --- Procedural Building (Safe & Fast) ---
const ProceduralBuilding = ({ floors = 1, area = 1000, color = "#facc15", label }) => {
  const floorHeight = 3.5;
  const bSize = Math.sqrt(area) / 3;
  const totalHeight = floors * floorHeight;

  return (
    <group>
      <Float speed={1} rotationIntensity={0.05} floatIntensity={0.1}>
        {[...Array(floors)].map((_, i) => (
          <group key={i} position={[0, i * floorHeight + floorHeight/2, 0]}>
            <mesh castShadow>
              <boxGeometry args={[bSize, floorHeight, bSize]} />
              <meshStandardMaterial color="#f1f5f9" roughness={0.7} />
            </mesh>
            <mesh position={[0, 0, bSize/2 + 0.05]}>
              <planeGeometry args={[bSize * 0.7, floorHeight * 0.5]} />
              <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.3} transparent opacity={0.6} />
            </mesh>
          </group>
        ))}
        <mesh position={[0, totalHeight + 1.2, 0]} rotation={[0, Math.PI/4, 0]}>
          <coneGeometry args={[bSize * 0.85, 2.5, 4]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
      </Float>
      <Html position={[0, totalHeight + 5, 0]} center distanceFactor={15}>
        <div style={{
          background: 'rgba(0,0,0,0.95)', border: `1px solid ${color}`, color: 'white',
          padding: '8px 16px', borderRadius: 12, fontSize: 11, fontWeight: 900,
          whiteSpace: 'nowrap', backdropFilter: 'blur(10px)', textTransform: 'uppercase',
          boxShadow: `0 0 20px ${color}33`
        }}>
          🏠 {label} · {floors} STORY
        </div>
      </Html>
    </group>
  );
};

// --- Model Loader Component ---
const ModelLoader = ({ url, floors, area, name }) => {
  try {
    const { scene } = useGLTF(url);
    const clone = useMemo(() => scene.clone(), [scene]);
    
    // Scale logic
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const scale = (Math.sqrt(area) / 20) / Math.max(size.x, size.z);

    return (
      <group>
        <primitive object={clone} scale={[scale, scale * (1 + (floors-1)*0.5), scale]} />
        <Html position={[0, 20, 0]} center distanceFactor={15}>
          <div style={{
            background: 'rgba(0,0,0,0.95)', border: '1px solid #facc15', color: 'white',
            padding: '8px 16px', borderRadius: 12, fontSize: 11, fontWeight: 900,
            whiteSpace: 'nowrap', backdropFilter: 'blur(10px)', textTransform: 'uppercase'
          }}>
            🏠 {name} · {floors} STORY
          </div>
        </Html>
      </group>
    );
  } catch (e) {
    return <ProceduralBuilding floors={floors} area={area} color="#ef4444" label="Fallback Model" />;
  }
};

const ThreeDViewer = ({ floors = 1, area = 1000, modelUrl, modelName }) => {
  return (
    <div style={{
      height: '100%', width: '100%', background: '#000000', position: 'relative'
    }}>
      <Canvas 
        shadows 
        camera={{ position: [50, 40, 50], fov: 28 }}
        style={{ pointerEvents: 'auto' }}
      >
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 60, 180]} />
        
        <ambientLight intensity={0.5} />
        <spotLight position={[30, 45, 30]} angle={0.2} penumbra={1} intensity={2.5} color="#facc15" castShadow />
        <Environment preset="city" />

        <Suspense fallback={<Html center><div style={{ color: '#facc15', fontWeight: 900, letterSpacing: '0.3em' }}>INITIALIZING 3D WORLD...</div></Html>}>
          {modelUrl ? (
            <ModelLoader url={modelUrl} floors={floors} area={area} name={modelName} />
          ) : (
            <ProceduralBuilding floors={floors} area={area} color="#10b981" label="Development" />
          )}
          
          <group position={[20, 0, -15]}>
            <ProceduralBuilding floors={1} area={800} color="#334155" label="Neighbor" />
          </group>
        </Suspense>

        {/* Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <MeshReflectorMaterial
            blur={[300, 100]} resolution={1024} mixBlur={1} mixStrength={60}
            roughness={1} depthScale={1.2} minDepthThreshold={0.4} maxDepthThreshold={1.4}
            color="#020617" metalness={0.5}
          />
        </mesh>

        <Grid infiniteGrid fadeDistance={60} fadeStrength={15} cellSize={2} sectionSize={10} sectionColor="#1e293b" cellColor="#020617" />
        <ContactShadows position={[0, 0, 0]} opacity={0.5} scale={40} blur={2.5} far={10} />
        <OrbitControls makeDefault enableDamping dampingFactor={0.05} maxPolarAngle={Math.PI / 2.1} minDistance={30} maxDistance={150} />
      </Canvas>

      <div style={{
        position: 'absolute', bottom: 30, right: 30, fontSize: 10, color: '#475569', fontWeight: 900,
        pointerEvents: 'none', letterSpacing: '0.1em', background: 'rgba(0,0,0,0.9)', padding: '12px 24px',
        borderRadius: 30, border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)'
      }}>
        LMB: ROTATE • RMB: PAN • SCROLL: ZOOM
      </div>
    </div>
  );
};

export default ThreeDViewer;
