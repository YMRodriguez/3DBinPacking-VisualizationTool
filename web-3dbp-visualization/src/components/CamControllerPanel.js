import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function CamControllerPanel(props) {
    return (
        <Container >
            <Row class="d-flex justify-content-center"><p class="font-weight-bold"><u>Camera Panel</u></p></Row>
            <Row noGutters class="d-flex justify-content-evenly">
                <Col>
                    <Button type="primary" onClick={() => props.changeCamera(1, [9, 1, 6.5], 50, 1.5, 1, 6.5)}> Right</Button>
                </Col>
                <Col>
                    <Button type="primary" onClick={() => props.changeCamera(2, [-7.5, 1, 6.5], 50, 1.5, 1, 6.5)}> Left</Button>
                </Col>
            </Row>
            <Row noGutters class="d-flex justify-content-evenly pt-2">
                <Col>
                    <Button type="primary" onClick={() => props.changeCamera(3, [1.5, 9, 6.5], 50, 1.25, 1.5, 6.5)}> Top</Button>
                </Col>
                <Col>
                    <Button type="primary" onClick={() => props.changeCamera(4, [1.5, -9, 6.5], 50, 1.25, 1.5, 6.5)}> Bottom</Button>
                </Col>
            </Row>
            <Row noGutters class="d-flex justify-content-evenly pt-2">
                <Col>
                    <Button type="primary" onClick={() => props.changeCamera(5, [1.5, 1.5, 17], 50, 1.5, 1.5, 13)}>Front</Button>
                </Col>
                <Col>
                    <Button type="primary" onClick={() => props.changeCamera(6, [1.5, 1.5, -4], 50, 1.5, 1.5, 0)}>Rear</Button>
                </Col>
            </Row>
        </Container>
    )
}