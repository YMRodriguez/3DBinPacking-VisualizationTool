import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stats } from '@react-three/drei';
import Box from './components/Box';
import Container from './components/Container';
import Axis from './components/Axis';
import placed from './placedpackets.json';
import * as THREE from 'three';

function App() {
  // This values will be provided by the system itself or by the operator.
  const truckHeight = 2.45;
  const truckWidth = 2.45;
  const truckLength = 13.6;
  const placedItems = placed
  console.log(placedItems)
  function generateRandomColor() {
    var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
  }

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
      {placedItems.map((item, i) => {
        return (<Box position={item.mass_center}
          dimensions={[item.width, item.height, item.length]}
          color={generateRandomColor()}
          idp={item.in_id} weight={item.weight} />)
      })}
      <OrbitControls screenSpacePanning />
    </Canvas>
  );
}

export default App;
