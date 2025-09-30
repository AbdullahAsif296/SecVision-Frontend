"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, OrbitControls } from "@react-three/drei";
import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { Group } from "three";

type ThreeSceneProps = {
  className?: string;
};

function CameraModule() {
  const groupRef = useRef<Group>(null);
  const scanBeamRef = useRef<Group>(null);
  const alertRef = useRef<Group>(null);
  const [alertActive, setAlertActive] = useState(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Subtle camera rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.15) * 0.3;
      groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.15;
    }

    // Scanning beam animation
    if (scanBeamRef.current) {
      scanBeamRef.current.rotation.z = time * 0.8;
    }

    // Alert pulse effect
    if (alertRef.current) {
      const pulse = Math.sin(time * 3) * 0.5 + 0.5;
      alertRef.current.scale.setScalar(1 + pulse * 0.3);
    }

    // Trigger alerts randomly
    if (Math.random() < 0.003) {
      setAlertActive(true);
      setTimeout(() => setAlertActive(false), 2000);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Camera body/housing - darker, more realistic */}
      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh position={[0, 0, -0.4]} castShadow receiveShadow>
          <boxGeometry args={[1.4, 1.4, 2]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.15} />
        </mesh>

        {/* Top panel */}
        <mesh position={[0, 0.7, 0.3]} rotation={[-0.2, 0, 0]} castShadow>
          <boxGeometry args={[1.4, 0.1, 1.2]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Lens housing */}
        <mesh position={[0, 0, 0.75]} castShadow receiveShadow>
          <cylinderGeometry args={[0.75, 0.75, 0.35, 64]} />
          <meshStandardMaterial color="#334155" metalness={0.95} roughness={0.08} />
        </mesh>

        {/* Main lens glass with reflections */}
        <mesh position={[0, 0, 0.95]}>
          <sphereGeometry args={[0.65, 64, 64]} />
          <meshPhysicalMaterial
            color="#0ea5e9"
            transmission={0.7}
            thickness={0.6}
            roughness={0.02}
            metalness={0.05}
            clearcoat={1}
            clearcoatRoughness={0.05}
            reflectivity={0.95}
            ior={1.5}
          />
        </mesh>

        {/* Inner lens aperture */}
        <mesh position={[0, 0, 1]}>
          <ringGeometry args={[0.28, 0.38, 64]} />
          <meshStandardMaterial color="#0f172a" metalness={0.3} roughness={0.1} />
        </mesh>

        {/* Status LED - pulsing when active */}
        <mesh position={[0.55, 0.55, 0.65]}>
          <sphereGeometry args={[0.09, 32, 32]} />
          <meshStandardMaterial 
            color={alertActive ? "#ef4444" : "#22c55e"} 
            emissive={alertActive ? "#ef4444" : "#22c55e"} 
            emissiveIntensity={alertActive ? 3 : 1.5} 
          />
        </mesh>

        {/* Secondary indicator */}
        <mesh position={[-0.55, 0.55, 0.65]}>
          <sphereGeometry args={[0.06, 32, 32]} />
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.8} />
        </mesh>

        {/* Mounting bracket */}
        <mesh position={[0, -0.9, -0.2]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.7, 32]} />
          <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.25} />
        </mesh>

        {/* Side vents */}
        <mesh position={[0.7, 0, 0.2]}>
          <boxGeometry args={[0.05, 0.8, 0.6]} />
          <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[-0.7, 0, 0.2]}>
          <boxGeometry args={[0.05, 0.8, 0.6]} />
          <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
        </mesh>
      </Float>

      {/* Scanning beam effect */}
      <group ref={scanBeamRef} position={[0, 0, 1.3]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.02, 2.5]} />
          <meshStandardMaterial 
            color="#8b5cf6" 
            emissive="#8b5cf6" 
            emissiveIntensity={0.6}
            transparent
            opacity={0.4}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, Math.PI / 2]}>
          <planeGeometry args={[0.02, 2.5]} />
          <meshStandardMaterial 
            color="#8b5cf6" 
            emissive="#8b5cf6" 
            emissiveIntensity={0.6}
            transparent
            opacity={0.4}
          />
        </mesh>
      </group>

      {/* Detection zone arcs with glow */}
      <group position={[0, 0, 1.4]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.3, 0.02, 16, 100, Math.PI * 0.75]} />
          <meshStandardMaterial 
            color="#8b5cf6" 
            emissive="#8b5cf6" 
            emissiveIntensity={alertActive ? 1 : 0.4} 
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.7, 0.018, 16, 100, Math.PI * 0.75]} />
          <meshStandardMaterial 
            color="#a78bfa" 
            emissive="#a78bfa" 
            emissiveIntensity={alertActive ? 0.8 : 0.25} 
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.1, 0.015, 16, 100, Math.PI * 0.75]} />
          <meshStandardMaterial 
            color="#c4b5fd" 
            emissive="#c4b5fd" 
            emissiveIntensity={alertActive ? 0.6 : 0.15} 
          />
        </mesh>
      </group>

      {/* Alert indicator sphere when detection occurs */}
      {alertActive && (
        <group ref={alertRef} position={[1.5, 1.2, 0]}>
          <mesh>
            <sphereGeometry args={[0.15, 32, 32]} />
            <meshStandardMaterial 
              color="#ef4444" 
              emissive="#ef4444" 
              emissiveIntensity={2}
              transparent
              opacity={0.8}
            />
          </mesh>
          {/* Alert pulse ring */}
          <mesh rotation={[0, 0, 0]}>
            <torusGeometry args={[0.25, 0.015, 16, 64]} />
            <meshStandardMaterial 
              color="#ef4444" 
              emissive="#ef4444" 
              emissiveIntensity={1.5}
            />
          </mesh>
        </group>
      )}

      {/* Particle detection indicators */}
      <group position={[0, 0, 1.5]}>
        {[...Array(6)].map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          const radius = 1.2;
          return (
            <mesh 
              key={i} 
              position={[
                Math.cos(angle) * radius, 
                Math.sin(angle) * radius, 
                0
              ]}
            >
              <sphereGeometry args={[0.03, 16, 16]} />
              <meshStandardMaterial 
                color="#06b6d4" 
                emissive="#06b6d4" 
                emissiveIntensity={alertActive && i % 2 === 0 ? 2 : 0.5}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

export default function ThreeScene({ className }: ThreeSceneProps) {
  const [dpr, setDpr] = useState<[number, number]>([1, 2]);

  useEffect(() => {
    // Detect low-end devices and reduce DPR for performance
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const hasLowMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4;
    const hasLowCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    
    if (isMobile || hasLowMemory || hasLowCores) {
      setDpr([1, 1.5]);
    }
  }, []);

  return (
    <div className={className}>
      <Canvas
        shadows
        dpr={dpr}
        camera={{ position: [3.5, 2, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <spotLight position={[-3, 3, 2]} intensity={0.5} angle={0.3} penumbra={0.5} />
        <Suspense fallback={null}>
          <Environment resolution={256} preset="city">
            <Lightformer intensity={1} rotation-x={Math.PI / 2} position={[0, 5, 0]} scale={[10, 10, 1]} />
          </Environment>
          <CameraModule />
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
      </Canvas>
    </div>
  );
}