import { useContext, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header/Header";
import "./App.css";
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Downloard from "./pages/Downloard/Downloard";
import MyFiles from "./pages/MyFiles/MyFiles"

function App() {

    return (
        <div className="app">
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Header />
                            <Main />
                        </>
                    }
                ></Route>
                <Route
                    path="/download/:id"
                    element={
                        <>
                            <Header />
                            <Downloard />
                        </>
                    }
                ></Route>
                <Route
                    path="/my_files"
                    element={
                        <>
                            <Header />
                            <MyFiles />
                        </>
                    }
                ></Route>
                <Route
                    path="/login"
                    element={
                        <>
                            <Header />
                            <Login />
                        </>
                    }
                ></Route>
                <Route
                    path="/register"
                    element={
                        <>
                            <Header />
                            <Register />
                        </>
                    }
                ></Route>
            </Routes>
        </div>
    );
}

export default App;
