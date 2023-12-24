import React from 'react';
import { Routes, Route } from "react-router-dom";

//Layouts
import NonAuthLayout from "../Layouts/NonAuthLayout";
import VerticalLayout from "../Layouts/index";

//routes
import {
    authProtectedRoutes,
    publicArticleRoutes,
    publicRoutes
} from "./allRoutes";
import { AccessRoute, AuthProtected } from './AuthProtected';
import { useSelector } from 'react-redux';

const Index = () => {

    const { user } = useSelector((state) => state.Loggedin);

    return (
        <React.Fragment>
            <Routes>
                <Route>
                    {
                        publicRoutes.map((route, idx) => (
                            <Route
                                path={route.path}
                                element={
                                    <AccessRoute>
                                        <NonAuthLayout>
                                            {route.component}
                                        </NonAuthLayout>
                                    </AccessRoute>
                                }
                                key={idx}
                                exact={true}
                            />
                        ))
                    }

                    {

                        publicArticleRoutes.map((route, idx) => (
                            <Route
                                path={route.path}
                                element={
                                    <AccessRoute
                                    // status={user.status}
                                    >
                                        {/* <VerticalLayout> */}
                                            {route.component}
                                        {/* </VerticalLayout> */}
                                    </AccessRoute>
                                }
                                key={idx}
                                exact={true}
                            />
                        ))
                    }

                    {

                        authProtectedRoutes.map((route, idx) => (
                            <Route
                                path={route.path}
                                element={
                                    <AuthProtected
                                    // status={user.status}
                                    >
                                        <VerticalLayout>
                                            {route.component}
                                        </VerticalLayout>
                                    </AuthProtected>
                                }
                                key={idx}
                                exact={true}
                            />
                        ))
                    }

                </Route>
            </Routes>
        </React.Fragment>
    );
};

export default Index;