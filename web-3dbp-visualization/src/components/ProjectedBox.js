import { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei';
import * as THREE from 'three';


export default function ProjectedBox(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef()

    // Box configuration
    var [width, height, length] = [props.item.width, props.item.height, props.item.length]
    const boxGeometry = new THREE.BoxGeometry(width, height, length);
    // May want to change this to basic material due to a minor performance improvement.
    const boxMaterial = new THREE.MeshBasicMaterial({ color: props.color });
    const edges = new THREE.EdgesGeometry(boxGeometry);

    useFrame(() => {
        //mesh.current.rotation.x += 0.001
        mesh.current.rotation.y += 0.005
    })

    return (
        <mesh {...props}
            ref={mesh}
            material={boxMaterial}>
            <boxGeometry args={[width, height, length]} />
            <line geometry={edges} material={new THREE.LineBasicMaterial({ color: 0x000000 })} />
        </mesh>
    )
}