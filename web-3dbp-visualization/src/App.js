import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stats } from '@react-three/drei';
import Box from './components/Box';
import TruckContainer from './components/TruckContainer';
import Axis from './components/Axis';
import placed from './placedpackets.json';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"

function App() {
  // State for Floating Box Panel.
  const [activeBox, setActiveBox] = useState({
    active: false,
    id: null
  })

  // State for the truck
  const [truck, setTruck] = useState({
    height: 2.45,
    width: 2.45,
    length: 13.6
  })

  const placedItems = placed

  // Random color generator
  function generateRandomColor() {
    var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
  }
  // Panel selection( future implementation)
  function handleIDSelection(active, i) {
    console.log(activeBox)
    setActiveBox({ active: active, id: i })
  }

  return (
    <Container fluid >
      <Row md={10} style={{ height: '70vh' }}>
        <Canvas style={{
          background: 'gray'
        }}>
          <PerspectiveCamera
            makeDefault
            position={[10, 8, 18]}
          >
          </PerspectiveCamera>
          <Stats />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <ambientLight position={[10, 10, 10]} intensity={0.5} />
          <Axis dimensions={[truck.width, truck.height, truck.length]} />
          <TruckContainer dimensions={[truck.width, truck.height, truck.length]} />
          {placedItems.map((item, i) => {
            return (
              <Box
                key={i}
                position={item.mass_center}
                handleID={(active, id) => { }}
                dimensions={[item.width, item.height, item.length]}
                color={generateRandomColor()}
                idp={item.in_id} weight={item.weight} />)
          })}
          <OrbitControls screenSpacePanning maxDistance={30} />
        </Canvas>
      </Row>
      <Row >
        <Col>
          <button>Full Instant View</button>
        </Col>
        <Col>
          <button>Hola</button>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
