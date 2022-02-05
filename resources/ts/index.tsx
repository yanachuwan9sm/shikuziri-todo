import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";
import MainRoute from "./route";

if (document.getElementById("app")) {
    ReactDOM.render(
        <BrowserRouter>
            <MainRoute />
        </BrowserRouter>,
        document.getElementById("app")
    );
}
