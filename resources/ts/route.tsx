import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test from "./components/test";
import About from "./pages/about";
import Layout from "./pages/layout/Layout";
import SocialLoginProgress from "./pages/layout/SocialLoginProgress";

const MainRoute = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Test />} />
                    <Route path="about" element={<About />} />
                    <Route
                        path="/login/twitter/callback"
                        element={<SocialLoginProgress />}
                    />

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
