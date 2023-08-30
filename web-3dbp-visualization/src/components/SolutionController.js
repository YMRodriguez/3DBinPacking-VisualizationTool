import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import { changeCounter } from '../redux/actions';
import '../css/SolutionController.css';
import { Col } from 'antd';

export default function SolutionController(props) {
    const { method, updatePacking, counterForPacking, dispatch, placedItems } = props;


    const handleNavigation = (direction) => {
        // Ensure the packing method is "Step by step"
        if (method !== 1) {
            updatePacking(1);
        }

        // Navigate to the next or previous item
        if (direction === 'next' && counterForPacking < placedItems.bestFilteredVolume.length - 2) {
            dispatch(changeCounter(counterForPacking + 1));
        } else if (direction === 'prev' && counterForPacking > 0) {
            dispatch(changeCounter(counterForPacking - 1));
        }
    };


    return (
        <Container>
            <Row className="center-row">
                <Col xs={14} className="header-col">
                    <b>Packing controller</b>
                </Col>
            </Row>
            <Row className="center-row">
                <Col sm={14}>
                    <button className="antd-like-button" onClick={() => { if (method === 1) { updatePacking(0) } }}>Full Cargo Visualization</button>
                </Col>
            </Row>
            <Container fluid className='button-container'>
                <Row className='button-header'>
                    <Col sm={30} className="header-col">
                        <b>Sequential packing controller</b>
                    </Col>
                </Row>
                <Row className='button-group'>
                    <Col xs={24}>
                        <button className="antd-like-button spaced-btn" onClick={() => { if (method !== 1) { updatePacking(1) } }}>Start</button>
                    </Col>
                    <Row className='button-group'>
                        <Col sm={11}>
                            <button className='prev-btn' onClick={() => handleNavigation('prev')}>Previous</button>
                        </Col>
                        <Col sm={11}>
                            <button className='next-btn' onClick={() => handleNavigation('next')}>Next</button>
                        </Col>

                    </Row>
                </Row>
            </Container>
        </Container>
    )
}
