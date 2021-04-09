import React, { useState } from 'react';
import { useThree } from '@react-three/fiber';
import { useGesture } from 'react-use-gesture';
import { useSpring, a } from 'react-spring/three';
import { Text } from '@react-three/drei';


export default function Box(props) {
    //const { size, viewport } = useThree()
    //const aspect = size.width / viewport.width

    /*     const [spring, set] = useSpring(() => ({
            scale: [1, 1, 1],
            position: [0, 0, 0],
            rotation: [0, 0, 0],
            config: { mass: 5, friction: 40, tension: 800 },
        }))
        const bind = useGesture({
            onDrag: ({ offset: [x, y] }) => {
                set({ position: [x / aspect, -y / aspect, 0], rotation: [y / aspect, x / aspect, 0] })
            },
            onHover: ({ hovering }) => set({ scale: hovering ? [1.2, 1.2, 1.2] : [1, 1, 1] }),
        }) */

    return (
        <mesh {...props} position={props.position} >
            <boxGeometry args={props.dimensions} />
            <Text
                color="black" // default
                anchorX="center" // default
                anchorY="middle" // default
            >
                hello world!
            </Text>
            <meshBasicMaterial color={props.color} />
        </mesh>
    )
}