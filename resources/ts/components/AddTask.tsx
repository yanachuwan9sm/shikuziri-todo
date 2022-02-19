import { Button, IconButton, Input, InputBase, Paper } from "@mui/material";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";

interface PROPS {
    title: String | undefined;
    setTitle: React.Dispatch<React.SetStateAction<String | undefined>>;
    createTodoHandle: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const AddTask: React.FC<PROPS> = ({ title, setTitle, createTodoHandle }) => {
    return (
        <>
            <Paper
                component="form"
                variant="outlined"
                sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="新しいタスクを追加しよう"
                    inputProps={{ "aria-label": "search google maps" }}
                    value={title}
                    onChange={(event: { target: { value: string } }) =>
                        setTitle(event.target.value)
                    }
                />
                <IconButton
                    sx={{ p: "10px" }}
                    aria-label="search"
                    onClick={createTodoHandle}
                >
                    <AddIcon />
                </IconButton>
            </Paper>
        </>
    );
};

export default AddTask;
