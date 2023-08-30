import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/UploadControls.css';
import Papa from 'papaparse';

export default function UploadControls(props) {
    const [file, setFile] = useState(null);
    const [truck, setTruck] = useState({
        _id: "",
        name: "",
        length: 0,
        width: 0,
        height: 0,
        volume: 0,
        tonnage: 0,
        n_wagon: 1,
        refrigeration: 0
    });

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTruck(prev => ({ ...prev, [name]: value }));
    };

    const handleRunPacking = () => {
        if (!file) {
            alert("Please upload a CSV file.");
            return;
        }

        // Parse the CSV
        Papa.parse(file, {
            complete: (result) => {
                // Transform CSV data to your JSON structure here...
                let packets = result.data.map(item => {
                    return {
                        id: item.id,
                        description: item.description,
                        length: parseFloat(item.length),
                        destination_id: item.route ? item.route.destination_id : "",
                        name: item.name,
                        width: parseFloat(item.width),
                        height: parseFloat(item.height),
                        weight: parseFloat(item.weight),
                        fragility: item.cargo_constraints ? item.cargo_constraints.breakability : "",
                        volume: parseFloat(item.width) * parseFloat(item.height) * parseFloat(item.length),
                        or: 6,
                        dstCode: item.route ? item.route.destination_id : "",
                        priority: item.cargo_constraints ? item.cargo_constraints.priority : "",
                        ADR: item.cargo_constraints ? item.cargo_constraints.adr : "",
                        feasibleOr: item.cargo_constraints ? item.cargo_constraints.feasible_orientations : [],
                        subgroupId: item.id
                    };
                });

                let dataToSend = {
                    packets,
                    truck
                };

                // Send the data to the backend
                fetch("/your-endpoint", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dataToSend)
                }).then(response => response.json())
                    .then(data => {
                        // Handle the response...
                    });
            }
        });
    };

    return (
        <Container>
            <Row className='header-row'>
                <Col xs={12} className="header-col">
                    <b>Upload container data</b>
                </Col>
            </Row>

            <Row className="input-row">
                <Col xs={2} className="label-col">
                    <label className="label-small">Length:</label>
                </Col>
                <Col xs={4}>
                    <input type="number" className="styled-input" name="length" value={truck.length} onChange={handleInputChange} />
                </Col>
                <Col xs={2} className="label-col">
                    <label className="label-small">Height:</label>
                </Col>
                <Col xs={4}>
                    <input type="number" className="styled-input" name="height" value={truck.height} onChange={handleInputChange} />
                </Col>
            </Row>

            <Row className="input-row">
                <Col xs={2} className="label-col">
                    <label className="label-small">Width:</label>
                </Col>
                <Col xs={4}>
                    <input type="number" className="styled-input" name="width" value={truck.width} onChange={handleInputChange} />
                </Col>
                <Col xs={2} className="label-col">
                    <label className="label-small">Tonnage:</label>
                </Col>
                <Col xs={4}>
                    <input type="number" className="styled-input" name="tonnage" value={truck.tonnage} onChange={handleInputChange} />
                </Col>
            </Row>

            <Row className="input-row">
                <Col xs={5} className="label-col">
                    <label className="label-small">Refrigeration (0 or 1):</label>
                </Col>
                <Col xs={7}>
                    <input type="number" className="styled-input" name="width" value={truck.refrigeration} onChange={handleInputChange} />
                </Col>
            </Row>

            {/* File Upload */}
            <Row className="button-row">
                <Col xs={12}>
                    <label htmlFor="file-upload" className="antd-like-button">
                        Upload Packages CSV
                    </label>
                    <input id="file-upload" type="file" accept=".csv" className="file-input" onChange={handleFileChange} />
                </Col>
            </Row>

            {/* Run Packing */}
            <Row className="button-row">
                <Col xs={12}>
                    <button className="antd-like-button bottom-button" onClick={handleRunPacking}> Run packing</button>
                </Col>
            </Row>
        </Container>
    );
}
