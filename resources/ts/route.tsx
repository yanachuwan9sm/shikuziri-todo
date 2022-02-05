import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test from "./components/test";
import Layout from "./pages/layout/Layout";

const MainRoute = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Test />} />
                    {/* <Route path="create_user" element={<CreateUser />} />
                    <Route path="myprofile/:id" element={<MyProfile />} />
                    <Route
                        path="myprofile/edit/:id"
                        element={<EditProfile />}
                    /> */}
                </Route>
            </Routes>
        </>
    );
};

export default MainRoute;
