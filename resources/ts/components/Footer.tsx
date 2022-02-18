import React from "react";
import { makeStyles, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ZenKurenaidoFont } from "../theme";
import { ThemeProvider } from "@emotion/react";

const Footer = () => {
    return (
        <>
            <Box
                sx={{
                    backgroundColor: "#0f2350",
                    color: "#ebf6f7",
                    width: "100%",
                    bottom: 0,
                    py: 3,
                }}
            >
                <ThemeProvider theme={ZenKurenaidoFont}>
                    <Typography variant="h6" align="center">
                        © Copyright 2022 しくじりTodo <br />
                        All rights reserved.
                    </Typography>
                </ThemeProvider>
            </Box>
        </>
    );
};

export default Footer;
