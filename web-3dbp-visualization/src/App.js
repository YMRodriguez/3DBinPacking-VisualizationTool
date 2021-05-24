import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stats } from '@react-three/drei';
import Box from './components/Box';
import TruckContainer from './components/TruckContainer';
import Axis from './components/Axis';
import solsFiltered1 from './3bestSolsFiltered.json';
import FloatingPanel from './components/FloatingPanel';
import CamControllerPanel from './components/CamControllerPanel';
import StatisticsPanel from './components/StatisticsPanel';
import { useEffect, useState, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const [selectedItem, setSelectedItem] = useState({
    item: [],
    color: "",
    id: ""
  })

  // State for the truck
  const [truck, setTruck] = useState({
    height: 2.45,
    width: 2.45,
    length: 13.6
  })

  const [placedItems, setPlacedItems] = useState({
    bestFilteredVolume: solsFiltered1.volume[1].placed,
    //bestFilteredPrio: solsFiltered1.priority[0].placed,
    //bestFilteredWeight: solsFiltered1.weight[0].placed,
    //bestFilteredTax: solsFiltered1.taxability[0].placed,
    //bestUnfilteredVolume: solsUnFiltered7.volume[0].placed,
    //bestFilteredPrio: solsFiltered7.priority[0].placed,
    //bestUnfilteredWeight: solsUnFiltered1.weight[0].placed,
    //bestUnfilteredTax: solsUnFiltered1.taxability[0].placed
  })

  const [itemsColors, setColors] = useState({
    colors: ['#CC66FF',
      '#660000', '#663333', '#666600',
      '#6699FF', '#99FF33', '#CCFFFF',
      '#FFFF66', '#CC3366', '#CC9999']
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

  // To update render of the second canvas after a box has been selected.
  useEffect(() => {
  }, [selectedItem])

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

  // Panel selection( future implementation)
  const handleBoxSelection = (item, i, color) => {
    setSelectedItem({ item: item, color: color, id: i })
  }

  return (
    <Container fluid>
      <Row noGutters style={{ height: '70vh' }}>
        <Col sm={10} style={{ border: '2px solid black', borderRadius: 8 }}>
          <Canvas
            raycaster={{ linePrecision: 0.01 }}
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(235,235,235,1) 55%, rgba(153,153,153,1) 110%)',
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
        <Col sm={8} style={{ border: '2px solid black', borderRadius: 8 }}>
          <StatisticsPanel />
        </Col>
        <Col sm={2} style={{ border: '2px solid black', borderRadius: 8 }}>

        </Col>
        <Col sm={2} style={{ border: '2px solid black', borderRadius: 8 }}>
          <CamControllerPanel changeCamera={(Type,
            Position,
            Fov,
            lookAtX,
            lookAtY,
            lookAtZ) =>
            setCameraState({
              ...cameraState,
              type: Type,
              position: Position,
              fov: Fov,
              lookAtX: lookAtX,
              lookAtY: lookAtY,
              lookAtZ: lookAtZ
            })
          }
          />
        </Col>
      </Row>
    </Container >
  );
}

export default App;
