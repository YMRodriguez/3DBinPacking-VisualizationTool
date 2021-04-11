import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stats } from '@react-three/drei';
import Box from './components/Box';
import Container from './components/Container';
import Axis from './components/Axis';
import * as THREE from 'three';

function App() {
  // This values will be provided by the system itself or by the operator.
  const truckHeight = 2.45;
  const truckWidth = 2.45;
  const truckLength = 13.6;

  return (
    <Canvas style={{ height: '100vh', background: 'gray' }} color="black">
      <PerspectiveCamera
        makeDefault
        position={[5, 5, 5]}
      >
      </PerspectiveCamera>
      <Stats />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Axis dimensions={[truckWidth, truckHeight, truckLength]} />
      <Container dimensions={[truckWidth, truckHeight, truckLength]} />
      <Box position={[1.25, 1.25, 1.25]} dimensions={[0.5, 0.5, 0.5]} color="#ff0000" idp={2} weight={20} />
      <OrbitControls screenSpacePanning />
    </Canvas>
  );
}

export default App;
