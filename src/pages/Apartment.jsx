import React from "react";
import "../assets/Projects/css/apartment.css"; // Add custom styles
import { Row, Col, Button } from "react-bootstrap";
import amenitiesPic from '../assets/Projects/images/amenitiesPic.jpg';
const Apartment = () => {
    return (
        <div className="explore-apartments">
            <img src={amenitiesPic} alt="sdfajh" className="apartments-image" />
            <Row className="justify-content-center text-center apartment-text-container">
                <Col md={8}>
                    <h1 className="title text-white">Explore Apartments</h1>
                    <div className="btn-group-container">
                        <Button variant="light" className="bhk-btn">
                            1 BHK
                        </Button>
                        <Button variant="light" className="bhk-btn">
                            2 BHK
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Apartment;