"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function seededRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function Particles({ count = 200 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Spread across a wide area
      pos[i * 3] = (seededRandom(i * 31) - 0.5) * 30;
      pos[i * 3 + 1] = (seededRandom(i * 43) - 0.5) * 60;
      pos[i * 3 + 2] = (seededRandom(i * 59) - 0.5) * 15;

      // Slow upward drift with slight random motion
      vel[i * 3] = (seededRandom(i * 71) - 0.5) * 0.002;
      vel[i * 3 + 1] = seededRandom(i * 83) * 0.005 + 0.002;
      vel[i * 3 + 2] = (seededRandom(i * 97) - 0.5) * 0.001;
    }
    return [pos, vel];
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const posAttr = meshRef.current.geometry.attributes
      .position as THREE.BufferAttribute;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Sinusoidal wave motion
      posAttr.array[i3] +=
        velocities[i3] +
        Math.sin(state.clock.elapsedTime * 0.5 + i * 0.1) * 0.001;
      posAttr.array[i3 + 1] += velocities[i3 + 1];
      posAttr.array[i3 + 2] +=
        velocities[i3 + 2] +
        Math.cos(state.clock.elapsedTime * 0.3 + i * 0.15) * 0.0005;

      // Reset particles that go too high
      if (posAttr.array[i3 + 1] > 30) {
        posAttr.array[i3 + 1] = -30;
      }
    }
    posAttr.needsUpdate = true;

    // Slow global rotation
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#ffffff"
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <Particles count={150} />
    </>
  );
}

export default function FloatingParticles() {
  return (
    <div className="fixed inset-0 z-[1] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 1]}
        gl={{
          antialias: false,
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
