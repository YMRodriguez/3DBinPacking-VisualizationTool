import Card from 'react-bootstrap/Card';
import { Canvas } from '@react-three/fiber';
import Box from './Box';


function FloatingBoxPanel(props) {
    // Random color generator
    function generateRandomColor() {
        var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        return randomColor;
    }
    return (
        <Card>
            <Canvas style={{
                height: '50vh',
                background: 'blue'
            }}>
            </Canvas>
            <Card.body>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                </Card.Text>
            </Card.body>
        </Card>
    )
}

export default FloatingBoxPanel;