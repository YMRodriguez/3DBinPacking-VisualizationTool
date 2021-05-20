import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { OrbitControls, PerspectiveCamera, Stats } from '@react-three/drei';

import ProjectedBox from './ProjectedBox';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function FloatingPanel(props) {
    return (
        <Canvas >
            <pointLight position={[10, 10, 10]} intensity={1} />
            <ambientLight />
            {console.log(props.selectedItem)}
            <ProjectedBox
                item={props.selectedItem}
                color={props.color} />
        </Canvas>
    )
}