import { Html } from '@react-three/drei';
import * as THREE from 'three';


export default function Axis(props) {
    // Axes helpers
    const origin = new THREE.Vector3(0, 0, 0);
    const xDir = new THREE.Vector3(1, 0, 0);
    const yDir = new THREE.Vector3(0, 1, 0);
    const zDir = new THREE.Vector3(0, 0, 1);

    // Mapping dimensions of the truck
    var [truckWidth, truckHeight, truckLength] = props.dimensions;

    return (
        <mesh>
            <arrowHelper args={[xDir, origin, truckWidth * 1.2, 0x000, 0.2, 0.2]} />
            <arrowHelper args={[yDir, origin, truckHeight * 1.2, 0xff0000, 0.2, 0.2]} />
            <arrowHelper args={[zDir, origin, truckLength * 1.2, 0xff6a00, 0.2, 0.2]} />
            <Html style={{ color: "white", fontSize: 120 }} position={[truckWidth * 1.2, 0, 0]} distanceFactor={1} >
                X-axis
            </Html>
            <Html style={{ color: "white", fontSize: 120 }} position={[0, truckHeight * 1.2, 0]} distanceFactor={1} >
                Y-axis
            </Html>
            <Html style={{ color: "white", fontSize: 120 }} position={[0, 0, truckLength * 1.2]} distanceFactor={1} >
                Z-axis
            </Html>
        </mesh>
    )
}