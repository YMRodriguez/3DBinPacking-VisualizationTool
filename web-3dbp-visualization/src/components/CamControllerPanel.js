import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Button } from 'antd';


export default function CamControllerPanel(props) {
    return (
        <Container>
            <Row>
                <Button type="primary" onClick={() => props.changeCamera(1, [5, 1, 5], 50, 0, 0, 0)}> Right Side</Button>
                <Button type="primary" onClick={() => props.changeCamera(2, [8, 3, 10], 50, 3, 0, 5)}> Left Side</Button>
            </Row>
            <Row></Row>
            <Row></Row>
        </Container>
    )
}