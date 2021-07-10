import { Progress } from 'antd';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Pie } from 'react-chartjs-2';

export default function StatisticsPanel(props) {
    const [data, setData] = useState({
        usedVol: (props.data.used_volume * 100).toFixed(2),
        usedWei: (props.data.used_weight * 100).toFixed(2),
        pTax: props.data.p_total_taxability.toFixed(2),
        items_p: props.data.n_placed,
        items_d: props.data.n_discard,
        t_weight: props.data.p_total_weight.toFixed(2),
    })

    const [pieData, setPieData] = useState({
        data: createPieData(props.itemsPacked)
    })

    function createPieData(packed) {
        let p = processPacked(packed)
        console.log(Object.keys(p), Object.values(p))
        const data = {
            labels: Object.keys(p),
            datasets: [
                {
                    label: "misco",
                    data: Object.values(p),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                }]
        }
        return data
    }

    function processPacked(packed) {
        let dstArr = packed.map(item => item.dst_code)
        const counts = dstArr.reduce((acc, value) => ({
            ...acc,
            [value]: (acc[value] || 0) + 1
        }), {});
        return counts
    }

    return (
        <Container fluid>
            <Col>
                <Row >
                    <Col md={4} style={{ marginLeft: 30 }}>
                        <Row style={{ display: 'flex', justifyContent: 'center' }}><p class="font-weight-bold"><u>STATS</u></p></Row>
                        <Row style={{ padding: 7 }}>
                            <Progress type="circle" percent={data.usedVol} width={105}
                                strokeColor={{
                                    '0%': '#CC0000',
                                    '100%': '#66CC00',
                                }} />
                            <h4 class="font-weight-bold">Used Volume</h4>
                        </Row>
                        <Row style={{ padding: 7, paddingTop: 10 }}>
                            <Progress type="circle" percent={data.usedWei} width={105}
                                strokeColor={{
                                    '0%': '#108ee9',
                                    '100%': '#87d068',
                                }} />
                            <h4 class="font-weight-bold">Used Weight</h4>
                        </Row>
                    </Col>
                    <Col md={4} style={{ paddingTop: 20 }}>
                        <Row style={{ display: 'flex', padding: 3, justifyContent: 'center', border: '1px solid black', borderRadius: 8, borderStyle: 'dotted' }}>
                            <h4 style={{ alignSelf: 'center' }}><p><em>Items packed: {data.items_p}</em></p></h4>
                        </Row>
                        <Row style={{ display: 'flex', padding: 3, justifyContent: 'center', border: '1px solid black', borderRadius: 8, borderStyle: 'dotted' }}>
                            <h4><p><em>Items discarded: {data.items_d}</em></p></h4>
                        </Row>
                        <Row style={{ display: 'flex', padding: 3, justifyContent: 'center', border: '1px solid black', borderRadius: 8, borderStyle: 'dotted' }}>
                            <h4><p><em>Total taxability: {data.pTax}</em></p></h4>
                        </Row>
                        <Row style={{ display: 'flex', padding: 3, justifyContent: 'center', border: '1px solid black', borderRadius: 8, borderStyle: 'dotted' }}>
                            <h4><p><em>Total weight: {data.t_weight}</em></p></h4>
                        </Row>
                    </Col>
                    <Col md={3} style={{ marginLeft: 40 }}>
                        <Pie data={pieData.data} />
                    </Col>
                </Row>
            </Col>
        </Container>
    )
}