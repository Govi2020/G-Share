import React, { useContext, useState } from "react";
import CoverImage from "../../assets/Cover.png";
import { Link, useNavigate } from "react-router-dom";
import { login, signInGoogle } from "../../api/apiCalls";
import "../authStyles.css";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = useSelector((state) => state.user.loading);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password, dispatch);
            navigate("/");
        }catch(err) {
            console.log(err)
        }
    };

    return (
        <section className="auth">
            <h1 className="auth-header">Login</h1>
            <h2 className="auth-subheader">Welcome Back!</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="auth-input-container">
                    <div className="auth-input-logo">
                        <i class="fa-solid fa-envelope"></i>
                    </div>
                    <input
                        type="email"
                        className="auth-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="auth-input-container">
                    <div className="auth-input-logo">
                        <i class="fa-solid fa-lock"></i>
                    </div>
                    <input
                        type="password"
                        className="auth-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    htmlFor="file_upload"
                    className="btn-primary full sec"
                >
                    {loading ? (
                        <i
                            className="fa-solid fa-rotate rotate"
                            style={{ fontSize: "inherit", color: "white" }}
                        ></i>
                    ) : (
                        "Login"
                    )}
                </button>
                <div className="or">OR</div>
                <button
                    type="button"
                    className="btn-primary full sec"
                    onClick={async () => {
                        await signInGoogle(dispatch);
                        navigate("/")
                    }}
                >
                    <i
                        class="fa-brands fa-google"
                        style={{ marginInline: "1rem" }}
                    ></i>
                    Login with Google
                </button>
                <Link to="/register" className="auth-link">
                    Don't have an account?
                </Link>
            </form>
        </section>
    );
}
