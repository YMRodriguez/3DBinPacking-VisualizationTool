import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Button } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SolutionController(props) {
    return (
        <Container fluid>
            <Row style={{ display: 'flex', justifyContent: 'center', paddingTop: 5 }}><p class="font-weight-bold"><u>Solution By Parameter</u></p></Row>
            <Row style={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
                <Button style={{ marginRight: '5px' }} type="primary" > Volume</Button>
                <Button type="primary" > Weight</Button>
            </Row>
            <Row style={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
                <Button type="primary" > Volumetric Weight</Button>
            </Row>
            <Row style={{ display: 'flex', justifyContent: 'center', paddingTop: 30 }}><p class="font-weight-bold"><u>Packing</u></p></Row>
            <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="primary" style={{ marginRight: '5px' }} onClick={() => { if (props.method !== 1) { props.updatePacking(1) } }}> Step by step </Button>
                <Button type="primary" onClick={() => { if (props.method === 1) { props.updatePacking(0) } }}> Pack Full Solution </Button>
            </Row>
        </Container>
    )
}