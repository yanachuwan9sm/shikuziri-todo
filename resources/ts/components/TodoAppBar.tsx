import { AppBar, Slide, Toolbar, Typography } from "@mui/material";
import { useScrollTrigger } from "@mui/material";
import React from "react";

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

const TodoAppBar = () => {
    return (
        <>
            <HideOnScroll>
                <AppBar>
                    <Toolbar>
                        <Typography variant="h6" component="div">
                            しくじりTODO
                        </Typography>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
        </>
    );
};

export default TodoAppBar;
