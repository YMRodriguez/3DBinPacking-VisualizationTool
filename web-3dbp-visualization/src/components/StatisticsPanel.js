import { Progress } from 'antd';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Divider } from 'antd';
import { PolarArea } from 'react-chartjs-2';

export default function StatisticsPanel(props) {
    const [data, setData] = useState({
        usedVol: (props.data.used_volume * 100).toFixed(2),
        usedWei: (props.data.used_weight * 100).toFixed(2),
        pTax: props.data.p_total_taxability
    })

    return (
        <Container fluid>
            <Col>
                <Row style={{ display: 'flex', justifyContent: 'center' }}><p class="font-weight-bold"><u>Stats</u></p></Row>
                <Row>
                    <Col styles={{}}>
                        <Row style={{ padding: 7 }}>
                            <Progress type="circle" percent={data.usedVol} width={90}
                                strokeColor={{
                                    '0%': '#CC0000',
                                    '100%': '#66CC00',
                                }} />
                            <h6>Used Volume</h6>
                        </Row>
                        <Row style={{ padding: 7, paddingTop: 10 }}>
                            <Progress type="circle" percent={data.usedWei} width={90}
                                strokeColor={{
                                    '0%': '#108ee9',
                                    '100%': '#87d068',
                                }} />
                            <h6>Used Weight</h6>
                        </Row>
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </Col>
        </Container>
    )
}