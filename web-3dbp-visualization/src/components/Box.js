import { useState, useRef, useEffect } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';


export default function Box(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)

    // Box configuration
    var [width, height, length] = [props.item.width, props.item.height, props.item.length]
    const boxGeometry = new THREE.BoxGeometry(width, height, length);
    // May want to change this to basic material due to a minor performance improvement.
    const boxMaterial = new THREE.MeshLambertMaterial({ color: props.color });
    const edges = new THREE.EdgesGeometry(boxGeometry);

    // Aux function
    //useEffect(function returnID() {
    //    if (active) { props.handleID(active, props.idp) }
    //});

    return (
        <mesh {...props}
            ref={mesh}
            position={props.item.mass_center}
            material={boxMaterial}
            onClick={(e) => { e.stopPropagation(); setActive(!active) }}>
            <boxGeometry args={[width, height, length]} />
            <line geometry={edges} material={new THREE.LineBasicMaterial({ color: 0x000000 })} />
            <Html center={true} distanceFactor={2}>
                <p> id : {props.item.in_id} </p>
                <p> Priority : {props.item.priority}</p>
            </Html>
        </mesh>
    )
}