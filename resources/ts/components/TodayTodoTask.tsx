import {
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { grey, green, red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

import React from "react";
import { TaskState } from "./test";

import axios from "axios";

interface PROPS {
    elem: TaskState;
    setTodayTasks: React.Dispatch<React.SetStateAction<never[]>>;
}

const TodayTodoTask: React.VFC<PROPS> = ({ elem, setTodayTasks }) => {
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
            <ListItem
                key={elem.id}
                secondaryAction={
                    <>
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => deleteTask(elem.id)}
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
                        ToggleDoneTask(elem.id, !elem.done_flag);
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
                    <ListItemText id={`${elem.id}`} primary={`${elem.title}`} />
                </ListItemButton>
            </ListItem>
        </>
    );
};

export default TodayTodoTask;
