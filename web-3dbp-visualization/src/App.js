import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stats } from '@react-three/drei';
import Box from './components/Box';
import TruckContainer from './components/TruckContainer';
import Axis from './components/Axis';
import solsFiltered1 from './28bestSolsFiltered.json';
import statsData from './28bestStatsFiltered.json';
import FloatingPanel from './components/FloatingPanel';
import CamControllerPanel from './components/CamControllerPanel';
import StatisticsPanel from './components/StatisticsPanel';
import SolutionController from './components/SolutionController';
import { useEffect, useState, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'antd';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  // State managing the box in the second canvas.
  const [selectedItem, setSelectedItem] = useState({
    item: [],
    color: "",
    id: ""
  })

  // State for the truck (TODO, get the truck from the API)
  const [truck, setTruck] = useState({
    height: 2.45,
    width: 2.45,
    length: 13.6
  })

  // State for the packing method.
  // 0 by default, 1 step by step.
  const [packingMethod, setPackingMethod] = useState({
    type: 0,
  })

  const [counterForPacking, setCounterForPacking] = useState({
    counter: 0,
  })

  const [placedItems, setPlacedItems] = useState({
    bestFilteredVolume: solsFiltered1.volume[0].placed
  })

  const [stats, setStats] = useState({
    bestUnfilteredStatsVolume: statsData.volume[0]
  })

  // Pallete of colours.
  const [itemsColors, setColors] = useState({
    colors: ['#99FF33', '#CC66FF',
      '#660000', '#663333', '#666600',
      '#6699FF', '#FFFF66', '#CCFFFF',
      '#CC9999', '#CC3366']
  })

  // Change camera.
  // 0 is the default. 1 is right side. 2 is left side. 3 is rear. 4 is top. 5 is bottom.
  const [cameraState, setCameraState] = useState({
    type: 0,
    position: [8, 3, 10],
    fov: 50,
    lookAtX: "",
    lookAtY: "",
    lookAtZ: "",
  })

  // Updates render of the second canvas after a box has been selected.
  useEffect(() => {
    console.log(stats)
  }, [selectedItem])


  // On the fly function component for custom views predefined by buttons.
  function CustomCamera(props) {
    const ref = useRef()
    const set = useThree(state => state.set)
    const size = useThree(({ size }) => size)
    useEffect(() => {
      ref.current.aspect = size.width / size.height
      ref.current.lookAt(cameraState.lookAtX, cameraState.lookAtY, cameraState.lookAtZ)
      ref.current.updateProjectionMatrix()
      ref.current.updateMatrixWorld()
      void set({ camera: ref.current })
    }, [])
    return <perspectiveCamera ref={ref} {...props} />
  }

  // Select the box in the secondary panel.
  const handleBoxSelection = (item, i, color) => {
    setSelectedItem({ item: item, color: color, id: i })
  }

  return (
    < Container fluid >
      <Row noGutters style={{ height: '70vh' }}>
        <Col sm={10} style={{ border: '2px solid black', borderRadius: 8 }}>
          <Canvas
            raycaster={{ linePrecision: 0.1 }}
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(176,190,197,1) 130%)',
              borderRadius: 8,
            }}>
            {cameraState.type !== 0 ? <CustomCamera position={cameraState.position}
              fov={cameraState.fov} /> :
              <PerspectiveCamera makeDefault position={cameraState.position}>
                <OrbitControls maxDistance={20} />
              </PerspectiveCamera>}
            <Stats />
            <ambientLight position={[10, 10, 10]} intensity={1.2} />
            <Axis dimensions={[truck.width, truck.height, truck.length]} />
            <TruckContainer dimensions={[truck.width, truck.height, truck.length]} />
            {placedItems.bestFilteredVolume.map((item, i) => {
              return (
                <Box
                  key={i}
                  item={item}
                  handleID={(item) => { handleBoxSelection(item, i, itemsColors.colors[item.dst_code]) }}
                  color={itemsColors.colors[item.dst_code]} />)
            })}
          </Canvas>
        </Col>
        <Col sm={2} >
          <FloatingPanel selectedItem={selectedItem} color={selectedItem.color} />
        </Col>
      </Row>
      <Row noGutters style={{ height: '30vh' }}>
        <Col sm={8} style={{ border: '2px solid black', borderRadius: 8, background: '#D1F2EB' }}>
          <StatisticsPanel data={stats.bestUnfilteredStatsVolume} itemsPacked={placedItems.bestFilteredVolume} />
        </Col>
        <Col sm={2} style={{ border: '2px solid black', borderRadius: 8, background: '#FFFDE7' }}>
          <SolutionController
            method={packingMethod.type}
            counter={counterForPacking.counter}
            updateCounter={(updatedCounter) => { if (updatedCounter !== 0) { setCounterForPacking(updatedCounter) } }} />
        </Col>
        <Col sm={2} style={{ border: '2px solid black', borderRadius: 8, background: '#E1F5FE' }}>
          <CamControllerPanel changeCamera={(Type,
            Position, Fov, lookAtX, lookAtY, lookAtZ) =>
            setCameraState({
              ...cameraState, type: Type, position: Position,
              fov: Fov, lookAtX: lookAtX, lookAtY: lookAtY,
              lookAtZ: lookAtZ
            })
          }
          />
          <Container fluid>
            <Row style={{ display: 'flex', justifyContent: 'center', paddingTop: 4 }}>
              <p class="font-weight-bold"><u>Pack panel</u></p>
            </Row>
            <Row style={{ display: 'flex', justifyContent: 'center' }}>
              <Button style={{ marginRight: '5px' }} type="primary"> Next Item</Button>
              <Button type="primary"> Previous Item</Button>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container >
  );
}

export default App;
