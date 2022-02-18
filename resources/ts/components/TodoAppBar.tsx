import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../features/userSlice";
import { selectUser } from "../features/userSlice";
import { useSelector, useDispatch } from "react-redux";

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
    Paper,
    MenuList,
    MenuItem,
    Popper,
    Grow,
    ClickAwayListener,
    IconButton,
    Avatar,
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
    const navigate = useNavigate();

    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    //LoadingButtonのロード状態を管理するステート
    const [loading, setLoading] = useState(false);

    //Popperの開閉状態を管理するステート
    const [open, setOpen] = useState(false);

    const anchorRef = useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        // Popperの開閉状態を変更する
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }
        setOpen(false);
    };

    const handleListKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === "Escape") {
            setOpen(false);
        }
    };

    const prevOpen = useRef(open);

    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            //！open-> openから移行したときに、フォーカスをボタンに戻します
            anchorRef.current!.focus();
        }
        prevOpen.current = open;
    }, [open]);

    ///MenuList composition

    const twitterLogin = () => {
        setLoading(true);
        axios.get("/login/twitter", { withCredentials: true }).then((res) => {
            window.location.href = res.data.redirect_url;
        });
    };

    const LogoutHandle = () => {
        dispatch(logout());
    };

    useEffect(() => {
        axios.get("/api/user", { withCredentials: true }).then((res) => {
            dispatch(
                login({
                    id: res.data.id,
                    name: res.data.name,
                    twitter_id: res.data.twitter_id,
                    avatar: res.data.avatar,
                })
            );
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

                                        {user.id ? (
                                            <>
                                                <IconButton
                                                    ref={anchorRef}
                                                    onClick={handleToggle}
                                                    size="small"
                                                    sx={{ ml: 2 }}
                                                    aria-controls={
                                                        open
                                                            ? "composition-menu"
                                                            : undefined
                                                    }
                                                    aria-haspopup="true"
                                                    aria-expanded={
                                                        open
                                                            ? "true"
                                                            : undefined
                                                    }
                                                >
                                                    <Avatar
                                                        sx={{
                                                            width: 32,
                                                            height: 32,
                                                        }}
                                                        src={user.avatar}
                                                    />
                                                </IconButton>
                                                <Popper
                                                    open={open}
                                                    anchorEl={anchorRef.current}
                                                    role={undefined}
                                                    placement="bottom-start"
                                                    transition
                                                    disablePortal
                                                >
                                                    {({
                                                        TransitionProps,
                                                        placement,
                                                    }) => (
                                                        <Grow
                                                            {...TransitionProps}
                                                            style={{
                                                                transformOrigin:
                                                                    placement ===
                                                                    "bottom-start"
                                                                        ? "left top"
                                                                        : "left bottom",
                                                            }}
                                                        >
                                                            <Paper>
                                                                <ClickAwayListener
                                                                    onClickAway={
                                                                        handleClose
                                                                    }
                                                                >
                                                                    <MenuList
                                                                        autoFocusItem={
                                                                            open
                                                                        }
                                                                        id="composition-menu"
                                                                        aria-labelledby="composition-button"
                                                                        onKeyDown={
                                                                            handleListKeyDown
                                                                        }
                                                                    >
                                                                        <MenuItem
                                                                            divider={
                                                                                true
                                                                            }
                                                                            sx={{
                                                                                pointerEvents:
                                                                                    "none",
                                                                            }}
                                                                        >
                                                                            ようこそ！{" "}
                                                                            {
                                                                                user.name
                                                                            }
                                                                            さん
                                                                        </MenuItem>
                                                                        <MenuItem
                                                                            onClick={
                                                                                LogoutHandle
                                                                            }
                                                                        >
                                                                            Logout
                                                                        </MenuItem>
                                                                    </MenuList>
                                                                </ClickAwayListener>
                                                            </Paper>
                                                        </Grow>
                                                    )}
                                                </Popper>
                                            </>
                                        ) : (
                                            <>
                                                <LoadingButton
                                                    color="inherit"
                                                    loading={loading}
                                                    onClick={twitterLogin}
                                                >
                                                    Login
                                                </LoadingButton>
                                            </>
                                        )}
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
