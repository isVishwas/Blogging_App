import React, { useEffect, useState } from 'react';

import Navbar from './navbar';
import Footer from './footer';
import { useDispatch, useSelector } from 'react-redux';
import DeleteModal from '../../Components/Common/DeleteModal';
import { ToastContainer } from 'react-toastify';
import { Card, CardBody, Col, Container, Input, Row } from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import Loader from '../../Components/Common/Loader';

//import action
import {
    getAllUserData as onGetAllUserData,
} from "../../slices/users/thunk";
import { isEmpty } from 'lodash';
import { Link, useLocation } from 'react-router-dom';


const Index = () => {
    document.title = "View Article";
    const location = useLocation();
    const { title, content, username } = location.state;

    return (
        <React.Fragment>
        <div className="layout-wrapper landing">
            <Navbar />

            <React.Fragment>
            <div className='page-content'>
            <Container fluid>
                <BreadCrumb title="View" pageTitle="Home" />
                <div className='d-flex justify-content-center'>
                    <Col lg={12}>
                        <Card>
                            {/* <img className="card-img-top img-fluid" src='' alt="Card cap" /> */}
                            <CardBody>
                                <h4 className="card-title mb-2">Title : {title} </h4>
                                <p className="card-text">Content : {content} </p>
                                <p className="card-text">Author : {username} </p>
                                <div className="text-end">
                                    <Link to="/" className="btn btn-primary">Back</Link>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </div>
            </Container>
        </div>
    </React.Fragment>

            
            <Footer />
            <button onClick={() => toTop()} className="btn btn-danger btn-icon landing-back-top" id="back-to-top">
                <i className="ri-arrow-up-line"></i>
            </button>
        </div>
    </React.Fragment>
    );
};

export default Index;