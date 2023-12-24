import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardBody, Col, Container, Row, FormFeedback, Input, Button, Label, Form } from 'reactstrap';
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";

//import images 
import logoDark from "../../assets/images/Logo_Black.png";

//formik
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { signup_user, resetLoginFlag } from "../../slices/thunks";
import Navbar from '../Home/navbar';

const BasicSignUp = () => {

    document.title = "Register New User!";
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [passwordShow, setPasswordShow] = useState(false);

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            username: 'tanuj',
            email: 'tanuj@mail.com',
            password: '12345',
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Please enter your email"),
            email: Yup.string().required("Please enter your email"),
            password: Yup.string().required("Please enter your password"),
        }),
        onSubmit: (values) => {
            dispatch(signup_user(values, navigate));
        }
    });

    const { error, errorFlag, loading } = useSelector(state => ({
        error: state.Loggedin.error,
        loading: state.Loggedin.loading,
        errorFlag: state.Loggedin.errorFlag,
    }));

    useEffect(() => {
        if (errorFlag) {
            setTimeout(() => {
                dispatch(resetLoginFlag());
            }, 3000);
        }
    }, [dispatch, errorFlag]);

    return (
        <React.Fragment>
            <Navbar />
            <ParticlesAuth>
                <div className="auth-page-content">

                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center mt-sm-5 mb-4 text-white-50">
                                    {/* <div>
                                        <Link to="/" className="d-inline-block auth-logo">
                                            <img src={logoDark} alt="" height="100" />
                                        </Link>
                                    </div> */}
                                    {/* <p className="mt-3 fs-15 fw-medium">Premium Admin & Dashboard Template</p> */}
                                </div>
                            </Col>
                        </Row>

                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="mt-4">

                                    <CardBody className="p-4">
                                        <div className="text-center mt-2">
                                            <h5 className="text-primary">Create New Account</h5>
                                            {/* <p className="text-muted">Get your free velzon account now</p> */}
                                        </div>
                                        <div className="p-2 mt-4">
                                            <Form 
                                             onSubmit={(e) => {
                                                e.preventDefault();
                                                validation.handleSubmit();
                                                return false;
                                            }}
                                            className="needs-validation" action="#">

                                            <div className="mb-3">
                                                    <Label htmlFor="username" className="form-label">Username*</Label>
                                                    <Input
                                                        name="username"
                                                        className="form-control"
                                                        placeholder="Enter username"
                                                        type="username"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.username || ""}
                                                        invalid={
                                                            validation.touched.username && validation.errors.username ? true : false
                                                        }
                                                    />
                                                    {validation.touched.username && validation.errors.username ? (
                                                        <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
                                                    ) : null}
                                                </div>

                                            <div className="mb-3">
                                                    <Label htmlFor="email" className="form-label">Email*</Label>
                                                    <Input
                                                        name="email"
                                                        className="form-control"
                                                        placeholder="Enter Email"
                                                        type="email"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.email || ""}
                                                        invalid={
                                                            validation.touched.email && validation.errors.email ? true : false
                                                        }
                                                    />
                                                    {validation.touched.email && validation.errors.email ? (
                                                        <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                                                    ) : null}
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="password-input">Password</label>
                                                    <div className="position-relative auth-pass-inputgroup">
                                                        <Input
                                                            type={passwordShow ? "text" : "password"}
                                                            className="form-control pe-5 password-input"
                                                            placeholder="Enter password"
                                                            id="password-input"
                                                            name="password"
                                                            value={validation.values.password}
                                                            onBlur={validation.handleBlur}
                                                            onChange={validation.handleChange}
                                                            invalid={validation.errors.password && validation.touched.password ? true : false}
                                                        />
                                                        {validation.errors.password && validation.touched.password ? (
                                                            <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                                                        ) : null}
                                                        <Button color="link" onClick={() => setPasswordShow(!passwordShow)} className="position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button"
                                                            id="password-addon"><i className="ri-eye-fill align-middle"></i></Button>
                                                    </div>
                                                </div>

                                                {/* <div className="mb-4">
                                                    <p className="mb-0 fs-12 text-muted fst-italic">By registering you agree to the Velzon
                                                        <Link to="#" className="text-primary text-decoration-underline fst-normal fw-medium">Terms of Use</Link></p>
                                                </div> */}

                                                <div id="password-contain" className="p-3 bg-light mb-2 rounded">
                                                    <h5 className="fs-13">Password must contain:</h5>
                                                    <p id="pass-length" className="invalid fs-12 mb-2">Minimum <b>8 characters</b></p>
                                                    <p id="pass-lower" className="invalid fs-12 mb-2">At <b>lowercase</b> letter (a-z)</p>
                                                    <p id="pass-upper" className="invalid fs-12 mb-2">At least <b>uppercase</b> letter (A-Z)</p>
                                                    <p id="pass-number" className="invalid fs-12 mb-0">A least <b>number</b> (0-9)</p>
                                                </div>

                                                <div className="mt-4">
                                                    <button className="btn btn-danger w-100" type="submit">Sign Up</button>
                                                </div>
                                            </Form>
                                        </div>
                                    </CardBody>
                                </Card>

                                <div className="mt-4 text-center">
                                    <p className="mb-0">Already have an account ? <Link to="/login" className="fw-semibold text-primary text-decoration-underline"> Signin </Link> </p>
                                </div>

                            </Col>
                        </Row>
                    </Container>
                </div>
            </ParticlesAuth>
        </React.Fragment>
    );
};

export default BasicSignUp;