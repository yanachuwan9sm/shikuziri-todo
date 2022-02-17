import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
    AppBar,
    Button,
    Box,
    Divider,
    Slide,
    Stack,
    Toolbar,
    Typography,
    useScrollTrigger,
    ThemeProvider,
    createTheme,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { grey } from "@mui/material/colors";
import { ZenKurenaidoFont } from "../theme";

import axios from "axios";

interface PROPS {
    window?: () => Window;
    children: React.ReactElement;
}

const HideOnScroll = ({ children, window }: PROPS) => {
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
};

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#1976d2",
        },
    },
});

export type OAuthRedirect = {
    redirectUrl: string;
};

const TodoAppBar = () => {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const twitterLogin = () => {
        setLoading(true);

        // axios.get("/login/twitter").then((res) => {
        //     console.log(res);
        //     window.location.href = res.data.redirect_url;
        // });

        axios.get("/login/twitter", { withCredentials: true }).then((res) => {
            console.log(res);
            window.location.href = res.data.redirect_url;
        });
    };

    useEffect(() => {
        axios.get("/api/user", { withCredentials: true }).then((res) => {
            console.log(res.data);
        });
    }, []);

    return (
        <>
            <ThemeProvider theme={theme}>
                <HideOnScroll>
                    <Box sx={{ flexGrow: 1 }}>
                        <AppBar>
                            <Toolbar>
                                <ThemeProvider theme={ZenKurenaidoFont}>
                                    <Typography
                                        variant="h5"
                                        component="div"
                                        sx={{ flexGrow: 1 }}
                                    >
                                        しくじりTODO
                                    </Typography>

                                    <Stack direction="row" spacing={1}>
                                        <Button
                                            color="inherit"
                                            onClick={() => navigate("/about")}
                                        >
                                            ABOUT
                                        </Button>

                                        <LoadingButton
                                            color="inherit"
                                            loading={loading}
                                            onClick={twitterLogin}
                                        >
                                            Login
                                        </LoadingButton>
                                    </Stack>
                                </ThemeProvider>
                            </Toolbar>
                        </AppBar>
                    </Box>
                </HideOnScroll>
            </ThemeProvider>
        </>
    );
};

export default TodoAppBar;
