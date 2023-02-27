import Snackbar from "awesome-snackbar";
import getSnackBarStyles from "../entities/snackBarStyles";
import {
    loginFailure,
    loginStart,
    loginSuccess,
    registerFailure,
    registerStart,
    registerSuccess,
    logoutUser,
} from "../redux/userSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import axios from "./axios";

const LOGIN_URL = "/auth/login";
const REGISTER_URL = "/auth/register";
const LOGOUT_URL = "/auth/logout";
const FILE_CREATE_URL = "/file/";
const GET_FILE_URL = "/file/";
const USER_GET_URL = "/user/";

export const login = async (email, password, dispatch) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(
            LOGIN_URL,
            { email, password },
            {
                withCredentials: true,
            }
        );
        console.log("dsfsdf");
        const user = res.data;
        dispatch(loginSuccess(user));
    } catch (err) {
        console.log(err);
        dispatch(loginFailure(err));
        new Snackbar(err?.response?.data?.message || "Login Failed", {
            position: "bottom-right",
            style: getSnackBarStyles(true),
        });
        return new Error();
    }
};

export const signInGoogle = (dispatch) => {
    return signInWithPopup(auth, provider)
        .then((result) => {
            return axios
                .post("/auth/google", {
                    email: result.user.email,
                })
                .then((res) => {
                    dispatch(loginSuccess(res.data));
                });
        })
        .catch((err) => {
            console.log(err);
            dispatch(loginFailure());
            new Snackbar("Google Registration Failed", {
                position: "bottom-right",
                style: getSnackBarStyles(true),
            });
        });
};

export const register = async (email, password, dispatch) => {
    dispatch(registerStart());
    try {
        const res = await axios.post(
            REGISTER_URL,
            { email, password },
            {
                withCredentials: true,
            }
        );
        const user = res.data;
        dispatch(registerSuccess(user));
        await login(email, password, dispatch);
    } catch (err) {
        dispatch(registerFailure(err));
        new Snackbar(err?.response?.data?.message || "Registration Failed", {
            position: "bottom-right",
            style: getSnackBarStyles(true),
        });
        console.log(err);
    }
};

export const logout = async (dispatch) => {
    try {
        const res = await axios.post(
            LOGOUT_URL,
            {},
            {
                withCredentials: true,
            }
        );
        const user = res.data;
        dispatch(logoutUser());
    } catch (err) {
        console.log(err);
        new Snackbar(err?.response?.data?.message || "Logout Failed", {
            position: "bottom-right",
            style: getSnackBarStyles(true),
        });
        console.log(err);
    }
};
export const createFile = async (filename, url, size, type) => {
    try {
        const res = await axios.post(
            FILE_CREATE_URL,
            {
                filename,
                url,
                type,
                size,
            },
            {
                withCredentials: true,
            }
        );
        new Snackbar("Link has been generated", {
            position: "bottom-right",
            style: getSnackBarStyles(true),
        });
        return res.data;
    } catch (err) {
        console.log(err);
        new Snackbar(err?.response?.data?.message || "File Saving Failed", {
            position: "bottom-right",
            style: getSnackBarStyles(false),
        });
        console.log(err);
    }
};

export const getFile = async (id) => {
    try {
        const res = await axios.get(GET_FILE_URL + id, {
            withCredentials: true,
        });
        console.log(res.data);
        return res.data;
    } catch (err) {
        console.log(err);
        new Snackbar(err?.response?.data?.message || "File Saving Failed", {
            position: "bottom-right",
            style: getSnackBarStyles(false),
        });
        console.log(err);
    }
};

export const getUser = async (id) => {
    try {
        const res = await axios.get(USER_GET_URL + id, {
            withCredentials: true,
        });
        console.log(res.data);
        return res.data;
    } catch (err) {
        console.log(err);
        new Snackbar(
            err?.response?.data?.message || "Could not get the file's owner",
            {
                position: "bottom-right",
                style: getSnackBarStyles(true),
            }
        );
        console.log(err);
    }
};

export const getUserFiles = async (setLoading, setFiles,setError) => {
    setLoading(true);
    try {
        const res = await axios.get("/file/user", {
            withCredentials: true,
        });
        const data = res.data;
        setFiles(data);
        console.log(file)
    } catch (error) {
        console.log(error);
        setError(true);
        return new Snackbar(
            error?.response?.data?.message || "Could Not Get Your Links",
            {
                position: "bottom-right",
                style: getSnackBarStyles(true),
            }
        );
    } finally {
        setLoading(false);
    }
};

export const deleteFile = async (id, getUserFiles, setLoading, setFiles) => {
    console.log(id);
    try {
        const res = await axios.delete("/file/" + id, {
            withCredentials: true,
        });
        const data = res.data;
        return new Snackbar("Link Deleted SuccessFully", {
            position: "bottom-right",
            style: getSnackBarStyles(false),
        });
    } catch (error) {
        console.log(error)
        return new Snackbar(
            error?.response?.data?.message || "Could Not Delete Your Link",
            {
                position: "bottom-right",
                style: getSnackBarStyles(true),
            }
        );
    }
};
