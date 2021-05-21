import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import { Table } from 'baseui/table-semantic'
import ProjectedBox from './ProjectedBox';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function FloatingPanel(props) {
    const [itemData, setItemData] = useState({
        data: []
    })

    useEffect(() => {
        var d = []
        for (const [key, value] of Object.entries(props.selectedItem.item)) {
            if (key !== "pp_in" && key !== "pp_out" && key !== "subzones" && key !== "mass_center") {
                d.push([key, value])
            }
        }
        console.log(d)
        setItemData({ data: d })
    }, [props.selectedItem])
    return (
        <Container>
            <Row style={{ border: '2px solid black', borderRadius: 8, height: '25vh' }}>
                <Canvas
                    style={{
                        borderRadius: 8,
                        borderColor: 'black',
                    }}>
                    <PerspectiveCamera makeDefault position={[0, 0, 1.3]}></PerspectiveCamera>
                    <ambientLight intensity={1.5} />
                    {console.log(props.selectedItem)}
                    <ProjectedBox
                        item={props.selectedItem.item}
                        color={props.color} />
                </Canvas>
            </Row>
            <Table
                columns={["Attribute", "Value"]}
                data={itemData.data} />

            <Row>

            </Row>
        </Container>
    )
}
