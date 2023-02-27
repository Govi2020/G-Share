import { createContext, useState } from "react";
import axios from "../api/axios";
import getSnackBarStyles from "../entities/snackBarStyles";
import SnackBar from "awesome-snackbar";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const navigate = useNavigate();
    const LOGIN_URL = "/auth/login";
    const REGISTER_URL = "/auth/register";
    const LOGOUT_URL = "/auth/logout";

    const login = async (email, password, setLoading) => {
        let isError = true;
        try {
            const res = await axios.post(
                LOGIN_URL,
                { email, password },
                {
                    withCredentials: true,
                }
            );
            const accessToken = res.data.accessToken;
            const username = res.data.username;
            setAuth(user);
            isError = false;
        } catch (err) {
            console.log(err);
            new SnackBar(err?.response?.data?.message || "Login Failed", {
                position: "bottom-right",
                style: getSnackBarStyles(true),
            });
            isError = true;
        } finally {
            setLoading(false);
            return isError;
        }
    };

    const register = async (username, email, password, setLoading) => {
        try {
            const res = await axios.post(REGISTER_URL, {
                username,
                email,
                password,
            });
            login(email, password, setLoading);
            navigate("/")
        } catch (err) {
            console.log(err);
            return new SnackBar(
                err?.response?.data?.message || "Register Failed",
                {
                    position: "bottom-right",
                    style: getSnackBarStyles(true),
                }
            );
        } finally {
            setLoading(false);
        }
    };

    const logout = async (setLoading) => {
        try {
            const res = await axios.post(LOGOUT_URL,{},{
                withCredentials: true
            });
            
            setAuth({});
            
            navigate("/")
        } catch (err) {
            console.log(err);
            return new SnackBar(
                err?.response?.data?.message || "Logout Failed",
                {
                    position: "bottom-right",
                    style: getSnackBarStyles(true),
                }
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, login, register,logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
