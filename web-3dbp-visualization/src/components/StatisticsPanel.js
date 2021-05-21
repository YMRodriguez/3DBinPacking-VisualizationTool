import { Progress } from 'antd';
import Container from 'react-bootstrap/Container';

export default function StatisticsPanel() {
    return (
        <Container>
            <Progress percent={50} />
            <Progress percent={50} />
            <Progress percent={50} />
            <Progress percent={50} />
        </Container>
    )
}