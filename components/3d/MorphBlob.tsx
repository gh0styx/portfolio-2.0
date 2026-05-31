"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

function Blob() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    meshRef.current.rotation.z =
      Math.cos(state.clock.elapsedTime * 0.15) * 0.05;
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={2.4}>
        <icosahedronGeometry args={[1, 64]} />
        <MeshDistortMaterial
          color="#4466ff"
          roughness={0.15}
          metalness={0.8}
          distort={0.45}
          speed={2.5}
          envMapIntensity={1.5}
        />
      </mesh>
    </Float>
  );
}

// Inner glow core
function GlowCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const scale = 1.8 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color="#2244dd" transparent opacity={0.15} />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
      <directionalLight
        position={[-5, -3, 2]}
        intensity={0.8}
        color="#4488ff"
      />
      <pointLight position={[0, 3, 0]} intensity={0.5} color="#8866ff" />
      <spotLight
        position={[0, -5, 5]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#2244cc"
      />

      <GlowCore />
      <Blob />

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.3}
          luminanceSmoothing={0.9}
          intensity={0.8}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

export default function MorphBlob() {
  return (
    <div className="absolute inset-0 z-0 opacity-70">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
