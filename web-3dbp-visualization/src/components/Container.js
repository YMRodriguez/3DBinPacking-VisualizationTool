import React from 'react';
import * as THREE from 'three';


export default function Container(props) {
    // Mapping dimensions of the truck
    var [truckWidth, truckHeight, truckLength] = props.dimensions;

    // Front plane helper
    const xyPlaneGeometry = new THREE.PlaneGeometry(truckWidth, truckHeight).translate(truckWidth / 2, truckHeight / 2, 0)
    const xyPlaneEdges = new THREE.EdgesGeometry(xyPlaneGeometry)

    // Left plane helper variables
    const zyLeftPlaneGeometry = new THREE.PlaneGeometry(truckLength, truckHeight).translate(truckLength / 2, truckHeight / 2, 0).rotateY(-Math.PI / 2)
    const zyLeftPlaneEdges = new THREE.EdgesGeometry(zyLeftPlaneGeometry)

    // Left plane helper variables
    const zyRightPlaneGeometry = new THREE.PlaneGeometry(truckLength, truckHeight).translate(truckLength / 2, truckHeight / 2, -truckWidth).rotateY(-Math.PI / 2)
    const zyRightPlaneEdges = new THREE.EdgesGeometry(zyRightPlaneGeometry)

    return (
        <mesh >
            <line geometry={xyPlaneEdges} material={new THREE.LineBasicMaterial({ color: 0x0000f6 })} />
            <line geometry={zyLeftPlaneEdges} material={new THREE.LineBasicMaterial({ color: 0x0000f6 })} />
            <line geometry={zyRightPlaneEdges} material={new THREE.LineBasicMaterial({ color: 0x0000f6 })} />
        </mesh>
    )
}
