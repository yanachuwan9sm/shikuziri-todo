import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation } from "react-router";
import axios from "axios";

const SocialLoginProgress = () => {
    const token = useLocation().search;

    useEffect(() => {
        axios.post(`/login/twitter/callback${token}`, {}).then((res) => {
            console.log(res);
        });
    }, []);

    return (
        <div className="p-4">
            <p>
                認証中
                <CircularProgress />
            </p>
        </div>
    );
};

export default SocialLoginProgress;
