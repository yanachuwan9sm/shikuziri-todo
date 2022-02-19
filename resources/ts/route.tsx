import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import About from "./pages/about";
import Layout from "./pages/layout/Layout";

const MainRoute = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Main />} />
                    <Route path="about" element={<About />} />
                </Route>
            </Routes>
        </>
    );
};

export default MainRoute;
