import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/CamControllerPanel.css';

export default function CamControllerPanel(props) {
    return (
        <Container>
            <Row className='header-row'>
                <Col s={12} className="header-col">
                    <b>Camera Panel</b>
                </Col>
            </Row>
            <Row className="button-row">
                <Col xs={6}>
                    <button className="antd-like-button top-button" onClick={() => props.changeCamera(3, [1.5, 9, 6.5], 50, 1.25, 1.5, 6.5)}> Top</button>
                </Col>
                <Col xs={6}>
                    <button className="antd-like-button bottom-button" onClick={() => props.changeCamera(4, [1.5, -9, 6.5], 50, 1.25, 1.5, 6.5)}> Bottom</button>
                </Col>
            </Row>
            <Row className="button-row">
                <Col xs={6}>
                    <button className="antd-like-button front-button" onClick={() => props.changeCamera(5, [1.5, 1.5, 17], 50, 1.5, 1.5, 13)}>Front</button>
                </Col>
                <Col xs={6}>
                    <button className="antd-like-button rear-button" onClick={() => props.changeCamera(6, [1.5, 1.5, -4], 50, 1.5, 1.5, 0)}>Rear</button>
                </Col>
            </Row>
            <Row className="button-row">
                <Col xs={12}>
                    <button className="antd-like-button free-button" onClick={() => props.changeCamera(0, [8, 3, 10], 50, "", "", "")}>Default free view</button>
                </Col>
            </Row>
            <Row className="button-row">
                <Col xs={12}>
                    <button className="antd-like-button-default free-button" onClick={props.loadDefaultResults}>Random result</button>
                </Col>
            </Row>
        </Container>
    )
}
