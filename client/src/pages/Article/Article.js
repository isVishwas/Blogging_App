import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, Col, Container, Input, Offcanvas, OffcanvasBody, Row } from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import DeleteModal from "../../Components/Common/DeleteModal";
import { ToastContainer } from 'react-toastify';
import { Modal, ModalBody } from "reactstrap";

//Small Images
import smallImage9 from '../../assets/images/small/img-9.jpg';
//redux
import { useSelector, useDispatch } from 'react-redux';

//import action
import {
    getUserData as onGetUserData,
    deleteArticle as onArticleDelete
} from "../../slices/users/thunk";

// Formik
import { isEmpty } from 'lodash';
import Loader from '../../Components/Common/Loader';


import { loadAnimation } from "lottie-web";
import { defineElement } from "lord-icon-element";
// register lottie and define custom element
defineElement(loadAnimation);
// import { loadAnimation } from "lottie-web";
// import { defineElement } from "lord-icon-element";
// // register lottie and define custom element
// defineElement(loadAnimation);

const Team = () => {

    document.title = "My Article's";
    const dispatch = useDispatch();
    const [showMore, setShowMore] = useState('');
    const [show, setShow] = useState(false);

    const { article, isLoading } = useSelector((state) => state.Article);
    const [articleId, setArticleId] = useState('');

    const [deleteModal, setDeleteModal] = useState(false);
    const [usersList, setUserslist] = useState([]);

    useEffect(() => {
        dispatch(onGetUserData());
    }, [dispatch]);

    useEffect(() => {
        setUserslist(article);
    }, [article]);



    useEffect(() => {
        const list = document.querySelectorAll(".team-list");
        const buttonGroups = document.querySelectorAll('.filter-button');
        for (let i = 0; i < buttonGroups.length; i++) {
            buttonGroups[i].addEventListener('click', onButtonGroupClick);
        }

        function onButtonGroupClick(event) {
            if (event.target.id === 'list-view-button' || event.target.parentElement.id === 'list-view-button') {
                document.getElementById("list-view-button").classList.add("active");
                document.getElementById("grid-view-button").classList.remove("active");
                list.forEach(function (el) {
                    el.classList.add("list-view-filter");
                    el.classList.remove("grid-view-filter");
                });

            } else {
                document.getElementById("grid-view-button").classList.add("active");
                document.getElementById("list-view-button").classList.remove("active");
                list.forEach(function (el) {
                    el.classList.remove("list-view-filter");
                    el.classList.add("grid-view-filter");
                });
            }
        }
    }, []);


    const searchList = (e) => {

        let inputVal = e.toLowerCase();
        const filterItems = (arr, query) => {
            return arr.filter((el) => {
                // return el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 || el.designation.toLowerCase().indexOf(query.toLowerCase()) !== -1
                return el.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 || el.content.toLowerCase().indexOf(query.toLowerCase()) !== -1  ;

            })
        }

        let filterData = filterItems(article, inputVal);
        setUserslist(filterData);
        if (filterData.length === 0) {
            document.getElementById("noresult").style.display = "block";
            document.getElementById("teamlist").style.display = "none";
        } else {
            document.getElementById("noresult").style.display = "none";
            document.getElementById("teamlist").style.display = "block";
        }
    }

    const delete_article = (id) => {
        setShow(true);
        setArticleId(id);
    }

    const onCloseClick = () => {
        setShow(false);
        setArticleId('');
    }

    const onDeleteClick = () => {
        setUserslist(usersList.filter((article) => article._id != articleId));
        setShow(false);
        setArticleId('');
        dispatch(onArticleDelete(articleId));
    }


    if (show) {
        return (
            <Modal isOpen={show} toggle={onCloseClick} centered={true}>
                <ModalBody className="py-3 px-5">
                    <div className="mt-2 text-center">
                        <lord-icon
                            src="https://cdn.lordicon.com/gsqxdxog.json"
                            trigger="loop"
                            colors="primary:#f7b84b,secondary:#fa896b"
                            style={{ width: "100px", height: "100px" }}
                        ></lord-icon>
                        <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                            <h4>Are you sure ?</h4>
                            <p className="text-muted mx-4 mb-0">
                                Are you sure you want to remove this blog ?
                            </p>
                        </div>
                    </div>
                    <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                        <button
                            type="button"
                            className="btn w-sm btn-light"
                            data-bs-dismiss="modal"
                            onClick={onCloseClick}
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            className="btn w-sm btn-danger "
                            id="delete-record"
                            onClick={onDeleteClick}
                        >
                            Yes, Delete It!
                        </button>
                    </div>
                </ModalBody>
            </Modal>
        )
    }

    return (
        <React.Fragment>
            <ToastContainer closeButton={false} />
            <DeleteModal
                show={deleteModal}
                onDeleteClick={() => handleDeleteUserData()}
                onCloseClick={() => setDeleteModal(false)}
            />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="My Article's" pageTitle="Article" />
                    <Card>
                        <CardBody>
                            <Row className="g-2">
                                <Col sm={4}>
                                    <div className="search-box">
                                        <Input type="text" className="form-control" placeholder="Search for name..." onChange={(e) => searchList(e.target.value)} />
                                        <i className="ri-search-line search-icon"></i>
                                    </div>
                                </Col>
                                <Col className="col-sm-auto ms-auto">
                                    <div className="list-grid-nav hstack gap-1">

                                        <Button color="info" id="grid-view-button" className="btn btn-soft-info nav-link btn-icon fs-14 filter-button active"><i className="ri-grid-fill"></i></Button>
                                        <Button color="info" id="list-view-button" className="btn btn-soft-info nav-link btn-icon fs-14 filter-button"><i className="ri-list-unordered"></i></Button>
                                        <Link to={'/article/add'}>
                                            <Button color="success">
                                                <i className="ri-add-fill me-1 align-bottom"></i> Add
                                            </Button>
                                        </Link>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>

                    <Row>
                        <Col lg={12}>
                            <div id="teamlist">
                                <Row className="team-list grid-view-filter">
                                    {isLoading ? <Loader /> : isEmpty(usersList) ?
                                        <div className="py-4 mt-4 text-center">
                                            <h5 className="mt-4">No Article's found!</h5>
                                        </div>
                                        : usersList?.map((article, key) => (
                                            <Col key={key}>
                                                <Card className="team-box">
                                                    <div className="team-cover">
                                                        <img src='' alt="" className="img-fluid" />
                                                    </div>
                                                    <CardBody className="p-4">
                                                        <Row className="align-items-center team-row">
                                                            <Col lg={12} className="col">
                                                                <div className="team-profile-img">

                                                                    <div className="avatar-lg flex-shrink-0">
                                                                        {/* {user != null ?
                                                                            <img src='' alt="" className="img-fluid d-block rounded-circle" />
                                                                            :
                                                                            <div className="avatar-title text-uppercase border rounded-circle bg-light text-primary">
                                                                                {user?.title}
                                                                            </div>} */}
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>

                                                        <Row className="align-items-center team-row">

                                                            <Col lg={12}>
                                                                <h5 className="text-uppercase">
                                                                    {article?.title}
                                                                </h5>
                                                            </Col>
                                                        </Row>
                                                        <Row className="align-items-center team-row mt-3">
                                                            <Col lg={12} className="col">
                                                                <Row className="text-muted">
                                                                    <Col xs={12} className="border-end border-end-dashed">
                                                                    <div>
                                                                            {showMore == article?._id ? article?.content : `${article?.content.substring(0, 100)}`}
                                                                            <p className='text-primary cursor-pointer  mt-1' onClick={() => {
                                                                                if (showMore) {
                                                                                    setShowMore('')
                                                                                }
                                                                                else {
                                                                                    setShowMore(article?._id)
                                                                                }
                                                                            }}>
                                                                            {
                                                                                article?.content.length > 100 && (
                                                                                    showMore == article?._id ? "Show less" : "Show more..."
                                                                                )
                                                                            }
                                                                                
                                                                            </p>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                        <Row className="align-items-center team-row">
                                                            <Col lg={1} className="col">
                                                                <div>
                                                                    <Link
                                                                        to={`/article/update/${article?._id}`}
                                                                        state={{ currentTitle: article?.title, currentContent: article?.content }}
                                                                        className="btn btn-soft-primary view-btn">
                                                                        Edit
                                                                    </Link>
                                                                </div>
                                                            </Col>
                                                            <Col lg={1} className="col">
                                                                <div className="text-end">
                                                                    <Button onClick={() => delete_article(article._id)} className="btn btn-soft-danger view-btn">Delete</Button>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        ))}

                                </Row>
                            </div>
                            <div className="py-4 mt-4 text-center" id="noresult" style={{ display: "none" }}>
                                <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" colors="primary:#405189,secondary:#0ab39c" style={{ width: "72px", height: "72px" }}></lord-icon>
                                <h5 className="mt-4">Sorry! No Result Found</h5>
                            </div>
                        </Col>
                    </Row>

                    <svg className="bookmark-hide">
                        <symbol viewBox="0 0 24 24" stroke="currentColor" fill="var(--color-svg)" id="icon-star"><path strokeWidth=".4" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></symbol>
                    </svg>

                </Container>
            </div>
        </React.Fragment>
    );
};

export default Team;