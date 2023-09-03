import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/UploadControls.css';
import Modal from 'react-modal';


export default function UploadControls({ truck, handleInputChange, onNewData }) {
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleRunPacking = () => {
        if (!file) {
            alert("Please upload a CSV file.");
            return;
        }
        setIsLoading(true);

        // Read the JSON file
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                let packets = JSON.parse(event.target.result);

                let dataToSend = {
                    packets,
                    truck
                };

                // Send the data to the backend
                fetch("http://127.0.0.1:5000/run-optimizer", {
                    method: "POST",
                    mode: 'cors',
                    credentials: 'same-origin',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dataToSend)
                }).then(response => response.json())
                    .then(data => {
                        setIsLoading(false);
                        console.log(data);
                        if (!data.solutions.length) {
                            alert("No solution found that satisfies your constraints. Please try again. In the meantime, we have loaded a solution that would fit without satisfying the constraints");
                            onNewData(data.solutionsUnfiltered[0].placed, data.statsUnfiltered[0]);
                        } else {
                            onNewData(data.solutions[0].placed, data.stats[0]);
                        }
                    })
                    .catch(error => {
                        setIsLoading(false);
                        console.error(error);
                        alert("There was an error processing your request.");
                    });
            } catch (e) {
                setIsLoading(false);
                alert("Invalid JSON file format. Please check the file and try again.");
            }
        };
        reader.readAsText(file);
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
                <Col xs={10} className='centered-col-content'>
                    <label htmlFor="file-upload" className="antd-like-button">
                        Upload Packages JSON
                    </label>
                    <input id="file-upload" type="file" accept=".json" className="file-input" onChange={handleFileChange} />
                </Col>
            </Row>

            {/* Run Packing */}
            <Row className="button-row">
                <Col xs={8} className='centered-col-content'>
                    <button className={`antd-like-button ${file ? "file-uploaded" : ""}`} onClick={handleRunPacking}> Run packing</button>
                </Col>
            </Row>

            <Modal
                isOpen={isLoading}
                contentLabel="Loading Modal"
                ariaHideApp={false}
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <div className="loading-icon"></div>
                <p>Loading... Please wait until we process your solution. It can take up to 3 minutes.</p>
                <p>If everything goes well the results will be displayed. You will be able to submit a new file after that.</p>
            </Modal>
        </Container>
    );
}
