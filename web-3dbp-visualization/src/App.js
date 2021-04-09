import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Box from './components/Box';
import * as THREE from 'three';

function App() {
  const truckHeight = 2.45;
  const truckWidth = 2.45;
  const truckLength = 13.6;

  const origin = new THREE.Vector3(0, 0, 0);
  const xDir = new THREE.Vector3(1, 0, 0);
  const yDir = new THREE.Vector3(0, 1, 0);
  const zDir = new THREE.Vector3(0, 0, 1);
  const xyPlaneGeometry = new THREE.PlaneGeometry(truckWidth, truckHeight).translate(truckWidth / 2, truckHeight / 2, 0)
  const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide })
  material.opacity = 0.8
  return (
    <Canvas style={{ height: '100vh' }} color="black">
      <color attach="background" args={['gray']} />
      <PerspectiveCamera
        makeDefault
        position={[10, 10, 10]}
      >
      </PerspectiveCamera>
      <pointLight position={[10, 10, 10]} intensity={1} />
      <arrowHelper args={[xDir, origin, truckWidth * 1.2, 0x000, 0.2, 0.2]} />
      <arrowHelper args={[yDir, origin, truckHeight * 1.2, 0xff0000, 0.2, 0.2]} />
      <arrowHelper args={[zDir, origin, truckLength * 1.2, 0xff6a00, 0.2, 0.2]} />
      <gridHelper args={[40, 20, 0xffffff, 0xffffff]} position={[0, 0, 0]} />
      <mesh geometry={xyPlaneGeometry} material={material} />
      <Box position={[0.25, 0.25, 0.25]} dimensions={[0.5, 0.5, 0.5]} color="#ff0000" />
      <OrbitControls screenSpacePanning />
    </Canvas>
  );
}

export default App;
