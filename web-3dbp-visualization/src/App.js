import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stats } from '@react-three/drei';
import Box from './components/Box';
import TruckContainer from './components/TruckContainer';
import Axis from './components/Axis';
import solsFiltered from './resultsNew/17005625bestSolsUnfiltered.json';
import statsData from './resultsNew/17005625bestStatsUnfiltered.json';
import FloatingPanel from './components/FloatingPanel';
import CamControllerPanel from './components/CamControllerPanel';
import StatisticsPanel from './components/StatisticsPanel';
import SolutionController from './components/SolutionController';
import { useEffect, useState, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { selectItem, changePackingMethod, changeCounter } from './redux/actions';

function App() {
  const dispatch = useDispatch();

  // State managing the box in the second canvas.
  const selectedItem = useSelector(state => state.selectedItem)

  // State for the truck (TODO, get the truck from the API)
  const [truck, setTruck] = useState({
    height: 2.45,
    width: 2.45,
    length: 13.6
  })

  // State for the packing method.
  // 0 by default, 1 step by step.
  const packingMethod = useSelector(state => state.packingMethod)

  const counterForPacking = useSelector(state => state.counterForPacking)

  const [placedItems, setPlacedItems] = useState({
    bestFilteredVolume: solsFiltered.volume[0].placed
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
            {packingMethod === 0 ? placedItems.bestFilteredVolume.map((item, i) => {
              return (
                <Box
                  key={i}
                  item={item}
                  method={packingMethod}
                  handleID={(item) => { dispatch(selectItem(item, itemsColors.colors[item.dstCode])) }}
                  color={itemsColors.colors[item.dstCode]} />)
            }) : placedItems.bestFilteredVolume.sort((a, b) => a.id_or - b.id_or).slice(0, counterForPacking).map((item, i) => {
              return (
                <Box
                  key={i}
                  item={item}
                  method={packingMethod}
                  handleID={(item) => { dispatch(selectItem(item, itemsColors.colors[item.dstCode])) }}
                  color={itemsColors.colors[item.dstCode]} />)
            })}
          </Canvas>
        </Col>
        <Col sm={2} >
          <FloatingPanel selectedItem={selectedItem}
          />
        </Col>
      </Row>
      <Row noGutters style={{ height: '30vh' }}>
        <Col sm={8} style={{ border: '2px solid black', borderRadius: 8, background: '#D1F2EB' }}>
          <StatisticsPanel data={stats.bestUnfilteredStatsVolume} itemsPacked={placedItems.bestFilteredVolume} />
        </Col>
        <Col sm={2} style={{ border: '2px solid black', borderRadius: 8, background: '#FFFDE7' }}>
          <SolutionController
            method={packingMethod}
            updatePacking={(x) => { if (x !== packingMethod) { dispatch(changePackingMethod(x)) } }}
          />
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
              <Button style={{ marginRight: '5px' }} type="primary" onClick={() => { if (counterForPacking < placedItems.bestFilteredVolume.length - 2 && packingMethod === 1) { console.log("hols"); dispatch(changeCounter(counterForPacking + 1)) } }}> Next Item</Button>
              <Button type="primary" onClick={() => { if (counterForPacking > 0 && packingMethod === 1) { dispatch(changeCounter(counterForPacking - 1)) } }}> Previous Item</Button>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container >
  );
}

export default App;
