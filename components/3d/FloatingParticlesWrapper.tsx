"use client";

import dynamic from "next/dynamic";

const FloatingParticles = dynamic(
  () => import("@/components/3d/FloatingParticles"),
  { ssr: false }
);

export default function FloatingParticlesWrapper() {
  return <FloatingParticles />;
}
