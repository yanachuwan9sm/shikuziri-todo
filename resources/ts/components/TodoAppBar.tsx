import React, { useState } from "react";

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

    const twitterLogin = () => {
        setLoading(true);

        axios.get("/login/twitter").then((res) => {
            console.log(res);
            //window.location.href = res.data.redirect_url;
        });

        //window.location.href = data;

        // const OAuthUrl = getOAuthUrl("twitter");
        // window.location.href = OAuthUrl;
        // console.log(OAuthUrl);
    };

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
                                        <Button color="inherit">ABOUT</Button>

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
