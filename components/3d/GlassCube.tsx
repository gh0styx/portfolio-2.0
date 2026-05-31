"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const GLOBE_RADIUS = 3.35;
const GLOBE_Y = -1.65;

type ContinentPatch = {
  lon: number;
  lat: number;
  lonRadius: number;
  latRadius: number;
  weight?: number;
};

const CONTINENT_PATCHES: ContinentPatch[] = [
  { lon: 2.58, lat: 0.66, lonRadius: 0.48, latRadius: 0.34 },
  { lon: 2.68, lat: 0.28, lonRadius: 0.38, latRadius: 0.28 },
  { lon: 2.46, lat: -0.36, lonRadius: 0.34, latRadius: 0.58 },
  { lon: 1.45, lat: 0.45, lonRadius: 0.46, latRadius: 0.24 },
  { lon: 1.46, lat: -0.1, lonRadius: 0.42, latRadius: 0.62 },
  { lon: 0.78, lat: 0.34, lonRadius: 0.72, latRadius: 0.34 },
  { lon: 0.44, lat: 0.05, lonRadius: 0.44, latRadius: 0.28 },
  { lon: 0.35, lat: -0.52, lonRadius: 0.28, latRadius: 0.18 },
  { lon: -0.95, lat: -0.42, lonRadius: 0.42, latRadius: 0.2, weight: 0.75 },
];

function seededRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function longitudeDistance(a: number, b: number) {
  const diff = Math.abs(a - b);
  return Math.min(diff, Math.PI * 2 - diff);
}

function continentStrength(lon: number, lat: number) {
  return CONTINENT_PATCHES.reduce((strength, patch) => {
    const lonDistance = longitudeDistance(lon, patch.lon) / patch.lonRadius;
    const latDistance = Math.abs(lat - patch.lat) / patch.latRadius;
    const falloff = Math.max(0, 1 - lonDistance * lonDistance - latDistance * latDistance);
    return Math.max(strength, falloff * (patch.weight ?? 1));
  }, 0);
}

function buildGlobePoints() {
  const land: number[] = [];
  const ocean: number[] = [];
  const glow: number[] = [];
  const rows = 96;
  const columns = 176;

  for (let row = 0; row <= rows; row++) {
    const v = row / rows;
    const lat = Math.PI / 2 - v * Math.PI;
    const ringRadius = Math.cos(lat);
    const rowColumns = Math.max(8, Math.round(columns * ringRadius));

    for (let col = 0; col < rowColumns; col++) {
      const lon = (col / rowColumns) * Math.PI * 2 - Math.PI;
      const jitter = (seededRandom(row * 911 + col * 37) - 0.5) * 0.008;
      const pointLat = lat + jitter;
      const pointLon = lon + jitter;
      const strength = continentStrength(pointLon, pointLat);
      const visibleNoise = seededRandom(row * 149 + col * 23);
      const x = GLOBE_RADIUS * Math.cos(pointLat) * Math.cos(pointLon);
      const y = GLOBE_RADIUS * Math.sin(pointLat);
      const z = GLOBE_RADIUS * Math.cos(pointLat) * Math.sin(pointLon);

      if (strength > 0.18 && visibleNoise < 0.45 + strength * 0.45) {
        land.push(x, y, z);

        if (strength > 0.62 && visibleNoise > 0.74) {
          glow.push(x * 1.003, y * 1.003, z * 1.003);
        }
      } else if (visibleNoise > 0.992 && Math.abs(pointLat) < 1.1) {
        ocean.push(x, y, z);
      }
    }
  }

  return {
    land: new Float32Array(land),
    ocean: new Float32Array(ocean),
    glow: new Float32Array(glow),
  };
}

function PlanetGlobe() {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  const points = useMemo(() => buildGlobePoints(), []);

  useFrame((state) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y = -0.12 + state.clock.elapsedTime * 0.045;
    groupRef.current.rotation.x +=
      (pointer.y * 0.08 - groupRef.current.rotation.x) * 0.035;
    groupRef.current.rotation.z +=
      (pointer.x * -0.04 - groupRef.current.rotation.z) * 0.025;
  });

  return (
    <group ref={groupRef} position={[0, GLOBE_Y, 0]}>
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS * 0.994, 96, 96]} />
        <meshBasicMaterial color="#020006" />
      </mesh>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[points.ocean, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.015}
          color="#5f4bff"
          transparent
          opacity={0.32}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[points.land, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.025}
          color="#bf8cff"
          transparent
          opacity={0.86}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[points.glow, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.055}
          color="#ffffff"
          transparent
          opacity={0.74}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

function AtmosphereGlow() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 0.65) * 0.012;
    meshRef.current.scale.setScalar(pulse);
  });

  return (
    <mesh ref={meshRef} position={[0, GLOBE_Y, -0.02]} scale={GLOBE_RADIUS * 1.045}>
      <sphereGeometry args={[1, 96, 96]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          glowColor: { value: new THREE.Color("#8f36ff") },
        }}
        vertexShader={`
          varying float vIntensity;
          void main() {
            vec3 vNormal = normalize(normalMatrix * normal);
            vec3 viewNormal = normalize(vec3(0.0, 0.0, 1.0));
            vIntensity = pow(0.68 - dot(vNormal, viewNormal), 2.4);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 glowColor;
          varying float vIntensity;
          void main() {
            gl_FragColor = vec4(glowColor, vIntensity * 0.98);
          }
        `}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

function EquatorBloom() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.025;
  });

  return (
    <mesh ref={meshRef} position={[0.9, GLOBE_Y + 0.2, 0.18]} rotation={[0.24, -0.58, 0.08]}>
      <circleGeometry args={[1.05, 96]} />
      <meshBasicMaterial
        color="#a855f7"
        transparent
        opacity={0.18}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function Stars({ count = 170 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (seededRandom(i * 31) - 0.5) * 16;
      pos[i * 3 + 1] = seededRandom(i * 47) * 7 - 0.8;
      pos[i * 3 + 2] = -4 - seededRandom(i * 59) * 7;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.004;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#ffffff"
        transparent
        opacity={0.48}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#000000"]} />
      <Stars />
      <AtmosphereGlow />
      <PlanetGlobe />
      <EquatorBloom />
    </>
  );
}

export default function GlassCube() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 42 }}
        dpr={[1, 1.6]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
        }}
        performance={{ min: 0.5 }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
