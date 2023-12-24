import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import {
    getUserData as onGetUserData,
} from "../../slices/users/thunk";

//import images
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import { Link } from 'react-router-dom';

const ProfileDropdown = () => {

    const dispatch = useDispatch();
    const { user, loading } = useSelector(state => state.Loggedin);
    const { article, isLoading } = useSelector((state) => state.Article);
    const [post,setPost] = useState(0);

    useEffect(() => {
        dispatch(onGetUserData());
    }, [dispatch]);
    
    useEffect(()=>{
     if(article.length){
        const size = article.filter((article) => article?.created_by == user?._id).length;
        setPost(size);
     }
    },[article]);
    //Dropdown Toggle
    const [isProfileDropdown, setIsProfileDropdown] = useState(false);
    const toggleProfileDropdown = () => {
        setIsProfileDropdown(!isProfileDropdown);
    };


    return (
        <React.Fragment>
            <Dropdown isOpen={isProfileDropdown} toggle={toggleProfileDropdown} className="ms-sm-3 header-item topbar-user">
                <DropdownToggle tag="button" type="button" className="btn">
                    <span className="d-flex align-items-center">
                        <img className="rounded-circle header-profile-user" src={avatar1}
                            alt="Header Avatar" />
                        <span className="text-start ms-xl-2">
                            <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{user.name}</span>
                            {/* <span className="d-none d-xl-block ms-1 fs-13 text-muted user-name-sub-text">Admin</span> */}
                        </span>
                    </span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                    <h6 className="dropdown-header">Welcome {user.username}!</h6>


                    <DropdownItem className='p-0'>
                        <Link to='' className="dropdown-item">
                            <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
                            <span className="align-middle">Profile</span>
                        </Link>
                    </DropdownItem>

                    <DropdownItem className='p-0'>
                        <Link to='' className="dropdown-item">
                            <i className="mdi mdi-email text-muted fs-16 align-middle me-1"></i>
                            <span className="align-middle">{user.email}</span>
                        </Link>
                    </DropdownItem>

                    <DropdownItem className='p-0'>
                        <Link to='' className="dropdown-item">
                            <i className="mdi mdi-book text-muted fs-16 align-middle me-1"></i>
                            <span className="align-middle">No. of Posts {post}</span>
                        </Link>
                    </DropdownItem>

                    <div className="dropdown-divider"></div>
                    <DropdownItem className='p-0'>
                        <Link to={"/login"} className="dropdown-item">
                            <i
                                className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i> <span
                                    className="align-middle" data-key="t-logout">Logout</span>
                        </Link>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    );
};

export default ProfileDropdown;