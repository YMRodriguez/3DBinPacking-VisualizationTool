import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stats } from '@react-three/drei';
import Box from './components/Box';
import TruckContainer from './components/TruckContainer';
import Axis from './components/Axis';
import solsFiltered1 from './3bestSolsFiltered.json';
import FloatingPanel from './components/FloatingPanel';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"

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
    setColors({ colors: generateDstColorPalette(placedItems.bestFilteredVolume) })
  }, [placedItems])

  // To update render of the second canvas after a box has been selected.
  useEffect(() => {

  }, [selectedItem])

  // Panel selection( future implementation)
  function handleBoxSelection(item, i, color) {
    setSelectedItem({ item: item, color: color, id: i })
  }

  return (
    <Container fluid>
      <Row noGutters style={{ height: '70vh' }}>
        <Col sm={10}>
          <Canvas style={{
            background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(153,153,153,1) 100%)',
            borderRadius: 8,
          }}>
            <PerspectiveCamera
              makeDefault
              position={[6, 4, 17]}
            >
            </PerspectiveCamera>
            <Stats />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <ambientLight position={[10, 10, 10]} intensity={0.5} />
            <Axis dimensions={[truck.width, truck.height, truck.length]} />
            <TruckContainer dimensions={[truck.width, truck.height, truck.length]} />
            {placedItems.bestFilteredVolume.map((item, i) => {
              return (
                <Box
                  key={i}
                  item={item}
                  handleID={(item) => { console.log(item); handleBoxSelection(item, i, itemsColors.colors[item.dst_code]) }}
                  color={itemsColors.colors[item.dst_code]} />)
            })}
            <OrbitControls screenSpacePanning maxDistance={20} />
          </Canvas>
        </Col>
        <Col sm={2}>
          {console.log(selectedItem)}
          <FloatingPanel selectedItem={selectedItem} />
        </Col>
      </Row>
      <Row noGutters style={{ height: '30vh' }}>
      </Row>
    </Container >
  );
}

export default App;
