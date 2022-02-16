import {
    Button,
    Container,
    Checkbox,
    Grid,
    IconButton,
    Input,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    TextField,
    Typography,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Avatar,
} from "@mui/material";
import { Box, display } from "@mui/system";
import { grey, green, red } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskIcon from "@mui/icons-material/Task";
import CloseIcon from "@mui/icons-material/Close";
import { ThemeProvider } from "@emotion/react";
import { RowdiesFont } from "../theme";
import { CheckBox } from "@mui/icons-material";

import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import TwitterIcon from "@mui/icons-material/Twitter";

export interface TaskState {
    id: number;
    title: string;
    done_flag: boolean;
    created_at: Date;
}

const Task: React.FC<{ title: string; sharebuttonhandle: () => void }> = ({
    title,
    sharebuttonhandle,
}) => {
    return (
        <>
            <Card
                sx={{
                    mx: 2,
                    my: 1.5,
                    bgcolor: grey[100],
                    borderRadius: 8,
                }}
            >
                <CardContent>
                    <Box sx={{ display: "flex", flexGrow: 1 }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                                guest
                            </Typography>
                            <Typography
                                gutterBottom
                                variant="h6"
                                component="div"
                            >
                                {title}
                            </Typography>
                        </Box>
                        <IconButton
                            size="medium"
                            edge="end"
                            aria-label="delete"
                            onClick={sharebuttonhandle}
                        >
                            <TwitterIcon />
                        </IconButton>
                    </Box>
                </CardContent>
            </Card>
        </>
    );
};

const Test = () => {
    /*
    | 全ユーザーの全タスクの状態を持つステート
    */
    const [tasks, setTasks] = useState([]);
    /*
    | 今日のタスクの状態を持つステート
    */
    const [todayTasks, setTodayTasks] = useState([]);
    /*
    | 新しく追加するタスクの状態を持つステート
    */
    const [newTodoTitle, setNewTodoTitle] = useState<String>();
    /*
    | 編集中かどうかを判定するフラグの状態を持つステート
    */
    const [isEdit, setIsEdit] = useState<Boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        getTasksData();
        getTodayTasksData();
    }, []);

    const getTasksData = async () => {
        try {
            const res = await axios.get("/api/tasks/shikuziri");
            setTasks(res.data);
        } catch (err: any) {
            const { status, statusText } = err.response;
            console.log(`Error! HTTP Status: ${status} ${statusText}`);
        }
    };

    const getTodayTasksData = async () => {
        try {
            const res = await axios.get("/api/tasks/today");
            setTodayTasks(res.data);
        } catch (err: any) {
            const { status, statusText } = err.response;
            console.log(`Error! HTTP Status: ${status} ${statusText}`);
        }
    };

    const createTodo = async () => {
        await axios
            .post("/api/task/create", {
                title: newTodoTitle,
            })
            .then((res) => {
                setTodayTasks(res.data);
                setNewTodoTitle("");
            })
            .catch((err: any) => {
                const { status, statusText } = err.response;
                console.log(`Error! HTTP Status: ${status} ${statusText}`);
            });
    };

    const ToggleDoneTask = async (taskId: number, done_flag: boolean) => {
        if (taskId === undefined || done_flag === undefined) {
            return;
        }

        await axios
            .post("/api/task/update_flag", {
                id: taskId,
                done_flag: done_flag,
            })
            .then((res) => {
                setTodayTasks(res.data);
            })
            .catch((err: any) => {
                const { status, statusText } = err.response;
                console.log(`Error! HTTP Status: ${status} ${statusText}`);
            });
    };

    const deleteTask = async (taskId: number) => {
        await axios
            .post("/api/delete", {
                id: taskId,
            })
            .then((res) => {
                setTodayTasks(res.data);
            })
            .catch((err: any) => {
                const { status, statusText } = err.response;
                console.log(`Error! HTTP Status: ${status} ${statusText}`);
            });
    };

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "700px",
                    m: "auto",
                }}
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignContent="center"
                >
                    <Box sx={{ py: 10 }}>
                        {/* Today`s Todo title */}
                        <ThemeProvider theme={RowdiesFont}>
                            <Typography
                                variant="h3"
                                component="div"
                                align="center"
                                color={grey[50]}
                                sx={{ fontWeight: "bold" }}
                            >
                                Today`s Todo
                            </Typography>
                        </ThemeProvider>

                        <Box
                            sx={{
                                py: 5,
                                px: 3,
                                my: 3,
                                mx: 2,
                                bgcolor: grey[50],
                                borderRadius: 10,
                            }}
                        >
                            <Box
                                alignItems="center"
                                sx={{ mt: "20px", mb: "10px" }}
                            >
                                {/* Todo create text input */}
                                <Input
                                    value={newTodoTitle}
                                    onChange={(event: {
                                        target: { value: string };
                                    }) => setNewTodoTitle(event.target.value)}
                                    placeholder="New Todo"
                                    size="medium"
                                />
                                {/* Todo create button */}
                                <Button
                                    variant="outlined"
                                    // size="large"
                                    sx={{ color: "#208AEC" }}
                                    onClick={createTodo}
                                    startIcon={<AddIcon />}
                                >
                                    Add
                                </Button>
                            </Box>

                            <div>
                                {/* Todo list */}
                                {todayTasks !== null &&
                                    todayTasks !== undefined &&
                                    todayTasks.length > 0 &&
                                    todayTasks.map((elem: TaskState) => (
                                        <>
                                            <ListItem
                                                key={elem.id}
                                                secondaryAction={
                                                    <>
                                                        <IconButton
                                                            edge="end"
                                                            aria-label="delete"
                                                            onClick={() =>
                                                                deleteTask(
                                                                    elem.id
                                                                )
                                                            }
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </>
                                                }
                                                disablePadding
                                            >
                                                <ListItemButton
                                                    role={undefined}
                                                    onClick={() => {
                                                        ToggleDoneTask(
                                                            elem.id,
                                                            !elem.done_flag
                                                        );
                                                    }}
                                                    dense
                                                >
                                                    <ListItemIcon>
                                                        {elem.done_flag ? (
                                                            <TaskAltIcon
                                                                sx={{
                                                                    color: green[500],
                                                                }}
                                                            />
                                                        ) : (
                                                            <WorkOutlineIcon
                                                                sx={{
                                                                    color: red[500],
                                                                }}
                                                            />
                                                        )}
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        id={`${elem.id}`}
                                                        primary={`${elem.title}`}
                                                    />
                                                </ListItemButton>
                                            </ListItem>
                                        </>
                                    ))}
                            </div>
                        </Box>
                    </Box>

                    <ThemeProvider theme={RowdiesFont}>
                        <Typography
                            variant="h3"
                            component="div"
                            align="center"
                            color={grey[50]}
                            sx={{ fontWeight: "bold" }}
                        >
                            Shikuziri Todo
                        </Typography>
                    </ThemeProvider>

                    {tasks ? (
                        tasks.map((task: TaskState) => (
                            <Task
                                title={task.title}
                                sharebuttonhandle={() => navigate("/share")}
                            />
                        ))
                    ) : (
                        <>NO DATA</>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default Test;
