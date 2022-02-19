import { Box } from "@mui/system";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import TodoAppBar from "../../components/TodoAppBar";

const Layout = () => {
    return (
        <>
            <TodoAppBar />
            <Box sx={{ py: 10, backgroundColor: "#3399FF" }}>
                <Outlet />
            </Box>
            <Footer />
        </>
    );
};

export default Layout;
