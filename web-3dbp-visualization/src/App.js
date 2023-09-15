import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stats } from '@react-three/drei';
import Box from './components/Box';
import TruckContainer from './components/TruckContainer';
import Axis from './components/Axis';
import defaultSolution from './defaultResult/defaultSolution.json';
import defaultStats from './defaultResult/defaultStats.json';
import FloatingPanel from './components/FloatingPanel';
import CamControllerPanel from './components/CamControllerPanel';
import StatisticsPanel from './components/StatisticsPanel';
import SolutionController from './components/SolutionController';
import { useEffect, useState, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector, useDispatch } from "react-redux";
import "./css/App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { selectItem, changePackingMethod } from './redux/actions';
import UploadControls from './components/UploadControls';

function App() {
  const dispatch = useDispatch();

  // State managing the box in the second canvas.
  const selectedItem = useSelector(state => state.selectedItem)

  // State for the truck (TODO, get the truck from the API)
  const [truck, setTruck] = useState({
    _id: "container1",
    name: "container",
    length: 13.6,
    width: 2.45,
    height: 2.45,
    volume: 13.6 * 2.45 * 2.45,
    tonnage: 22000,
    n_wagon: 1,
    refrigeration: 0
  });

  // State for the packing method.
  // 0 by default, 1 step by step.
  const packingMethod = useSelector(state => state.packingMethod)

  const counterForPacking = useSelector(state => state.counterForPacking)

  const [placedItems, setPlacedItems] = useState({
    placedItems: defaultSolution.volume[0].placed
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTruck(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  const [stats, setStats] = useState({
    stats: defaultStats[0]
  })

  // Pallete of colours.
  const [itemsColors, setColors] = useState({
    colors: ['#99FF33', '#CC66FF', , '#FFFF66', '#CCFFFF',
      '#CC9999', '#CC3366',
      '#660000', '#663333', '#666600',
      '#6699FF']
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

  function loadDefaultResults() {
    setPlacedItems({
      placedItems: defaultSolution.volume[0].placed
    });
    setStats({
      stats: defaultStats[0]
    });
  }

  function handleNewData(newPlacedItems, newStats) {
    setPlacedItems({
      placedItems: newPlacedItems
    });
    setStats({
      stats: newStats
    });
  }


  return (
    < Container fluid >
      <Row noGutters className="upper-row">
        <Col sm={10} className="canvas-col">
          <Canvas raycaster={{ linePrecision: 0.1 }}>
            {cameraState.type !== 0 ? <CustomCamera position={cameraState.position}
              fov={cameraState.fov} /> :
              <PerspectiveCamera makeDefault position={cameraState.position}>
                <OrbitControls maxDistance={20} />
              </PerspectiveCamera>}
            <Stats />
            <ambientLight position={[10, 10, 10]} intensity={1.2} />
            <Axis dimensions={[truck.width, truck.height, truck.length]} />
            <TruckContainer dimensions={[truck.width, truck.height, truck.length]} />
            {packingMethod === 0 ? placedItems.placedItems.map((item, i) => {
              return (
                <Box
                  key={i}
                  item={item}
                  method={packingMethod}
                  handleID={(item) => { dispatch(selectItem(item, itemsColors.colors[item.dstCode])) }}
                  color={itemsColors.colors[item.dstCode]} />)
            }) : placedItems.placedItems.sort((a, b) => a.id_or - b.id_or).slice(0, counterForPacking).map((item, i) => {
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
        <Col xs={2} >
          <FloatingPanel selectedItem={selectedItem}
          />
        </Col>
      </Row>
      <Row noGutters className="lower-row">
        <Col sm={5} className="statistics-col col">
          <StatisticsPanel data={stats.stats} itemsPacked={placedItems.placedItems} />
        </Col>
        <Col sm={3} className="uploads-col col">
          <UploadControls truck={truck} handleInputChange={handleInputChange} onNewData={handleNewData} />
        </Col>
        <Col sm={1.8} className="solution-col col">
          <SolutionController
            method={packingMethod}
            updatePacking={(x) => { if (x !== packingMethod) { dispatch(changePackingMethod(x)) } }}
            counterForPacking={counterForPacking}
            dispatch={dispatch}
            placedItems={placedItems}
          />
        </Col>
        <Col sm={2} className="cam-controller-col col">
          <CamControllerPanel changeCamera={(Type,
            Position, Fov, lookAtX, lookAtY, lookAtZ) =>
            setCameraState({
              ...cameraState, type: Type, position: Position,
              fov: Fov, lookAtX: lookAtX, lookAtY: lookAtY,
              lookAtZ: lookAtZ
            })
          }
            loadDefaultResults={loadDefaultResults}
          />
        </Col>
      </Row>
    </Container >
  );
}

export default App;
