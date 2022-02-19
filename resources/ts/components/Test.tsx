import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { selectUser, UserState } from "../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import { ThemeProvider } from "@emotion/react";
import { RowdiesFont } from "../theme";

import { grey } from "@mui/material/colors";

import Task from "./Task";
import AddTask from "./AddTask";
import TodayTodoTask from "./TodayTodoTask";

export interface TaskState {
    id: number;
    title: string;
    done_flag: boolean;
    created_at: Date;
    user: {
        name: string;
        avatar: string;
    };
}

const Test = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

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
        await axios
            .get("/api/tasks/today")
            .then((res) => {
                setTodayTasks(res.data);
            })
            .catch((err: any) => {
                const { status, statusText } = err.response;
                console.log(`Error! HTTP Status: ${status} ${statusText}`);
                console.log(`Error! HTTP Status: ${status} ${statusText}`);
            });
    };

    const createTodo = async () => {
        await axios
            .post("/api/task/create", {
                title: newTodoTitle,
                user_id: user.id,
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

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "700px",
                    m: "auto",
                    minHeight: "100vh",
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
                            {user.id ? (
                                <>
                                    <AddTask
                                        title={newTodoTitle}
                                        setTitle={setNewTodoTitle}
                                        createTodoHandle={createTodo}
                                    />

                                    {todayTasks !== null &&
                                        todayTasks !== undefined &&
                                        todayTasks.length > 0 &&
                                        todayTasks.map((elem: TaskState) => (
                                            <TodayTodoTask
                                                elem={elem}
                                                setTodayTasks={setTodayTasks}
                                            />
                                        ))}
                                </>
                            ) : (
                                <>
                                    <Typography
                                        variant="body1"
                                        component="div"
                                        align="center"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        TODOを作成するにはログインする必要があります
                                        <br />
                                        ログインはTwitter連携のみです。
                                    </Typography>
                                </>
                            )}
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
                        tasks.map((elem: TaskState) => (
                            <Task
                                elem={elem}
                                buttonhandle={() => navigate("/share")}
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
