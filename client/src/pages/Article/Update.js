import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Col, Container, Form, FormFeedback, Input, Label, ModalBody, Row } from 'reactstrap';
import { resetError } from '../../slices/thunks';
import { useFormik } from 'formik';
import * as Yup from "yup";
// import dummyUser from "../../assets/images/users/user-dummy-img.jpg";

import {
    addUserData as onAddUserData,
    updateUserData as onUpdateUserData,
    sendSMS as onSendSMS,
    updateArticle as onUpdateArticleData,
} from "../../slices/users/thunk";
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import BreadCrumb from '../../Components/Common/BreadCrumb';

function Update(props) {

    document.title = "Update";
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const [errorMessage, setErrorMessage] = useState('');
    const { currentTitle, currentContent } = location.state;
    const { article, isLoading, error } = useSelector((state) => state.Article);

    useEffect(() => {
        setErrorMessage(error);
        if (error) {
            setTimeout(() => {
                dispatch(resetError());
                setErrorMessage('');
            }, 3000);
        }
    }, [dispatch, error]);


    const [image, setImage] = useState(undefined);
    const [imgError, setImgError] = useState(false);
    const [previewImage, setPreviewImage] = useState(undefined);

    //Modal  
    const [currentUser, setCurrentUser] = useState(null);


    // upload Image
    const selectFile = (event) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setPreviewImage(reader.result);
            }
        };
        reader.readAsDataURL(event.target.files[0]);
        setImage(event.target.files[0]);
    };

    // validation
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues:
        {
            title: currentTitle || '',
            content: currentContent || '',
        },
        validationSchema:
            Yup.object({
                title: Yup.string().required("Required"),
                content: Yup.string().required('Required'),

            }),
        onSubmit: async (values) => {

            // if (!image)
            //     return setImgError(true);

            // const formData = new FormData();
            // formData.append("image", image);
            // formData.append("title", values.title);
            // formData.append("content", values.content);
            // save new TeamData
            const response = await dispatch(onUpdateArticleData(values, id));
            // if (response.payload.success) {
            // setImgError(false);
            navigate('/article');

            // }
        },
    });


    return (

        <div className='page-content'>
            <Container fluid>
                <BreadCrumb title="Update" pageTitle="Article" />
                <div className='d-flex justify-content-center'>
                    <Col lg={6}>
                        <Form className="tablelist-form" onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                        }}>
                            <div>
                                <Input type="hidden" id="id-field" />
                                <Row className="g-3 mt-5">
                                    {/* <Col lg={12}>
                                        <div className="text-center">
                                            <div className="profile-user position-relative d-inline-block mx-auto mb-2"

                                            >
                                                <img
                                                    src={previewImage ? previewImage : image ? image : dummyUser}
                                                    className="rounded-circle avatar-lg img-thumbnail user-profile-image"
                                                    alt=""
                                                    style={imgError ? { border: "2px solid red" } : {}}

                                                />
                                                <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                                                    <Input
                                                        id="profile-img-file-input"
                                                        type="file"
                                                        className="profile-img-file-input"
                                                        accept="image/png, image/jpeg"
                                                        onChange={selectFile}
                                                    />
                                                    <Label
                                                        htmlFor="profile-img-file-input"
                                                        className="profile-photo-edit avatar-xs"
                                                    >
                                                        <span className="avatar-title rounded-circle bg-light text-body">
                                                            <i className="ri-camera-fill"></i>
                                                        </span>
                                                    </Label>
                                                </div>
                                            </div>
                                            <h5 className="fs-14">Upload Image</h5>
                                            <div className='mt-3'>
                                                {errorMessage && errorMessage ? (<Alert color="danger"> {errorMessage} </Alert>) : null}
                                            </div>
                                        </div>
                                    </Col> */}

                                    <Col lg={12}>
                                        <div className="mb-1">
                                            <Label htmlFor="title" className="form-label">Title*</Label>
                                            <Input type="text" className="form-control" id="name" placeholder="Enter Title"
                                                name='title'
                                                validate={{
                                                    required: { value: true },
                                                }}
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.title || ""}
                                                invalid={
                                                    validation.touched.title && validation.errors.title ? true : false
                                                }
                                            />
                                            {validation.touched.title && validation.errors.title ? (
                                                <FormFeedback type="invalid">{validation.errors.title}</FormFeedback>
                                            ) : null}
                                        </div>
                                    </Col>

                                    <Col lg={12}>
                                        <div className="mb-1">
                                            <Label htmlFor="content" className="form-label">Content*</Label>
                                            <Input type="textarea" className="form-control" id="content" placeholder="Enter content..."
                                                name='content'
                                                rows={4} cols={40}
                                                validate={{
                                                    required: { value: true },
                                                }}
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.content || ""}
                                                invalid={
                                                    validation.touched.content && validation.errors.content ? true : false
                                                }
                                            />
                                            {validation.touched.content && validation.errors.content ? (
                                                <FormFeedback type="invalid">{validation.errors.content}</FormFeedback>
                                            ) : null}
                                        </div>

                                    </Col>
                                </Row>
                            </div>
                            <div className="hstack gap-2 justify-content-end">
                                <Link to={'/article'}><button type="button" className="btn btn-light">Back</button></Link>
                                <button type="submit" className="btn btn-success" id="add-btn" > <i className="ri-add-fill me-1 align-bottom"></i> Update </button>
                            </div>
                        </Form>
                    </Col>
                </div>
            </Container>
        </div>
    )
}

export default Update