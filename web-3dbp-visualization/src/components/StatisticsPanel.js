import { Progress } from 'antd';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Chart, ArcElement } from 'chart.js';
import '../css/StatisticsPanel.css';

Chart.register(ArcElement);

export default function StatisticsPanel(props) {
    const [data, setData] = useState({
        usedVol: (props.data.used_volume * 100).toFixed(2),
        usedWei: (props.data.used_weight * 100).toFixed(2),
        pTax: props.data.p_total_taxability.toFixed(2),
        items_p: props.data.n_placed,
        items_d: props.data.n_discard,
        t_weight: props.data.p_total_weight.toFixed(2),
    })

    function processPacked(packed) {
        let dstArr = packed.map(item => item.dstCode)
        const counts = dstArr.reduce((acc, value) => ({
            ...acc,
            [value]: (acc[value] || 0) + 1
        }), {});
        return counts
    }

    return (
        <Container fluid>
            <Col>
                <Row>
                    <Col md={4} className="stats-header">
                        <Row className='header-row'>
                            <Col xs={12} className="header-col">
                                <b>Metrics</b>
                            </Col>
                        </Row>
                        <Row className="stats-progress-row">
                            <Progress type="circle" percent={data.usedVol} width={105}
                                strokeColor={{
                                    '0%': '#CC0000',
                                    '100%': '#66CC00',
                                }} />
                            <h4 className="bold-title">Used Volume</h4>
                        </Row>
                        <Row className="stats-progress-row stats-progress-row-top">
                            <Progress type="circle" percent={data.usedWei} width={105}
                                strokeColor={{
                                    '0%': '#108ee9',
                                    '100%': '#87d068',
                                }} />
                            <h4 className="bold-title">Used Weight</h4>
                        </Row>
                    </Col>
                    <Col md={4} style={{ paddingTop: 20 }}>
                        <Row className="border-box">
                            <h4 className="center-text"><em>Items packed: {data.items_p}</em></h4>
                        </Row>
                        <Row className="border-box">
                            <h4><em>Items discarded: {data.items_d}</em></h4>
                        </Row>
                        <Row className="border-box">
                            <h4><em>Total taxability: {data.pTax}</em></h4>
                        </Row>
                        <Row className="border-box">
                            <h4><em>Total weight: {data.t_weight}</em></h4>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Container>
    )
}