'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function ParticleField() {
  const ref = useRef<THREE.Points>(null!)
  
  // Generate random particle positions in a sphere
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(2000 * 3)
    const colors = new Float32Array(2000 * 3)
    
    for (let i = 0; i < 2000; i++) {
      // Random position in sphere
      const r = Math.random() * 5 + 3
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
      
      // Color gradient (blue to purple to cyan)
      const colorMix = Math.random()
      if (colorMix < 0.33) {
        colors[i * 3] = 0.4 + Math.random() * 0.3     // R
        colors[i * 3 + 1] = 0.5 + Math.random() * 0.3 // G
        colors[i * 3 + 2] = 1                          // B
      } else if (colorMix < 0.66) {
        colors[i * 3] = 0.6 + Math.random() * 0.4     // R
        colors[i * 3 + 1] = 0.3 + Math.random() * 0.3 // G
        colors[i * 3 + 2] = 1                          // B
      } else {
        colors[i * 3] = 0.3 + Math.random() * 0.3     // R
        colors[i * 3 + 1] = 0.8 + Math.random() * 0.2 // G
        colors[i * 3 + 2] = 1                          // B
      }
    }
    
    return [positions, colors]
  }, [])
  
  // Animate particles
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    if (ref.current) {
      ref.current.rotation.x = time * 0.05
      ref.current.rotation.y = time * 0.075
      
      // Subtle pulsing effect
      const scale = 1 + Math.sin(time * 0.5) * 0.1
      ref.current.scale.set(scale, scale, scale)
    }
  })
  
  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        vertexColors
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
      <bufferAttribute
        attach="attributes-color"
        count={colors.length / 3}
        array={colors}
        itemSize={3}
      />
    </Points>
  )
}

export function ThreeParticleBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.5} />
        <ParticleField />
      </Canvas>
      
      {/* Overlay gradient for better readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/40 pointer-events-none" />
    </div>
  )
}
