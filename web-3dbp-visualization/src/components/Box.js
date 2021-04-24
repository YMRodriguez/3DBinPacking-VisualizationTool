import React from 'react';
import { Html } from '@react-three/drei';


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
            <Html center distanceFactor={2}>
                <p>id : {props.idp} </p>
                <p> Weight : {props.weight}</p>
            </Html>
            <meshBasicMaterial color={props.color} />
        </mesh>
    )
}