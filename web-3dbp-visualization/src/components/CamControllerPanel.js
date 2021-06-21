import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Button } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function CamControllerPanel(props) {
    return (
        <Container fluid>
            <Row style={{ display: 'flex', justifyContent: 'center', paddingTop: 5 }}><p class="font-weight-bold"><u>Camera Panel</u></p></Row>
            <Row style={{ display: 'flex', justifyContent: 'center', paddingBottom: 2 }}>
                <Button type="primary" style={{ marginRight: '5px' }} onClick={() => props.changeCamera(1, [9, 1, 6.5], 50, 1.5, 1, 6.5)}> Right</Button>
                <Button type="primary" onClick={() => props.changeCamera(2, [-7.5, 1, 6.5], 50, 1.5, 1, 6.5)}> Left</Button>
            </Row>
            <Row style={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
                <Button type="primary" style={{ marginRight: '5px' }} onClick={() => props.changeCamera(3, [1.5, 9, 6.5], 50, 1.25, 1.5, 6.5)}> Top</Button>
                <Button type="primary" onClick={() => props.changeCamera(4, [1.5, -9, 6.5], 50, 1.25, 1.5, 6.5)}> Bottom</Button>
            </Row>
            <Row style={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
                <Button type="primary" style={{ marginRight: '5px' }} onClick={() => props.changeCamera(5, [1.5, 1.5, 17], 50, 1.5, 1.5, 13)}>Front</Button>
                <Button type="primary" onClick={() => props.changeCamera(6, [1.5, 1.5, -4], 50, 1.5, 1.5, 0)}>Rear</Button>
            </Row>
            <Row style={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
                <Button type="primary" onClick={() => props.changeCamera(0, [8, 3, 10], 50, "", "", "")}>Free(Default)</Button>
            </Row>
        </Container>
    )
}