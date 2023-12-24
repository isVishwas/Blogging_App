import React, { useEffect, useRef, useState } from 'react'
import { Alert, Button, Card, CardBody, Col, Container, Form, FormFeedback, Input, Label, ModalBody, Row } from 'reactstrap';

import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import BreadCrumb from '../../Components/Common/BreadCrumb';

function View(props) {

    const location = useLocation();
    const { title, content, username } = location.state;


    return (

        <div className='page-content'>
            <Container fluid>
                <BreadCrumb title="View" pageTitle="Article" />
                <div className='d-flex justify-content-center'>
                    <Col lg={12}>
                        <Card>
                            {/* <img className="card-img-top img-fluid" src='' alt="Card cap" /> */}
                            <CardBody>
                                <h4 className="card-title mb-2">Title : {title} </h4>
                                <p className="card-text">Content : {content} </p>
                                <p className="card-text">Author : {username} </p>
                                <div className="text-end">
                                    <Link to="/dashboard" className="btn btn-primary">Back</Link>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </div>
            </Container>
        </div>
    )
}

export default View