import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import { Table } from 'antd';
import 'antd/dist/reset.css';
import ProjectedBox from './ProjectedBox';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/FloatingPanel.css";


export default function FloatingPanel(props) {
    const [itemData, setItemData] = useState({
        data: []
    })
    const columns = [
        {
            title: "Attribute",
            dataIndex: "attribute",
            key: "attribute"
        },
        {
            title: "Value",
            dataIndex: "value",
            key: "value"
        }]
    const tableProps = {
        tableLayout: 'fixed',
        size: "small",
        bordered: true
    }
    useEffect(() => {
        var d = []
        for (const [key, value] of Object.entries(props.selectedItem.item)) {
            if (key !== "pp_in" && key !== "pp_out" && key !== "subzones" && key !== "mass_center") {
                if (key === "name" || key === "description") {
                    d.push({ key: d.length + 1, attribute: key, value: value })
                } else if (key === 'feasibleOr') {
                    d.push({ key: d.length + 1, attribute: key, value: Array.from(value) })
                } else {
                    d.push({ key: d.length + 1, attribute: key, value: Math.round(value * 100) / 100 })
                }
            }
        }
        setItemData({ data: d })
    }, [props.selectedItem])
    return (
        <Container className='container-border'>
            <Row className='floating-panel-row'>
                <Canvas
                    className='floating-panel-canvas'>
                    <PerspectiveCamera makeDefault position={[0, 0, 1.8]}></PerspectiveCamera>
                    <ambientLight intensity={0.75} />
                    <ProjectedBox
                        item={props.selectedItem.item}
                        color={props.selectedItem.color} />
                </Canvas>
            </Row>
            <Row className='floating-panel-table-row'>
                <Table
                    {...tableProps}
                    columns={columns}
                    scroll={{ y: 350 }}
                    dataSource={itemData.data} />
            </Row>
        </Container>
    )
}
