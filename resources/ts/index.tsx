import React from "react";
import ReactDOM from "react-dom";
// import { Provider } from "react-redux";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter } from "react-router-dom";
import MainRoute from "./route";

if (document.getElementById("app")) {
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <MainRoute />
            </BrowserRouter>
        </Provider>,
        document.getElementById("app")
    );
}
