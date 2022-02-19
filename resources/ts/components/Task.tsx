import {
    Avatar,
    Card,
    CardContent,
    Divider,
    IconButton,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { grey, green, red } from "@mui/material/colors";
import TwitterIcon from "@mui/icons-material/Twitter";

import React from "react";
import { TaskState } from "../pages/Main";

interface PROPS {
    elem: TaskState;
    buttonhandle: () => void;
}

const Task: React.VFC<PROPS> = ({ elem, buttonhandle }) => {
    return (
        <>
            <Card
                sx={{
                    mx: 2,
                    my: 0.5,
                    bgcolor: grey[100],
                    borderRadius: 6,
                }}
            >
                <CardContent>
                    <Box sx={{ display: "flex", flexGrow: 1 }}>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: "flex",
                                flexDirection: "row",
                            }}
                        >
                            <Avatar
                                src={elem.user.avatar}
                                sx={{ w: "2px", h: "2px" }}
                            />
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ my: "auto" }}
                            >
                                {elem.user.name}
                            </Typography>
                            <Divider orientation="vertical" flexItem />
                            <Typography
                                gutterBottom
                                variant="body1"
                                component="div"
                                sx={{ my: "auto", px: 3 }}
                            >
                                {elem.title}
                            </Typography>
                        </Box>
                        {/* <IconButton
                            size="medium"
                            edge="end"
                            aria-label="delete"
                        >
                            <TwitterIcon />
                        </IconButton> */}
                    </Box>
                </CardContent>
            </Card>
        </>
    );
};

export default Task;
