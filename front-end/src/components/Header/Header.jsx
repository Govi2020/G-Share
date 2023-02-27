import "./Header.css";
import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../api/apiCalls";

export default function Header() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => {
        console.log(state);
        return state.user.currentUser;
    });

    return (
        <header className="header">
            <Link to="/" className="head-text">
                G <span>Share</span>
            </Link>
            <div className="left-section">
                <>
                    {user ? (
                    <nav className="nav">
                        <ul className="nav-list">
                            <li className="nav-item">
                                <NavLink
                                    to="/"
                                    className={(activeClass) =>
                                        activeClass.isActive
                                            ? "active-item item"
                                            : "item"
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/my_files"
                                    className={(activeClass) =>
                                        activeClass.isActive
                                            ? "active-item item"
                                            : "item"
                                    }
                                >
                                    My Files
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                    ) : null}
                    {user ? (
                        <button
                            onClick={() => {
                                logout(dispatch);
                            }}
                            className="btn-primary primary"
                            disabled={loading}
                        >
                            {loading ? (
                                <i className="fa-solid fa-rotate rotate"></i>
                            ) : (
                                "Sign out"
                            )}
                        </button>
                    ) : (
                        <Link
                            className="btn-primary primary"
                            disabled={loading}
                            to="/login"
                        >
                            {loading ? (
                                <i className="fa-solid fa-rotate rotate"></i>
                            ) : (
                                "Sign In"
                            )}
                        </Link>
                    )}
                </>
            </div>
        </header>
    );
}
