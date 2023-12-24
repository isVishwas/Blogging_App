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
import { Link } from 'react-router-dom';


const Index = () => {
    document.title = "Home";
    const [showMore, setShowMore] = useState('');
    const dispatch = useDispatch();

    const { allArticleData,isLoading } = useSelector((state) => state.Article);
    const { user } = useSelector((state) => state.Loggedin);


    const [article, setArticle] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [usersList, setUserslist] = useState([]);

    useEffect(() => {
        dispatch(onGetAllUserData());
    }, [dispatch]);

    useEffect(() => {
        setArticle(allArticleData);
        setUserslist(allArticleData);
    }, [allArticleData]);
    
    window.onscroll = function () {
        scrollFunction();
    };

    const scrollFunction = () => {
        const element = document.getElementById("back-to-top");
        if (element) {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                element.style.display = "block";
            } else {
                element.style.display = "none";
            }
        }
    };

    const toTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    const searchList = (e) => {

        let inputVal = e.toLowerCase();
        const filterItems = (arr, query) => {
            return arr.filter((el) => {
                return el.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 || el.content.toLowerCase().indexOf(query.toLowerCase()) !== -1;

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



    return (
        <React.Fragment>
            <div className="layout-wrapper landing">
                <Navbar />

                <React.Fragment>
            <ToastContainer closeButton={false} />
            <DeleteModal
                show={deleteModal}
                onDeleteClick={() => handleDeleteUserData()}
                onCloseClick={() => setDeleteModal(false)}
            />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Blog's" pageTitle="Home" />

                    <Card>
                        <CardBody>
                            <Row className="g-2">
                                <Col sm={4}>
                                    <div className="search-box">
                                        <Input type="text" className="form-control" placeholder="Search for name..." onChange={(e) => searchList(e.target.value)} />
                                        <i className="ri-search-line search-icon"></i>
                                    </div>
                                </Col>
                                {/* <Col className="col-sm-auto ms-auto">
                                    <div className="list-grid-nav hstack gap-1">

                                        <Button color="info" id="grid-view-button" className="btn btn-soft-info nav-link btn-icon fs-14 filter-button active"><i className="ri-grid-fill"></i></Button>
                                        <Button color="info" id="list-view-button" className="btn btn-soft-info nav-link btn-icon fs-14 filter-button"><i className="ri-list-unordered"></i></Button>
                                       
                                    </div>
                                </Col> */}
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
                                            <Col key={key} lg={3}>

                                                <Card className="team-box">
                                                    <div className="team-cover">
                                                        <img src='' alt="" className="img-fluid" />
                                                    </div>

                                                    <CardBody className="p-3">
                                                        <Row className="align-items-center team-row">
                                                            <Col lg={4} className="col">
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
                                                            <Col lg={2} className="col">
                                                                <h5 className="text-uppercase">
                                                                    {article?.title}
                                                                </h5>
                                                            </Col>
                                                            <Col lg={4} className="col pt-2">
                                                                <Row className="text-muted">
                                                                    <Col xs={12} className="border-end border-end-dashed">
                                                                        <p>
                                                                            {showMore == article._id ? article?.content : `${article?.content.substring(0, 100)}`}
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
                                                                        </p>
                                                                    </Col>
                                                                    <Col>
                                                                    {console.log("uu ",article)}
                                                                        <p>
                                                                            Author : <span>{ article?.created_by.username}</span>
                                                                        </p>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                            <Col lg={1} className="col">
                                                                <div className="text-end">
                                                                    <Link
                                                                        to="/article/view"
                                                                        state={{
                                                                            title: article?.title,
                                                                            content: article?.content,
                                                                            username: article?.created_by.username
                                                                        }}
                                                                        // onClick={() => delete_article(user._id)}
                                                                        className="btn btn-soft-danger view-btn">View
                                                                    </Link>
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

                
                <Footer />
                <button onClick={() => toTop()} className="btn btn-danger btn-icon landing-back-top" id="back-to-top">
                    <i className="ri-arrow-up-line"></i>
                </button>
            </div>
        </React.Fragment>
    );
};

export default Index;