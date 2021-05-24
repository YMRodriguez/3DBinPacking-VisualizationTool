import { useState, useRef } from 'react';
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
    const boxMaterial = new THREE.MeshLambertMaterial({ color: hovered ? 'black' : props.color });
    const edges = new THREE.EdgesGeometry(boxGeometry);


    return (
        <mesh {...props}
            ref={mesh}
            position={props.item.mass_center}
            material={boxMaterial}
            onPointerOver={(e) => { e.stopPropagation(); e.target.setPointerCapture(e.pointerId); setHover(true) }}
            onPointerOut={(e) => { // Would not make sense to leave stopPropagation cause it keeps othe elements hanging. 
                setHover(false)
                e.target.releasePointerCapture(e.pointerId);
            }}
            onClick={(e) => { e.stopPropagation(); props.handleID(props.item) }}>
            <boxGeometry args={[width, height, length]} />
            <line geometry={edges} material={new THREE.LineBasicMaterial({ color: 0x000000 })} />
        </mesh>
    )
}