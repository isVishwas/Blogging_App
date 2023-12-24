import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

// Import Images
// import logolight from "../../assets/images/sidebar";

const Footer = () => {
    return (
        <React.Fragment>
            <footer className="custom-footer bg-dark py-5 position-relative">
                <Container>
                    <Row>
                        <Col lg={4} className="mt-4">
                            <div>
                                <div>
                                    <img src='' alt="logo light" height="17" />
                                </div>
                                <div className="mt-4">
                                    <p>Loremf sadjhieo4rue v afjelkhfhjfkfjkhfhdj</p>
                                    <p className="ff-secondary">eiordeuwdaldsajkhnflmncmd skldasdldkasdsjdc dcsakljdsdslkjdassd dsapdoijariorew aefelkjdfalk.</p>
                                </div>
                            </div>
                        </Col>

                        <Col lg={7} className="ms-lg-auto">
                            <Row>
                                <Col sm={4} className="mt-4">
                                    <h5 className="text-white mb-0">Company</h5>
                                    <div className="text-muted mt-3">
                                        <ul className="list-unstyled ff-secondary footer-list">
                                            <li>About Us</li>
                                            <li>Gallery</li>
                                            <li>Projects</li>
                                            <li>Timeline</li>
                                        </ul>
                                    </div>
                                </Col>
                                <Col sm={4} className="mt-4">
                                    <h5 className="text-white mb-0">Apps Pages</h5>
                                    <div className="text-muted mt-3">
                                        <ul className="list-unstyled ff-secondary footer-list">
                                            <li>Calendar</li>
                                            <li>Mailbox</li>
                                            <li>Chat</li>
                                            <li>Deals</li>
                                        </ul>
                                    </div>
                                </Col>
                                <Col sm={4} className="mt-4">
                                    <h5 className="text-white mb-0">Support</h5>
                                    <div className="text-muted mt-3">
                                        <ul className="list-unstyled ff-secondary footer-list">
                                            <li>FAQ</li>
                                            <li>Contact</li>
                                        </ul>
                                    </div>
                                </Col>
                            </Row>
                        </Col>

                    </Row>

                    <Row className="text-center text-sm-start align-items-center mt-5">
                        <Col sm={6}>

                            <div>
                                <p className="copy-rights mb-0">
                                    {new Date().getFullYear()} © Impresario Global
                                </p>
                            </div>
                        </Col>

                    </Row>
                </Container>
            </footer>
        </React.Fragment >
    );
};

export default Footer;