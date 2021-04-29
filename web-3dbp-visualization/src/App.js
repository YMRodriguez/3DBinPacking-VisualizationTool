import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stats } from '@react-three/drei';
import Box from './components/Box';
import TruckContainer from './components/TruckContainer';
import Axis from './components/Axis';
import placed from './placedpackets.json';
import { useEffect, useState } from 'react';
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

  const [placedItems, setPlacedItems] = useState({
    items: placed
  })

  const [itemsColors, setColors] = useState({
    colors: []
  })

  const [cameraPostion, setCameraPostion] = useState({
    position: [10, 8, 18]
  })

  // Only if placedItems change while re-rendering update colors.
  useEffect(() => {
    // Random color generator, one for each destination.
    function generateDstColorPalette(items) {
      var colors = []
      // Get the amount of dst codes.
      var length = Math.max(...items.map((item, i) => {
        return item.dst_code
      })) + 1
      for (let i = 0; i < length; i++) {
        var color = generateRandomColor()
        while (colors.includes(color)) {
          color = generateRandomColor();
        }
        colors.push(color)
      }
      return colors
    }

    function generateRandomColor() {
      return '#' + (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6);
    }
    setColors({ colors: generateDstColorPalette(placedItems.items) })
  }, [placedItems])



  // Panel selection( future implementation)
  function handleIDSelection(active, i) {
    console.log(activeBox)
    setActiveBox({ active: active, id: i })
  }

  return (
    <Container fluid >
      <Row md={10} style={{ height: '100vh' }}>
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
          {placedItems.items.map((item, i) => {
            return (
              <Box
                key={i}
                item={item}
                handleID={(active, id) => { }}
                color={itemsColors.colors[item.dst_code]} />)
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
    </Container >
  );
}

export default App;
