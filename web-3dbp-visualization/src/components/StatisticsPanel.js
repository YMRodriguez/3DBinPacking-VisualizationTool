import { Progress } from 'antd';
import { useState, useEffect } from 'react';
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
        t_volume: props.data.p_total_volume.toFixed(2),
    })

    useEffect(() => { // <-- Add this useEffect hook
        setData({
            usedVol: (props.data.used_volume * 100).toFixed(2),
            usedWei: (props.data.used_weight * 100).toFixed(2),
            pTax: props.data.p_total_taxability.toFixed(2),
            items_p: props.data.n_placed,
            items_d: props.data.n_discard,
            t_weight: props.data.p_total_weight.toFixed(2),
            t_volume: props.data.p_total_volume.toFixed(2),
        });
    }, [props.data]);

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
            <Row className='header-row'>
                <Col xs={12} className="header-col">
                    <b>Metrics</b>
                </Col>
            </Row>
            <Row>
                <Col md={4} className="stats-header">

                    <Row className="stats-progress-row">
                        <Progress type="circle" percent={data.usedVol} size={105}
                            strokeColor={{
                                '0%': '#CC0000',
                                '100%': '#66CC00',
                            }} />
                        <h4 className="bold-title">Used Volume</h4>
                    </Row>

                    <Row className="stats-progress-row stats-progress-row-top">
                        <Progress type="circle" percent={data.usedWei} size={105}
                            strokeColor={{
                                '0%': '#108ee9',
                                '100%': '#87d068',
                            }} />
                        <h4 className="bold-title">Used Weight</h4>
                    </Row>
                </Col>
                <Col md={8} style={{ paddingTop: 20 }}>
                    <table className="info-table">
                        <tbody>
                            <tr>
                                <td className="label-cell"><em>Items packed:</em></td>
                                <td className="value-cell">{data.items_p}</td>
                            </tr>
                            <tr>
                                <td className="label-cell"><em>Items discarded:</em></td>
                                <td className="value-cell">{data.items_d}</td>
                            </tr>
                            <tr>
                                <td className="label-cell"><em>Total weight (Kg):</em></td>
                                <td className="value-cell">{data.t_weight}</td>
                            </tr>
                            <tr>
                                <td className="label-cell"><em>Total volume (m3):</em></td>
                                <td className="value-cell">{data.t_volume}</td>
                            </tr>
                        </tbody>
                    </table>
                </Col>
            </Row>
        </Container>
    )
}